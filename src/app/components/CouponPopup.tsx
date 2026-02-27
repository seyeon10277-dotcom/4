import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CouponPopupProps {
  onOpenAuth?: () => void;
}

export function CouponPopup({ onOpenAuth }: CouponPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('klear_coupon_dismissed');
      if (!dismissed) {
        setIsOpen(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('klear_coupon_dismissed', 'true');
  };

  const handleSignUp = () => {
    setIsOpen(false);
    sessionStorage.setItem('klear_coupon_dismissed', 'true');
    if (onOpenAuth) onOpenAuth();
  };

  const handleDontShowToday = () => {
    setIsOpen(false);
    sessionStorage.setItem('klear_coupon_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 50 }} transition={{ type: 'spring', damping: 20, stiffness: 300 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[60] px-4">
            <div className="relative bg-white border-2 border-[#A9C356]/40 rounded-3xl shadow-2xl overflow-hidden">
              <button onClick={handleClose} className="absolute top-4 right-4 p-2 bg-[#EEF2E0] hover:bg-[#BBD07B]/30 rounded-full transition-colors z-10">
                <X size={20} className="text-[#6F832E]" />
              </button>

              {/* Decorative particles */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-8 left-8 w-3 h-3 bg-[#A9C356] rounded-full opacity-40" />
                <motion.div animate={{ y: [10, -10, 10], x: [5, -5, 5] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-16 right-16 w-2 h-2 bg-[#BBD07B] rounded-full opacity-40" />
              </div>

              {/* Product Image Banner */}
              <div className="relative pt-6 pb-2 px-8">
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80" alt="Klear Product" className="w-full h-40 object-cover rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6F832E]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="text-white text-sm font-bold">{language === 'ko' ? '신규 회원 특별 혜택!' : 'New Member Special!'}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative pb-6 px-8 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles size={18} className="text-[#A9C356]" />
                    <span className="text-[#6F832E] text-sm font-semibold tracking-wider uppercase">
                      {language === 'ko' ? '신규 회원 특별 혜택' : 'New Member Special Offer'}
                    </span>
                    <Sparkles size={18} className="text-[#A9C356]" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-3 text-[#6F832E]">20% OFF</h2>
                  <p className="text-lg text-[#2C2C2C] mb-2">
                    {language === 'ko' ? '회원가입하고 할인 받으세요!' : 'Sign up and get your discount!'}
                  </p>
                  <p className="text-sm text-[#2C2C2C]/60 mb-6">
                    {language === 'ko' ? '모든 제품에 적용 가능 | 기간 한정' : 'Applicable to all products | Limited time only'}
                  </p>
                </motion.div>

                {/* CTA Button */}
                <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} onClick={handleSignUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full py-4 bg-[#A9C356] hover:bg-[#8FA93C] rounded-xl font-bold text-lg text-white shadow-lg shadow-[#A9C356]/20 hover:shadow-xl transition-all duration-300 mb-3">
                  {language === 'ko' ? '지금 회원가입하기' : 'Sign Up Now'}
                </motion.button>

                <button onClick={handleDontShowToday} className="text-sm text-[#2C2C2C]/40 hover:text-[#2C2C2C]/60 transition-colors">
                  {language === 'ko' ? '오늘 하루 보지 않기' : "Don't show again today"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
