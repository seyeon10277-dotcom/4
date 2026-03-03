import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Package, Ticket, Mail, Shield, Copy, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { CartItem } from '../contexts/CartContext';

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: string;
}

interface AccountPageProps {
  onBack: () => void;
}

type AccountTab = 'profile' | 'orders' | 'coupons';

export function AccountPage({ onBack }: AccountPageProps) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<AccountTab>('profile');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('klear_orders');
    if (saved) setOrders(JSON.parse(saved));
  }, [activeTab]);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    });
  };

  const tabs = [
    { key: 'profile' as const, label: language === 'ko' ? '개인정보' : 'Profile', icon: User },
    { key: 'orders' as const, label: language === 'ko' ? '주문내역' : 'Orders', icon: Package },
    { key: 'coupons' as const, label: language === 'ko' ? '쿠폰함' : 'Coupons', icon: Ticket },
  ];

  const coupons = [
    {
      code: 'WELCOME20',
      discount: '20%',
      description: language === 'ko' ? '신규 회원 할인 쿠폰' : 'New Member Discount',
      expiry: '2026-12-31',
      active: true,
    },
    {
      code: 'SUMMER10',
      discount: '10%',
      description: language === 'ko' ? '여름 특별 할인' : 'Summer Special',
      expiry: '2026-08-31',
      active: true,
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4">
        <div className="text-center">
          <User className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
          <p className="text-[#2C2C2C]/60 mb-4">{language === 'ko' ? '로그인이 필요합니다' : 'Please log in first'}</p>
          <button onClick={onBack} className="px-6 py-3 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl font-semibold transition-all">
            {language === 'ko' ? '홈으로 돌아가기' : 'Go Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-[#2C2C2C]/60 hover:text-[#6F832E] transition-colors mb-4">
            <ArrowLeft size={20} />
            {language === 'ko' ? '홈으로 돌아가기' : 'Back to Home'}
          </button>
          <h1 className="text-4xl font-bold text-[#111111]">{language === 'ko' ? '마이페이지' : 'My Account'}</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E6E6E0] rounded-2xl p-6 sticky top-8">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-[#E6E6E0]">
                <div className="w-16 h-16 bg-[#EEF2E0] rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-[#6F832E]" />
                </div>
                <p className="font-bold text-[#111111]">{user.login_id}</p>
                {user.email && <p className="text-sm text-[#2C2C2C]/60">{user.email}</p>}
              </div>

              {/* Nav Items */}
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === tab.key
                        ? 'bg-[#EEF2E0] text-[#6F832E] font-semibold'
                        : 'text-[#2C2C2C]/60 hover:bg-[#FAFAF8] hover:text-[#6F832E]'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white border border-[#E6E6E0] rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6 text-[#111111]">{language === 'ko' ? '개인정보' : 'Profile Information'}</h2>
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#2C2C2C]/60 mb-2">{language === 'ko' ? '아이디' : 'Username'}</label>
                        <div className="flex items-center gap-3 px-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl">
                          <User className="w-5 h-5 text-[#6F832E]" />
                          <span className="text-[#2C2C2C] font-medium">{user.login_id}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2C2C2C]/60 mb-2">{language === 'ko' ? '이메일' : 'Email'}</label>
                        <div className="flex items-center gap-3 px-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl">
                          <Mail className="w-5 h-5 text-[#6F832E]" />
                          <span className="text-[#2C2C2C] font-medium">{user.email || (language === 'ko' ? '등록되지 않음' : 'Not registered')}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C]/60 mb-2">{language === 'ko' ? '회원 등급' : 'Membership'}</label>
                      <div className="flex items-center gap-3 px-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl">
                        <Shield className="w-5 h-5 text-[#6F832E]" />
                        <span className="text-[#2C2C2C] font-medium">{language === 'ko' ? '일반 회원' : 'Standard Member'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white border border-[#E6E6E0] rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6 text-[#111111]">{language === 'ko' ? '주문내역' : 'Order History'}</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-16">
                      <Package className="w-12 h-12 text-[#2C2C2C]/20 mx-auto mb-3" />
                      <p className="text-[#2C2C2C]/40">{language === 'ko' ? '주문 내역이 없습니다.' : 'No orders yet.'}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-[#E6E6E0] rounded-xl p-5 hover:bg-[#FAFAF8] transition-colors">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-bold text-[#111111]">{order.id}</p>
                              <p className="text-sm text-[#2C2C2C]/60">{order.date}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-50 text-amber-600">
                              {language === 'ko' ? '배송준비중' : 'Processing'}
                            </span>
                          </div>
                          <div className="space-y-1 mb-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between text-sm text-[#2C2C2C]">
                                <span>{item.name} × {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-[#E6E6E0]">
                            <span className="text-sm text-[#2C2C2C]/60">{language === 'ko' ? '총 결제금액' : 'Total'}</span>
                            <p className="font-bold text-[#6F832E]">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Coupons Tab */}
              {activeTab === 'coupons' && (
                <div className="bg-white border border-[#E6E6E0] rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6 text-[#111111]">{language === 'ko' ? '쿠폰함' : 'My Coupons'}</h2>
                  <div className="space-y-4">
                    {coupons.map((coupon) => (
                      <div key={coupon.code} className="border border-[#A9C356]/30 rounded-xl overflow-hidden">
                        <div className="flex">
                          <div className="bg-gradient-to-br from-[#A9C356] to-[#8FA93C] text-white p-6 flex items-center justify-center min-w-[120px]">
                            <div className="text-center">
                              <div className="text-3xl font-bold">{coupon.discount}</div>
                              <div className="text-xs opacity-80">OFF</div>
                            </div>
                          </div>
                          <div className="flex-1 p-5">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-bold text-[#111111] mb-1">{coupon.description}</p>
                                <p className="text-sm text-[#2C2C2C]/60">{language === 'ko' ? '만료일' : 'Expires'}: {coupon.expiry}</p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${coupon.active ? 'bg-[#EEF2E0] text-[#6F832E]' : 'bg-gray-100 text-gray-400'}`}>
                                {coupon.active ? (language === 'ko' ? '사용가능' : 'Active') : (language === 'ko' ? '만료됨' : 'Expired')}
                              </span>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <code className="px-3 py-1.5 bg-[#FAFAF8] border border-[#E6E6E0] rounded-lg text-sm font-mono font-bold text-[#6F832E]">{coupon.code}</code>
                              <button
                                onClick={() => handleCopyCoupon(coupon.code)}
                                className="p-1.5 bg-[#EEF2E0] rounded-lg hover:bg-[#BBD07B]/30 transition-colors text-[#6F832E]"
                              >
                                {copiedCode === coupon.code ? <Check size={16} /> : <Copy size={16} />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
