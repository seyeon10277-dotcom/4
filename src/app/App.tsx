import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { ProductShowcase } from './components/ProductShowcase';
import { TechFeatures } from './components/TechFeatures';
import { BrandStory } from './components/BrandStory';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { SearchDialog } from './components/SearchDialog';
import { Chatbot } from './components/Chatbot';
import { AuthModal } from './components/AuthModal';
import { CheckoutPage } from './components/CheckoutPage';
import { CouponPopup } from './components/CouponPopup';
import { AccountPage } from './components/AccountPage';
import { ProductDetail } from './components/ProductDetail';
import { ProductDetail_2 } from './components/ProductDetail_2';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { About } from './components/About';


type PageView = 'home' | 'checkout' | 'account' | 'productDetail' | 'about';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [currentView, setCurrentView] = useState<'home' | 'detail'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  useEffect(() => {
    if (menuOpen || cartOpen || searchOpen || authOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen, cartOpen, searchOpen, authOpen]);

  const handleCheckout = () => {
    setCartOpen(false);
    setCurrentPage('checkout');
  };

  const handleBackFromCheckout = () => {
    setCurrentPage('home');
  };

  const handleGoToAccount = () => {
    setCurrentPage('account');
  };

  const handleGoToProductDetail = (productId?: number | string) => {
    if (productId) {
      setSelectedProductId(productId.toString());
    } else {
    setSelectedProductId('blackpink-special-edition'); // ❌ 기존 '1'에서 변경
  }
  setCurrentPage('productDetail');
};
  const handleGoHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    // setCurrentView('detail'); // 기존 잘못된 상태 업데이트 제거
    setCurrentPage('productDetail'); // currentPage 상태 업데이트로 수정
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedProductId(null);
  };

  const handleGoToProducts = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('products');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBuyNow = () => {
    setCurrentPage('checkout');
  };

  const handleGoToAbout = () => {
  setCurrentPage('about');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'checkout') {
    return (
      <AuthProvider>
        <CartProvider>
          <LanguageProvider>
            <CheckoutPage onBack={handleBackFromCheckout} />
          </LanguageProvider>
        </CartProvider>
      </AuthProvider>
    );
  }

  if (currentPage === 'account') {
    return (
      <AuthProvider>
        <CartProvider>
          <LanguageProvider>
            <AccountPage onBack={handleGoHome} />
          </LanguageProvider>
        </CartProvider>
      </AuthProvider>
    );
  }

  if (currentPage === 'productDetail') {
    return (
      <AuthProvider>
        <CartProvider>
          <LanguageProvider>
            <div className="relative min-h-screen bg-[#FAFAF8] text-[#2C2C2C] overflow-x-hidden">
              <Toaster position="top-center" richColors />
              <Navigation 
                onGoHome={handleGoHome} 
                onSearchOpen={() => setSearchOpen(true)}
                onCartOpen={() => setCartOpen(true)}
                onAuthOpen={() => setAuthOpen(true)}
                onGoToAccount={handleGoToAccount}
                onGoToProducts={handleGoToProducts}
                onGoToAbout={handleGoToAbout}
              />

              {/* ID 분기 로직 적용 */}
              {selectedProductId === 'blackpink-special-edition' ? (
                <ProductDetail_2 onBuyNow={handleBuyNow} onBack={handleGoHome} />
              ) : (
                <ProductDetail onBuyNow={handleBuyNow} onBack={handleGoHome} />
              )}

              <Footer onGoToAbout={handleGoToAbout} />
              {/* 모달 및 챗봇 생략 */}
            </div>
          </LanguageProvider>
        </CartProvider>
      </AuthProvider>
    );
  }

  if (currentPage === 'about') {
    return (
      <AuthProvider>
        <CartProvider>
          <LanguageProvider>
            <div className="relative min-h-screen bg-[#FAFAF8] text-[#2C2C2C] overflow-x-hidden">
              <Toaster position="top-center" richColors />
              <Navigation
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                onSearchOpen={() => setSearchOpen(true)}
                onCartOpen={() => setCartOpen(true)}
                onAuthOpen={() => setAuthOpen(true)}
                onGoToAccount={handleGoToAccount}
                onGoHome={handleGoHome}
                onGoToProducts={handleGoToProducts}
                onGoToAbout={handleGoToAbout} // Props 전달 필요 시
              />
              <About onBack={handleGoHome} onShopNow={handleGoToProductDetail} />
              <Footer onGoToAbout={handleGoToAbout} />
              <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
              <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
              <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} onGoToAccount={handleGoToAccount} />
              <Chatbot />
            </div>
          </LanguageProvider>
        </CartProvider>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <LanguageProvider>
          <div className="relative min-h-screen bg-[#FAFAF8] text-[#2C2C2C] overflow-x-hidden">
            <Toaster position="top-center" richColors />

            {/* Navigation */}
            <Navigation
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              onSearchOpen={() => setSearchOpen(true)}
              onCartOpen={() => setCartOpen(true)}
              onAuthOpen={() => setAuthOpen(true)}
              onGoToAccount={handleGoToAccount}
              onGoHome={handleGoHome}
              onGoToProducts={handleGoToProducts}
              onGoToAbout={handleGoToAbout}
            />

            {/* Main Content */}
            <main className="relative z-10">
              <Hero onShopNow={handleGoToProductDetail} />
              <ProductShowcase onBuyNow={handleBuyNow} onProductClick={handleProductClick} />
              <TechFeatures onBuyNow={() => setCurrentPage('checkout')} />
              <BrandStory />
            </main>

            {/* Footer */}
            <Footer onGoToAbout={handleGoToAbout} />

            {/* Modals & Dialogs */}
            <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
            <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} onGoToAccount={handleGoToAccount} />

            {/* Chatbot */}
            <Chatbot />

            {/* Coupon Popup Ad */}
            <CouponPopup onOpenAuth={() => setAuthOpen(true)} />
          </div>
        </LanguageProvider>
      </CartProvider>
    </AuthProvider>
  );
}
