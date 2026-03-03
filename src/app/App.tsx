import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { ProductShowcase } from './components/ProductShowcase';
import { TechFeatures } from './components/TechFeatures';
import { BrandStory } from './components/BrandStory';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
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
import { TermsPage } from './components/TermsPage';


type PageView = 'home' | 'checkout' | 'account' | 'productDetail' | 'about' | 'terms';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  useEffect(() => {
    if (menuOpen || cartOpen || authOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen, cartOpen, authOpen]);

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
      setSelectedProductId('blackpink-special-edition');
    }
    setCurrentPage('productDetail');
  };

  const handleGoHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('productDetail');
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

  const handleGoToTerms = () => {
    setCurrentPage('terms');
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
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                onGoHome={handleGoHome}
                onCartOpen={() => setCartOpen(true)}
                onAuthOpen={() => setAuthOpen(true)}
                onGoToAccount={handleGoToAccount}
                onGoToProducts={handleGoToProducts}
                onGoToAbout={handleGoToAbout}
              />
              {selectedProductId === 'blackpink-special-edition' ? (
                <ProductDetail_2 onBuyNow={handleBuyNow} onBack={handleGoHome} />
              ) : (
                <ProductDetail onBuyNow={handleBuyNow} onBack={handleGoHome} />
              )}
              <Footer
                onGoToAbout={handleGoToAbout}
                onProductClick={handleProductClick}
                onGoToTerms={handleGoToTerms}
              />
              <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
              <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} onGoToAccount={handleGoToAccount} />
              <Chatbot />
            </div>
          </LanguageProvider>
        </CartProvider>
      </AuthProvider>
    );
  }

  if (currentPage === 'terms') {
    return (
      <AuthProvider>
        <CartProvider>
          <LanguageProvider>
            <TermsPage onBack={handleGoHome} />
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
                onCartOpen={() => setCartOpen(true)}
                onAuthOpen={() => setAuthOpen(true)}
                onGoToAccount={handleGoToAccount}
                onGoHome={handleGoHome}
                onGoToProducts={handleGoToProducts}
                onGoToAbout={handleGoToAbout}
              />
              <About onBack={handleGoHome} onShopNow={handleGoToProductDetail} />
              <Footer
                onGoToAbout={handleGoToAbout}
                onProductClick={handleProductClick}
                onGoToTerms={handleGoToTerms}
              />
              <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
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

            <Navigation
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              onCartOpen={() => setCartOpen(true)}
              onAuthOpen={() => setAuthOpen(true)}
              onGoToAccount={handleGoToAccount}
              onGoHome={handleGoHome}
              onGoToProducts={handleGoToProducts}
              onGoToAbout={handleGoToAbout}
            />

            <main className="relative z-10">
              <Hero onShopNow={handleGoToProductDetail} />
              <ProductShowcase onBuyNow={handleBuyNow} onProductClick={handleProductClick} />
              <TechFeatures onBuyNow={() => setCurrentPage('checkout')} />
              <BrandStory />
            </main>

            <Footer
              onGoToAbout={handleGoToAbout}
              onProductClick={handleProductClick}
              onGoToTerms={handleGoToTerms}
            />

            <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} onGoToAccount={handleGoToAccount} />
            <Chatbot />
            <CouponPopup onOpenAuth={() => setAuthOpen(true)} />
          </div>
        </LanguageProvider>
      </CartProvider>
    </AuthProvider>
  );
}
