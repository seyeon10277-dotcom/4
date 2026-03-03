import { useState, useEffect } from 'react';
import { Menu, X, Globe, ShoppingCart, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  onCartOpen: () => void;
  onAuthOpen: () => void;
  onGoToAccount?: () => void;
  onGoHome?: () => void;
  onGoToProducts?: () => void;
  onGoToAbout?: () => void;
}

export function Navigation({ menuOpen, setMenuOpen, onCartOpen, onAuthOpen, onGoToAccount, onGoHome, onGoToProducts, onGoToAbout }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.products'), href: '#products' },
    { label: t('nav.about'), href: '#about' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-white/70 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="cursor-pointer flex items-center gap-2"
              onClick={onGoHome}
            >
              <img src="/klear-logo-header.png" alt="Klear" className="h-10 w-auto rounded-lg" />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                        e.preventDefault();
                        if (item.href === '#home') {
                          if (onGoHome) onGoHome();
                        } else if (item.href === '#products') {
                          if (onGoToProducts) onGoToProducts();
                        } else if (item.href === '#about') {
                          if (onGoToAbout) onGoToAbout(); // About 페이지 전환 실행
                        }
                        if (setMenuOpen) setMenuOpen(false); // 모바일 메뉴 닫기 대응
                      }}
                  className="text-[#2C2C2C] hover:text-[#6F832E] transition-colors relative group px-3 py-2"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A9C356] group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}

              {/* Cart Button */}
              <button
                onClick={onCartOpen}
                className="relative p-2 rounded-lg hover:bg-[#EEF2E0] transition-colors text-[#2C2C2C]"
                title={language === 'ko' ? '장바구니' : 'Cart'}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#A9C356] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Auth Button */}
              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onGoToAccount}
                    className="text-sm text-[#6F832E] hover:text-[#8FA93C] font-semibold cursor-pointer transition-colors"
                  >
                    {user.login_id}
                  </button>
                  <button
                    onClick={signOut}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                    title={language === 'ko' ? '로그아웃' : 'Logout'}
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAuthOpen}
                  className="flex items-center gap-2 px-4 py-2 bg-[#EEF2E0] hover:bg-[#BBD07B] rounded-full transition-all duration-300 text-[#6F832E]"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {language === 'ko' ? '로그인' : 'Login'}
                  </span>
                </button>
              )}
              
              {/* Language Toggle Button */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 bg-[#EEF2E0] hover:bg-[#BBD07B] rounded-full transition-all duration-300 text-[#6F832E]"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-semibold">{language === 'ko' ? '한국어' : 'English'}</span>
              </button>
            </div>

            {/* Mobile Buttons */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={onCartOpen}
                className="relative p-2 rounded-lg hover:bg-[#EEF2E0] transition-colors text-[#2C2C2C]"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#A9C356] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-lg hover:bg-[#EEF2E0] transition-colors text-[#2C2C2C]"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg hover:bg-[#EEF2E0] transition-colors text-[#2C2C2C]"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Slide */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white z-40 md:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full pt-24 px-8">
              {/* User Info */}
              {user && (
                <div className="mb-6 p-4 bg-[#EEF2E0] rounded-2xl">
                  <p className="text-sm text-[#6F832E]">{language === 'ko' ? '환영합니다' : 'Welcome'}</p>
                  <p className="font-semibold text-lg text-[#111111]">{user.login_id}</p>
                </div>
              )}

              {/* Menu Items */}
              <div className="flex-1 space-y-6">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      setMenuOpen(false);
                      if (item.href === '#home') {
                        if (onGoHome) onGoHome();
                      } else if (item.href === '#products') {
                        if (onGoToProducts) onGoToProducts();
                      } else if (item.href === '#about') {
                        if (onGoToAbout) onGoToAbout();
                      }
                    }}
                    className="block text-2xl text-[#2C2C2C] hover:text-[#6F832E] transition-colors hover:translate-x-2 transform duration-300"
                  >
                    {item.label}
                  </motion.a>
                ))}

                {/* Auth Button */}
                {user ? (
                  <>
                    <motion.button
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      onClick={() => {
                        if (onGoToAccount) onGoToAccount();
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-2xl text-[#6F832E] hover:text-[#8FA93C] transition-colors hover:translate-x-2 transform duration-300"
                    >
                      <User className="w-6 h-6" />
                      {language === 'ko' ? '마이페이지' : 'My Account'}
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => {
                        signOut();
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-2xl text-red-500 hover:text-red-400 transition-colors hover:translate-x-2 transform duration-300"
                    >
                      <LogOut className="w-6 h-6" />
                      {language === 'ko' ? '로그아웃' : 'Logout'}
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => {
                      onAuthOpen();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-2xl text-[#2C2C2C] hover:text-[#6F832E] transition-colors hover:translate-x-2 transform duration-300"
                  >
                    <User className="w-6 h-6" />
                    {language === 'ko' ? '로그인' : 'Login'}
                  </motion.button>
                )}
              </div>

              {/* Brand Story Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pb-8 border-t border-[#E6E6E0] pt-6"
              >
                <h3 className="text-sm font-semibold text-[#6F832E] mb-2">
                  {t('footer.innovation')}
                </h3>
                <p className="text-sm text-[#2C2C2C]/60">
                  {t('footer.innovation.desc')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
