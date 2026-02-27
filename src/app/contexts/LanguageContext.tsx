import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { translateText, isDeepLAvailable } from '../../lib/deepl';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateWithDeepL: (text: string, targetLang: 'KO' | 'EN-US') => Promise<string>;
  isDeepLReady: boolean;
}

const translations = {
  ko: {
    // Navigation
    'nav.home': '홈',
    'nav.products': '제품',
    'nav.technology': '기술',
    'nav.story': '우리의 이야기',
    'nav.contact': '연락처',
    
    // Hero
    'hero.badge1': '베스트 셀러',
    'hero.badge2': 'SPF 50 PA++++',
    'hero.subtitle1': 'Premium Korean Skincare',
    'hero.subtitle2': '가벼운 선 프로텍션',
    'hero.title1': 'BLACK PINK Speical Edition Skincare Set',
    'hero.title2': 'Bemot Moisturizing Sun Serum SPF 50',
    'hero.desc1': '가볍고 촉촉한 선 세럼으로 하루 종일 편안한 자외선 차단을 경험하세요. 백탁 없는 자연스러운 글로우.',
    'hero.desc2': '베모트리지놀 성분의 수분 선 세럼. 오일프리 포뮬러로 산뜻하게 피부를 보호합니다.',
    'hero.cta1': '지금 쇼핑하기',
    'hero.stat1': 'SPF 50',
    'hero.stat2': 'K-Beauty',
    
    // Products
    'products.badge': 'BEST SELLERS',
    'products.title': 'Best Sellers',
    'products.subtitle': '가벼운 자외선 차단과 깊은 수분을 동시에 경험하세요',
    'products.device': 'Sun Serum',
    'products.serum': 'Sun Serum',
    'products.feature1': 'SPF 50',
    'products.feature2': 'No White Cast',
    'products.feature3': 'Oil-Free',
    'products.feature4': 'Bemotrizinol',
    'products.feature5': '깊은 수분 공급',
    'products.feature6': '진정 케어',
    'products.cta': '지금 구매하기',
    'products.benefit1.title': '이중 보호',
    'products.benefit1.desc': 'UV 차단과 깊은 수분 공급을 동시에',
    'products.benefit2.title': '가벼운 텍스처',
    'products.benefit2.desc': '끈적임 없이 빠르게 흡수, 메이크업 베이스로 완벽',
    'products.benefit3.title': '진정 & 카밍',
    'products.benefit3.desc': '홍조와 자극을 줄여주는 성분 함유',
    'products.benefit4.title': '오래가는 수분',
    'products.benefit4.desc': '무겁지 않게 하루 종일 피부 수분 유지',
    
    // Technology
    'tech.badge': '성분 스포트라이트',
    'tech.title': '과학이 만든 포뮬러',
    'tech.subtitle': '엄선된 성분으로 효과적인 자외선 차단과 스킨케어를 동시에',
    'tech.ai.title': '나이아신아마이드 5%',
    'tech.ai.desc': '피부 톤을 밝히고, 모공을 최소화하며, 피부 장벽을 강화합니다',
    'tech.rf.title': '히알루론산',
    'tech.rf.desc': '다중 분자량으로 깊은 곳과 표면 모두에 수분을 공급합니다',
    'tech.led.title': '센텔라 아시아티카',
    'tech.led.desc': '자극을 진정시키고, 피부 회복과 카밍을 지원합니다',
    'tech.tracking.title': '비타민 E',
    'tech.tracking.desc': '환경 스트레스로부터 피부를 보호하는 항산화 성분',
    'tech.pdrn.title': '징크옥사이드 + 티타늄디옥사이드',
    'tech.pdrn.desc': '미네랄 기반의 광범위 자외선 차단 필터',
    'tech.app.title': '녹차 추출물',
    'tech.app.desc': '항염 효과로 자유 라디칼 손상으로부터 보호합니다',
    'tech.stat1': '고객 만족도',
    'tech.stat2': '결과까지 걸리는 시간',
    'tech.stat3': '만족한 고객',
    'tech.stat4': '뷰티 어워드',
    'tech.cta.title': '피부를 변화시킬 준비가 되셨나요?',
    'tech.cta.button': '오늘 시작하기',
    
    // Story
    'story.badge': '브랜드 철학',
    'story.title': 'Klear Story',
    'story.subtitle': '효과적이고 편안한 스킨케어로 일상에 자연스럽게 녹아드는 제품을 만듭니다',
    'story.years': '년의 혁신',
    'story.milestone1.title': '서울에서 설립',
    'story.milestone1.desc': '진정한 스킨케어 혁신의 비전으로 시작',
    'story.milestone2.title': '글로벌 확장',
    'story.milestone2.desc': 'Bemot Sun Serum으로 글로벌 시장 진출',
    'story.milestone3.title': '혁신상 수상',
    'story.milestone3.desc': '베모트리지놀 기반 포뮬러로 인정받음',
    'story.milestone4.title': '시장 리더',
    'story.milestone4.desc': 'K-Beauty 프리미엄 선케어 브랜드',
    'story.value1.title': '글로벌 혁신',
    'story.value1.desc': '한국 스킨케어 기술을 전 세계로',
    'story.value2.title': '정밀 포뮬러',
    'story.value2.desc': '과학적으로 검증된 성분만 사용',
    'story.value3.title': '입증된 결과',
    'story.value3.desc': '임상 테스트 및 과학적 검증',
    'story.value4.title': '고객 우선',
    'story.value4.desc': '모든 피부 타입을 위한 개인 맞춤형 솔루션',
    
    // Footer
    'footer.newsletter.title': '최신 소식 받기',
    'footer.newsletter.desc': '신제품, 뷰티 팁, 특별 혜택에 대한 독점 액세스',
    'footer.newsletter.placeholder': '이메일을 입력하세요',
    'footer.newsletter.button': '구독하기',
    'footer.tagline': '프리미엄 K-Beauty 선케어 솔루션으로 가볍고 편안한 자외선 차단을 선도합니다.',
    'footer.products': '제품',
    'footer.company': '회사',
    'footer.support': '지원',
    'footer.legal': '법률',
    'footer.product1': 'Bemot Sun Serum SPF 50',
    'footer.product2': 'Sun Care Collection',
    'footer.product3': 'Skincare Line',
    'footer.product4': 'New Arrivals',
    'footer.company1': '회사 소개',
    'footer.company2': '성분',
    'footer.company3': '채용',
    'footer.company4': '언론',
    'footer.support1': '고객센터',
    'footer.support2': '배송 정보',
    'footer.support3': '반품',
    'footer.support4': '보증',
    'footer.legal1': '개인정보 처리방침',
    'footer.legal2': '이용약관',
    'footer.legal3': '쿠키 정책',
    'footer.legal4': '접근성',
    'footer.copyright': '© 2026 Klear. All rights reserved.',
    'footer.innovation': '글로벌 혁신',
    'footer.innovation.desc': 'K-Beauty 프리미엄 선케어 솔루션으로 가볍고 편안한 자외선 차단을 선도합니다.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.technology': 'Ingredients',
    'nav.story': 'Our Story',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.badge1': 'BEST SELLER',
    'hero.badge2': 'SPF 50 PA++++',
    'hero.subtitle1': 'Premium Korean Skincare',
    'hero.subtitle2': 'Lightweight Sun Protection',
    'hero.title1': 'Bemot Moisturizing Sun Serum SPF 50',
    'hero.title2': 'Bemot Moisturizing Sun Serum SPF 50',
    'hero.desc1': 'Lightweight sun protection that moisturizes and soothes for all-day comfort. No white cast, natural glow finish.',
    'hero.desc2': 'Bemotrizinol-powered moisturizing sun serum. Oil-free formula for fresh, protected skin.',
    'hero.cta1': 'Shop Now',
    'hero.stat1': 'SPF 50',
    'hero.stat2': 'K-Beauty',
    
    // Products
    'products.badge': 'BEST SELLERS',
    'products.title': 'Best Sellers',
    'products.subtitle': 'Experience lightweight UV protection with deep hydration',
    'products.device': 'Sun Serum',
    'products.serum': 'Sun Serum',
    'products.feature1': 'SPF 50',
    'products.feature2': 'No White Cast',
    'products.feature3': 'Oil-Free',
    'products.feature4': 'Bemotrizinol',
    'products.feature5': 'Deep Hydration',
    'products.feature6': 'Soothing Care',
    'products.cta': 'Buy Now',
    'products.benefit1.title': 'Dual Protection',
    'products.benefit1.desc': 'Combines UV defense with deep hydration',
    'products.benefit2.title': 'Lightweight Texture',
    'products.benefit2.desc': 'Non-greasy, absorbs quickly, perfect under makeup',
    'products.benefit3.title': 'Soothing & Calming',
    'products.benefit3.desc': 'Contains ingredients that reduce redness and irritation',
    'products.benefit4.title': 'Long-Lasting Moisture',
    'products.benefit4.desc': 'Keeps skin hydrated throughout the day without heaviness',
    
    // Technology
    'tech.badge': 'INGREDIENT SPOTLIGHT',
    'tech.title': 'Science-Backed Formula',
    'tech.subtitle': 'Carefully selected ingredients for effective UV protection and skincare',
    'tech.ai.title': 'Niacinamide 5%',
    'tech.ai.desc': 'Brightens skin tone, minimizes pores, strengthens skin barrier',
    'tech.rf.title': 'Hyaluronic Acid',
    'tech.rf.desc': 'Multi-weight molecules provide deep and surface hydration',
    'tech.led.title': 'Centella Asiatica',
    'tech.led.desc': 'Soothes irritation, supports skin repair and calming',
    'tech.tracking.title': 'Vitamin E',
    'tech.tracking.desc': 'Antioxidant protection against environmental stressors',
    'tech.pdrn.title': 'Zinc Oxide + Titanium Dioxide',
    'tech.pdrn.desc': 'Mineral-based broad spectrum UV filters',
    'tech.app.title': 'Green Tea Extract',
    'tech.app.desc': 'Anti-inflammatory, protects against free radical damage',
    'tech.stat1': 'Customer Satisfaction',
    'tech.stat2': 'Weeks to Results',
    'tech.stat3': 'Happy Customers',
    'tech.stat4': 'Beauty Awards',
    'tech.cta.title': 'Ready to Transform Your Skin?',
    'tech.cta.button': 'Get Started Today',
    
    // Story
    'story.badge': 'BRAND PHILOSOPHY',
    'story.title': 'Klear Story',
    'story.subtitle': 'Creating effective, comfortable skincare that fits seamlessly into daily life',
    'story.years': 'Years of Innovation',
    'story.milestone1.title': 'Founded in Seoul',
    'story.milestone1.desc': 'Started with a vision for genuine skincare innovation',
    'story.milestone2.title': 'Global Expansion',
    'story.milestone2.desc': 'Launched globally with Bemot Sun Serum',
    'story.milestone3.title': 'Innovation Award',
    'story.milestone3.desc': 'Recognized for bemotrizinol-based formula',
    'story.milestone4.title': 'Market Leader',
    'story.milestone4.desc': 'K-Beauty premium sun care brand',
    'story.value1.title': 'Global Innovation',
    'story.value1.desc': 'Bringing Korean skincare technology to the world',
    'story.value2.title': 'Precision Formula',
    'story.value2.desc': 'Only scientifically validated ingredients',
    'story.value3.title': 'Proven Results',
    'story.value3.desc': 'Clinically tested and scientifically validated',
    'story.value4.title': 'Customer First',
    'story.value4.desc': 'Personalized solutions for every skin type',
    
    // Footer
    'footer.newsletter.title': 'Stay Updated',
    'footer.newsletter.desc': 'Get exclusive access to new products, beauty tips, and special offers',
    'footer.newsletter.placeholder': 'Enter your email',
    'footer.newsletter.button': 'Subscribe',
    'footer.tagline': 'Pioneering lightweight, comfortable sun protection with premium K-Beauty sun care solutions.',
    'footer.products': 'Products',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.legal': 'Legal',
    'footer.product1': 'Bemot Sun Serum SPF 50',
    'footer.product2': 'Sun Care Collection',
    'footer.product3': 'Skincare Line',
    'footer.product4': 'New Arrivals',
    'footer.company1': 'About Us',
    'footer.company2': 'Ingredients',
    'footer.company3': 'Careers',
    'footer.company4': 'Press',
    'footer.support1': 'Help Center',
    'footer.support2': 'Shipping Info',
    'footer.support3': 'Returns',
    'footer.support4': 'Warranty',
    'footer.legal1': 'Privacy Policy',
    'footer.legal2': 'Terms of Service',
    'footer.legal3': 'Cookie Policy',
    'footer.legal4': 'Accessibility',
    'footer.copyright': '© 2026 Klear. All rights reserved.',
    'footer.innovation': 'Global Innovation',
    'footer.innovation.desc': 'Leading lightweight sun protection with premium K-Beauty sun care solutions.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ko']] || key;
  };

  const translateWithDeepL = useCallback(async (text: string, targetLang: 'KO' | 'EN-US'): Promise<string> => {
    if (!isDeepLAvailable()) {
      return text;
    }
    try {
      const result = await translateText(text, targetLang);
      return result.translatedText;
    } catch (error) {
      console.error('DeepL translation error:', error);
      return text;
    }
  }, []);

  const isDeepLReady = isDeepLAvailable();

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateWithDeepL, isDeepLReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
