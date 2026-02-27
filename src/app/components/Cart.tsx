import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function Cart({ isOpen, onClose, onCheckout }: CartProps) {
  const { cart, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();
  const { language } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-50" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-[#111111]">
                  <ShoppingBag className="w-6 h-6 text-[#6F832E]" />
                  {language === 'ko' ? '장바구니' : 'Shopping Cart'}
                </h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-[#EEF2E0] transition-colors text-[#2C2C2C]"><X size={24} /></button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
                  <p className="text-[#2C2C2C]/60">{language === 'ko' ? '장바구니가 비어있습니다' : 'Your cart is empty'}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-[#FAFAF8] border border-[#E6E6E0] rounded-2xl p-4">
                      <div className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1 text-[#111111]">{item.name}</h3>
                          <p className="text-[#6F832E] font-bold">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 bg-[#EEF2E0] rounded-lg hover:bg-[#BBD07B]/30 transition-colors text-[#2C2C2C]"><Minus size={16} /></button>
                            <span className="w-8 text-center font-semibold text-[#2C2C2C]">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 bg-[#EEF2E0] rounded-lg hover:bg-[#BBD07B]/30 transition-colors text-[#2C2C2C]"><Plus size={16} /></button>
                            <button onClick={() => removeFromCart(item.id)} className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[#E6E6E0]">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#2C2C2C]/60">{language === 'ko' ? '총 상품' : 'Total Items'}:</span>
                    <span className="font-semibold text-[#2C2C2C]">{totalItems}</span>
                  </div>
                  <div className="flex justify-between mb-6">
                    <span className="text-[#2C2C2C]/60">{language === 'ko' ? '총 금액' : 'Total Price'}:</span>
                    <span className="text-2xl font-bold text-[#6F832E]">${totalPrice.toFixed(2)}</span>
                  </div>
                  <button onClick={onCheckout} className="w-full py-4 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#A9C356]/30 transition-all duration-300 hover:scale-105">
                    {language === 'ko' ? '결제하기' : 'Checkout'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
