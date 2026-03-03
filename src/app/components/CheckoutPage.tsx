import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Wallet, Smartphone, CheckCircle, Tag, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

interface CheckoutPageProps {
  onBack: () => void;
}

const VALID_COUPONS: Record<string, { discount: number; label: string }> = {
  WELCOME20: { discount: 0.2, label: '신규 회원 20% 할인' },
  SUMMER10:  { discount: 0.1, label: '여름 특별 10% 할인' },
};

export function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { cart, totalPrice, clearCart } = useCart();
  const { language } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; label: string } | null>(null);
  const [couponStatus, setCouponStatus] = useState<'idle' | 'error'>('idle');

  const discountAmount = appliedCoupon ? totalPrice * appliedCoupon.discount : 0;
  const discountedPrice = totalPrice - discountAmount;
  const tax = discountedPrice * 0.1;
  const finalPrice = discountedPrice + tax;

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    const coupon = VALID_COUPONS[code];
    if (coupon) {
      setAppliedCoupon({ code, ...coupon });
      setCouponInput('');
      setCouponStatus('idle');
    } else {
      setCouponStatus('error');
      setTimeout(() => setCouponStatus('idle'), 3000);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponStatus('idle');
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      const newOrderId = `ORD-${dateStr.replace(/-/g, '')}-${Math.floor(Math.random() * 900 + 100)}`;

      const newOrder = {
        id: newOrderId,
        date: dateStr,
        items: cart,
        total: finalPrice,
        status: 'processing',
      };

      const existing = JSON.parse(localStorage.getItem('klear_orders') || '[]');
      localStorage.setItem('klear_orders', JSON.stringify([newOrder, ...existing]));

      setOrderId(newOrderId);
      clearCart();
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-white border border-[#E6E6E0] rounded-3xl p-8 text-center shadow-lg">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
            <CheckCircle className="w-20 h-20 text-[#A9C356] mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 text-[#111111]">{language === 'ko' ? '결제 완료!' : 'Payment Complete!'}</h2>
          <p className="text-[#2C2C2C]/60 mb-2">{language === 'ko' ? '주문이 성공적으로 처리되었습니다. 감사합니다!' : 'Your order has been processed successfully. Thank you!'}</p>
          <p className="text-sm font-mono text-[#6F832E] mb-8">{orderId}</p>
          <button onClick={onBack} className="w-full py-4 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl font-semibold transition-all duration-300">
            {language === 'ko' ? '쇼핑 계속하기' : 'Continue Shopping'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] p-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-[#2C2C2C]/60 hover:text-[#6F832E] transition-colors mb-4">
            <ArrowLeft size={20} />
            {language === 'ko' ? '장바구니로 돌아가기' : 'Back to Cart'}
          </button>
          <h1 className="text-4xl font-bold text-[#111111]">{language === 'ko' ? '결제하기' : 'Checkout'}</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white border border-[#E6E6E0] rounded-3xl p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6 text-[#111111]">{language === 'ko' ? '결제 수단' : 'Payment Method'}</h2>
              <div className="space-y-3">
                {[
                  { key: 'card' as const, icon: CreditCard, label: language === 'ko' ? '신용/체크카드' : 'Credit/Debit Card' },
                  { key: 'paypal' as const, icon: Wallet, label: 'PayPal' },
                  { key: 'apple' as const, icon: Smartphone, label: 'Apple Pay' },
                ].map((method) => (
                  <motion.button key={method.key} whileHover={{ scale: 1.02 }} onClick={() => setPaymentMethod(method.key)} className={`w-full p-4 rounded-xl border-2 transition-all ${paymentMethod === method.key ? 'border-[#A9C356] bg-[#EEF2E0]' : 'border-[#E6E6E0] bg-white'}`}>
                    <div className="flex items-center gap-3 text-[#2C2C2C]">
                      <method.icon className="w-6 h-6" />
                      <span className="font-semibold">{method.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {paymentMethod === 'card' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-[#E6E6E0] rounded-3xl p-6">
                <h3 className="text-xl font-bold mb-4 text-[#111111]">{language === 'ko' ? '카드 정보' : 'Card Information'}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#2C2C2C]/60 mb-2">{language === 'ko' ? '카드 번호' : 'Card Number'}</label>
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#2C2C2C]/60 mb-2">{language === 'ko' ? '유효기간' : 'Expiry Date'}</label>
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C]" />
                    </div>
                    <div>
                      <label className="block text-sm text-[#2C2C2C]/60 mb-2">CVV</label>
                      <input type="text" placeholder="123" className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#2C2C2C]/60 mb-2">{language === 'ko' ? '카드 소유자' : 'Cardholder Name'}</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C]" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div>
            <div className="bg-white border border-[#E6E6E0] rounded-3xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-[#111111]">{language === 'ko' ? '주문 요약' : 'Order Summary'}</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-[#111111]">{item.name}</h3>
                      <p className="text-[#2C2C2C]/60 text-sm">{language === 'ko' ? '수량' : 'Qty'}: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-[#2C2C2C]">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              {/* 쿠폰 입력 */}
              <div className="mb-6">
                <p className="text-sm font-medium text-[#2C2C2C]/60 mb-2 flex items-center gap-1">
                  <Tag size={14} />
                  {language === 'ko' ? '쿠폰 코드' : 'Coupon Code'}
                </p>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between px-4 py-3 bg-[#EEF2E0] border border-[#A9C356]/40 rounded-xl">
                    <div>
                      <span className="font-mono font-bold text-[#6F832E] text-sm">{appliedCoupon.code}</span>
                      <span className="ml-2 text-xs text-[#6F832E]">
                        {language === 'ko' ? appliedCoupon.label : `-${(appliedCoupon.discount * 100).toFixed(0)}% OFF`}
                      </span>
                    </div>
                    <button onClick={handleRemoveCoupon} className="p-1 hover:bg-[#BBD07B]/30 rounded-lg transition-colors text-[#6F832E]">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      placeholder={language === 'ko' ? '쿠폰 코드 입력' : 'Enter coupon code'}
                      className={`flex-1 px-4 py-3 bg-[#FAFAF8] border rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C] text-sm ${couponStatus === 'error' ? 'border-red-400' : 'border-[#E6E6E0]'}`}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-3 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl text-sm font-semibold transition-all whitespace-nowrap"
                    >
                      {language === 'ko' ? '적용' : 'Apply'}
                    </button>
                  </div>
                )}
                {couponStatus === 'error' && (
                  <p className="mt-1.5 text-xs text-red-500">{language === 'ko' ? '유효하지 않은 쿠폰 코드입니다.' : 'Invalid coupon code.'}</p>
                )}
              </div>

              <div className="border-t border-[#E6E6E0] pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-[#2C2C2C]/60"><span>{language === 'ko' ? '소계' : 'Subtotal'}</span><span>${totalPrice.toFixed(2)}</span></div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#6F832E] font-medium">
                    <span>{language === 'ko' ? `쿠폰 할인 (-${(appliedCoupon.discount * 100).toFixed(0)}%)` : `Coupon (-${(appliedCoupon.discount * 100).toFixed(0)}%)`}</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#2C2C2C]/60"><span>{language === 'ko' ? '배송비' : 'Shipping'}</span><span className="text-[#6F832E]">FREE</span></div>
                <div className="flex justify-between text-[#2C2C2C]/60"><span>{language === 'ko' ? '세금' : 'Tax'}</span><span>${tax.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between mb-6 pt-4 border-t border-[#E6E6E0]">
                <span className="text-xl font-bold text-[#111111]">{language === 'ko' ? '총 금액' : 'Total'}</span>
                <div className="text-right">
                  {appliedCoupon && (
                    <p className="text-sm text-[#2C2C2C]/40 line-through">${(totalPrice * 1.1).toFixed(2)}</p>
                  )}
                  <span className="text-2xl font-bold text-[#6F832E]">${finalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={handlePayment} disabled={isProcessing} className="w-full py-4 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                {isProcessing ? (language === 'ko' ? '처리중...' : 'Processing...') : (language === 'ko' ? `$${finalPrice.toFixed(2)} 결제하기` : `Pay $${finalPrice.toFixed(2)}`)}
              </button>
              <p className="text-xs text-[#2C2C2C]/40 text-center mt-4">{language === 'ko' ? '안전한 결제 시스템으로 보호됩니다' : 'Protected by secure payment system'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
