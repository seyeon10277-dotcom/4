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
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

type PageView = 'home' | 'checkout' | 'account' | 'productDetail';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageView>('home');

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

  const handleGoToProductDetail = () => {
    setCurrentPage('productDetail');
  };

  const handleGoHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                onSearchOpen={() => setSearchOpen(true)}
                onCartOpen={() => setCartOpen(true)}
                onAuthOpen={() => setAuthOpen(true)}
                onGoToAccount={handleGoToAccount}
                onGoHome={handleGoHome}
                onGoToProducts={handleGoToProducts}
              />
              <ProductDetail onBuyNow={handleBuyNow} onBack={handleGoHome} />
              <Footer />
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
            />

            {/* Main Content */}
            <main className="relative z-10">
              <Hero onShopNow={handleGoToProductDetail} />
              <ProductShowcase onBuyNow={handleBuyNow} />
              <TechFeatures onBuyNow={() => setCurrentPage('checkout')} />
              <BrandStory />
            </main>

            {/* Footer */}
            <Footer />

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
