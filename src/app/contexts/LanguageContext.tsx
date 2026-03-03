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
    'nav.about': '회사소개',
    
    // Hero
    'hero.badge1': '베스트 셀러',
    'hero.badge2': '새로운 컬렉션',
    'hero.subtitle1': '프리미엄 K-스킨케어',
    'hero.subtitle2': '가벼운 선 프로텍션',
    'hero.title1': '배리어 리페어\n수분 세트',
    'hero.title2': '비모트\n수분 선 세럼\nSPF 50',
    'hero.desc1': '배리어 리페어 수분 세트를 합리적인 가격에 만나고,\n피부 본연의 힘을 되찾아주는\n가장 깨끗한 뷰티 루틴을 시작해보세요!',
    'hero.desc2': '베모트리지놀 기반의 오일프리 포뮬러로\n백탁 없는 촉촉한 수분 광채와 산뜻한 자외선 차단을\n동시에 완성하세요',
    'hero.cta1': '지금 쇼핑하기',
    'hero.stat1': 'SPF 50',
    'hero.stat2': 'K-뷰티',
    
    // Products
    'products.badge': '베스트 셀러',
    'products.title': '베스트 셀러',
    'products.subtitle': '가벼운 자외선 차단과 깊은 수분을 동시에 경험하세요',
    'products.serum': '선 세럼',
    'products.special': '스페셜 에디션',
    'products.feature1': '베모트리지놀',
    'products.feature2': '투명한 밀착',
    'products.feature3': '깊은 수분 공급',
    'products.feature4': '장벽 강화',
    'products.feature5': '비건',
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
    'tech.stat2': '결과까지 걸리는 주간',
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
    'story.milestone2.desc': '비모트 선 세럼으로 글로벌 시장 진출',
    'story.milestone3.title': '혁신상 수상',
    'story.milestone3.desc': '베모트리지놀 기반 포뮬러로 인정받음',
    'story.milestone4.title': '시장 리더',
    'story.milestone4.desc': 'K-뷰티 프리미엄 선케어 브랜드',
    'story.value1.title': '글로벌 혁신',
    'story.value1.desc': '한국 스킨케어 기술을 전 세계로',
    'story.value2.title': '정밀 포뮬러',
    'story.value2.desc': '과학적으로 검증된 성분만 사용',
    'story.value3.title': '입증된 결과',
    'story.value3.desc': '임상 테스트 및 과학적 검증',
    'story.value4.title': '고객 우선',
    'story.value4.desc': '모든 피부 타입을 위한 개인 맞춤형 솔루션',

    // Korean (ko) - Story 섹션 아래에 추가
    'otc.badge': '제조 시설 인증',
    'otc.title1': '꼼꼼한 기준으로',
    'otc.title2': '검증된 안전함',
    'otc.desc': '저희 제품은 FDA 규정을 완벽히 준수하는 OTC 인증 시설에서 생산됩니다. 엄격한 품질 관리 프로세스와 철저한 위생 기준 아래, 매 배치마다 동일한 순도와 효능을 보장합니다. 피부에 닿는 모든 것, 타협 없이 만듭니다.',
    'otc.badge.official': '공식 인증',
    'otc.badge.certified': 'FDA-Compliant · OTC-Certified Facility',
    'otc.trust1.title': 'FDA 규정 준수',
    'otc.trust1.desc': '미국 식품의약국 기준 완전 충족',
    'otc.trust2.title': 'OTC 인증 시설',
    'otc.trust2.desc': '의약외품 등급 생산 환경',
    'otc.trust3.title': '배치별 품질 검사',
    'otc.trust3.desc': '출하 전 전수 검사 완료',

    // Footer
    'footer.newsletter.title': '최신 소식 받기',
    'footer.newsletter.desc': '신제품, 뷰티 팁, 특별 혜택에 대한 독점 액세스',
    'footer.newsletter.placeholder': '이메일을 입력하세요',
    'footer.newsletter.button': '구독하기',
    'footer.tagline': '프리미엄 K-뷰티 스킨케어 솔루션으로\n지속 가능하고 편안한 피부 보호를 선도합니다.',
    'footer.products': '제품',
    'footer.company': '회사',
    'footer.support': '지원',
    'footer.legal': '법률',
    'footer.product1': '비모트 선 세럼 SPF 50',
    'footer.product2': '배리어 리페어 수분 세트',
    'footer.product3': '모든 제품',
    'footer.company1': '회사 소개',
    'footer.company2': '사내 인트라넷',
    'footer.support1': '챗봇 상담',
    'footer.legal1': '개인정보 처리방침',
    'footer.legal2': '이용약관',
    'footer.copyright': '© 2026 Klear. All rights reserved.',
    'footer.innovation': '글로벌 혁신',
    'footer.innovation.desc': 'K-뷰티 프리미엄 스킨케어 솔루션으로 지속적이고 편안한 피부 보호를 제공합니다.',

    // Reviews & Community
    '제품리뷰': '제품리뷰',
    '실제 사용자들의 생생한 리뷰': '실제 사용자들의 생생한 리뷰',
    'Jane Cooper': '제인 쿠퍼',
    'Fabulous!': '정말 멋져요!',
    'Lightweight and hydrating — it feels more like a serum than sunscreen. My skin stays soft, calm, and comfortable all day.': '가볍고 촉촉합니다 — 선크림보다는 세럼에 가깝습니다. 하루 종일 피부가 부드럽고 편안하게 유지됩니다.',
    'Kathryn Murphy': '캐서린 머피',
    'No Joke, So Gentle.': '장난 아님, 정말 순해요.',
    'My skin gets irritated easily, but this product feels very gentle and calming. It reduced redness overnight and didn\'t cause any breakouts. Perfect for sensitive skin.': '제 피부는 쉽게 자극받는데, 이 제품은 매우 순하고 진정되는 느낌입니다. 하룻밤 사이에 홍조가 줄었고 트러블도 없었습니다. 민감성 피부에 완벽해요.',
    'Savannah Nguyen': '사바나 응우옌',
    'Glow Hits Different.': '광채가 남다릅니다.',
    'The glow this gives is beautiful but natural — not greasy at all. It absorbs quickly and leaves my skin looking healthy and fresh. Great for everyday use.': '이 제품이 주는 광채는 아름답지만 자연스럽습니다 — 전혀 기름지지 않아요. 빠르게 흡수되고 피부가 건강하고 산뜻해 보입니다. 매일 사용하기 좋습니다.',
    'Eleanor Pena': '엘리너 페냐',
    'Obsessed!!': '완전 푹 빠졌어요!!',
    'Super gentle on my skin and easy to wear every day. It layers perfectly under makeup without pilling.': '피부에 아주 순하고 매일 바르기 편합니다. 메이크업 전 단계에 발라도 밀림 없이 완벽하게 레이어링 됩니다.',
    'Theresa Webb': '테레사 웹',
    'Literally So Good.': '말 그대로 너무 좋아요.',
    'This cleanser removes sunscreen and makeup residue really well without drying my skin. The oil is soft and creamy, and my face feels clean but balanced afterwards.': '이 클렌저는 피부를 건조하게 하지 않으면서 선크림과 메이크업 잔여물을 정말 잘 지워줍니다. 오일이 부드롭고 크리미하며, 사용 후 얼굴이 깨끗하면서도 유수분 밸런스가 맞는 느낌입니다.',

    // About Us
    'about.hero.eyebrow': '클리어 소개',
    'about.hero.title1': '타협 없는 완벽한 보호.',
    'about.hero.title2': '투명하게 빛나는\n아름다움.',
    'about.hero.sub': '성분에 민감한 현대인을 위해 재해석된 프리미엄 K-뷰티.\n타협도, 비밀도 없습니다.\n오직 압도적인 결과만 증명합니다.',
    'about.mission.label': '우리의 철학',
    'about.mission.title': '미션 & 핵심 가치',
    'about.mission.card1.label': '미션',
    'about.mission.card1.title': '클린 뷰티의 새로운 기준',
    'about.mission.card1.desc': '혁신적인 선 세럼부터 장벽 개선 수분 케어까지, 고기능성 결과와 순한 포뮬러 사이의 타협을 없앱니다.',
    'about.mission.card2.label': '포뮬러',
    'about.mission.card2.title': '급진적 투명성과 임상적 효능',
    'about.mission.card2.desc': '우리는 달팽이 점액 여과물, 어성초와 같은 입증된 성분부터 베모트리지놀과 같은 차세대 UV 필터까지, 오직 투명하고 효과적인 성분만 고집합니다. 자극 없이 피부 장벽을 보호하고 개선하며, 전 제품 피부과 테스트를 완료했습니다.',
    'about.mission.card3.label': '윤리',
    'about.mission.card3.title': '윤리적이고\n지속 가능한 표준',
    'about.mission.card3.desc': '피부 보호를 넘어 환경까지 생각합니다. 클리어는 100% 비건, 크루얼티 프리, 무향료를 엄격하게 준수합니다. 업사이클링 성분과 친환경 패키징으로 고기능성 스킨케어와 환경적 책임이 공존할 수 있음을 증명합니다.',
    'about.product.label': '시그니처',
    'about.product.title': '비모트 수분 선 세럼',
    'about.product.desc': '차세대 베모트리지놀 UV 필터와 수분 플럼핑 액티브 성분이 결합된 SPF 50+ / PA+++ 보호막. 백탁 없이 하루 종일 피부를 방어하며 맑은 유리알 광채를 선사하는 세럼 질감의 포뮬러입니다.',
    'about.product.cta': '제품 보기',
    'about.audience.label': '당신을 위한 설계',
    'about.audience.title': '우리가 연구하는 대상',
    'about.audience.desc': '클리어는 일상에서 더 높은 가치를 추구하는 웰니스 지향적인 분들을 위해 설계되었습니다.\n성분을 꼼꼼히 따지고, 동물 실험을 반대하며, 바쁜 현대인의 라이프스타일에 자연스럽게 녹아드는\n다기능 스킨케어를 원한다면, 그리고 무겁지 않은 투명한 유리알 광채를 원하신다면, 클리어가 정답입니다.',
    'about.cta.title': '당신의 피부는 진실을 누릴 자격이 있습니다.',
    'about.cta.desc': '투명하고 임상적으로 검증된\n프리미엄 K-뷰티 컬렉션을 지금 만나보세요.',
    'about.cta.button': '지금 쇼핑하기',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About Us',

    // Hero
    'hero.badge1': 'BEST SELLER',
    'hero.badge2': 'NEW ARRIVAL',
    'hero.subtitle1': 'Premium Korean Skincare',
    'hero.subtitle2': 'Lightweight Sun Protection',
    'hero.title1': 'Barrier Repair & Hydration Set',
    'hero.title2': 'Bemot Moisturizing Sun Serum\nSPF 50',
    'hero.desc1': 'Experience the Barrier Repair & Hydration Set\nand start your purest beauty routine for a healthy and resilient skin barrier!',
    'hero.desc2': 'With our Bemotrizinol-powered oil-free formula,\nachieve a hydrating, white-cast-free glow\nand fresh UV protection simultaneously.',
    'hero.cta1': 'Shop Now',
    'hero.stat1': 'SPF 50',
    'hero.stat2': 'K-Beauty',
    
    // Products
    'products.badge': 'BEST SELLERS',
    'products.title': 'Best Sellers',
    'products.subtitle': 'Experience lightweight UV protection with deep hydration',
    'products.serum': 'Sun Serum',
    'products.special': 'Special Edition',
    'products.feature1': 'Bemotrizinol',
    'products.feature2': 'No White Cast',
    'products.feature3': 'Deep Hydration',
    'products.feature4': 'Barrier Repair',
    'products.feature5': 'Vegan',
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

    'otc.badge': 'Manufacturing Certification',
    'otc.title1': 'Held to the Highest Standards.',
    'otc.title2': 'Safety You Can Trust.',
    'otc.desc': 'Every Klear product is manufactured in an OTC-certified facility in full compliance with FDA regulations. Rigorous quality control protocols and uncompromising hygiene standards ensure identical purity and potency in every single batch. Because what touches your skin deserves nothing less.',
    'otc.badge.official': 'Official Certification',
    'otc.badge.certified': 'FDA-Compliant · OTC-Certified Facility',
    'otc.trust1.title': 'FDA Compliant',
    'otc.trust1.desc': ' ',
    'otc.trust2.title': 'OTC-Certified LAB',
    'otc.trust2.desc': ' ',
    'otc.trust3.title': 'Batch-by-Batch QC',
    'otc.trust3.desc': ' ',
    
    // Footer
    'footer.newsletter.title': 'Stay Updated',
    'footer.newsletter.desc': 'Get exclusive access to new products, beauty tips, and special offers',
    'footer.newsletter.placeholder': 'Enter your email',
    'footer.newsletter.button': 'Subscribe',
    'footer.tagline': 'Leading Sustainable and comfortable skin\nprotection with premium K-Beauty skincare solutions.',
    'footer.products': 'Products',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.legal': 'Legal',
    'footer.product1': 'Bemot Sun Serum SPF 50',
    'footer.product2': 'Barrier Repair & Hydration Set',
    'footer.product3': 'All Products',
    'footer.company1': 'About Us',
    'footer.company2': 'Company Intranet',
    'footer.support1': 'Chat Support',
    'footer.legal1': 'Privacy Policy',
    'footer.legal2': 'Terms of Service',
    'footer.copyright': '© 2026 Klear. All rights reserved.',
    'footer.innovation': 'Global Innovation',
    'footer.innovation.desc': 'Leading sustainable and comfortable skin protection with premium K-Beauty skincare solutions.',

    // Reviews & Community
    '제품리뷰': 'Product Reviews',
    '실제 사용자들의 생생한 리뷰': 'The Real Reviews of the Community',
    'Jane Cooper': 'Jane Cooper',
    'Fabulous!': 'Fabulous!',
    'Lightweight and hydrating — it feels more like a serum than sunscreen. My skin stays soft, calm, and comfortable all day.': 'Lightweight and hydrating — it feels more like a serum than sunscreen. My skin stays soft, calm, and comfortable all day.',
    'Kathryn Murphy': 'Kathryn Murphy',
    'No Joke, So Gentle.': 'No Joke, So Gentle.',
    'My skin gets irritated easily, but this product feels very gentle and calming. It reduced redness overnight and didn\'t cause any breakouts. Perfect for sensitive skin.': 'My skin gets irritated easily, but this product feels very gentle and calming. It reduced redness overnight and didn\'t cause any breakouts. Perfect for sensitive skin.',
    'Savannah Nguyen': 'Savannah Nguyen',
    'Glow Hits Different.': 'Glow Hits Different.',
    'The glow this gives is beautiful but natural — not greasy at all. It absorbs quickly and leaves my skin looking healthy and fresh. Great for everyday use.': 'The glow this gives is beautiful but natural — not greasy at all. It absorbs quickly and leaves my skin looking healthy and fresh. Great for everyday use.',
    'Eleanor Pena': 'Eleanor Pena',
    'Obsessed!!': 'Obsessed!!',
    'Super gentle on my skin and easy to wear every day. It layers perfectly under makeup without pilling.': 'Super gentle on my skin and easy to wear every day. It layers perfectly under makeup without pilling.',
    'Theresa Webb': 'Theresa Webb',
    'Literally So Good.': 'Literally So Good.',
    'This cleanser removes sunscreen and makeup residue really well without drying my skin. The oil is soft and creamy, and my face feels clean but balanced afterwards.': 'This cleanser removes sunscreen and makeup residue really well without drying my skin. The oil is soft and creamy, and my face feels clean but balanced afterwards.',

    // About Us
    'about.hero.eyebrow': 'About Klear',
    'about.hero.title1': 'Uncompromised Protection.',
    'about.hero.title2': 'Transparent Beauty.',
    'about.hero.sub': 'K-Beauty reimagined for the ingredient-conscious generation. No compromises. No secrets. Just results.',
    'about.mission.label': 'What We Stand For',
    'about.mission.title': 'Mission & Values',
    'about.mission.card1.label': 'Mission',
    'about.mission.card1.title': 'Redefining Clean Skincare',
    'about.mission.card1.desc': 'Eliminating the compromise between high-performance results and gentle formulations — from breakthrough sun serums to barrier-repairing hydration.',
    'about.mission.card2.label': 'Formulation',
    'about.mission.card2.title': 'RADICAL TRANSPARENCY & CLINICAL EFFICACY',
    'about.mission.card2.desc': 'We formulate strictly with transparent, highly effective ingredients—from proven heroes like Snail Mucin to next-generation UV filters like Bemotrizinol. We guarantee a non-comedogenic, dermatologist-tested finish.',
    'about.mission.card3.label': 'Ethics',
    'about.mission.card3.title': 'ETHICAL & SUSTAINABLE STANDARDS',
    'about.mission.card3.desc': 'Protection extends beyond the skin. Klear is strictly Vegan, Cruelty-Free, and Fragrance-Free. We prove that high-performance skincare can coexist with environmental responsibility.',
    'about.product.label': 'Our Flagship',
    'about.product.title': 'Bemot Moisturizing Sun Serum',
    'about.product.desc': 'SPF 50+ / PA+++ protection fused with next-generation Bemotrizinol UV filters and skin-plumping actives. A serum-weightless formula that delivers glass skin and all-day defense.',
    'about.product.cta': 'Shop Now',
    'about.audience.label': 'Built For You',
    'about.audience.title': 'WHO WE FORMULATE FOR',
    'about.audience.desc': 'Klear is engineered for the wellness-driven, active individual who demands more from their daily routine. If you value clean beauty, demand instant hydration, and seek the effortless Glass Skin finish — Klear is built for you.',
    'about.cta.title': 'Your skin deserves the truth.',
    'about.cta.desc': 'Explore our full collection of transparent,\nclinically-effective K-Beauty formulations.',
    'about.cta.button': 'Shop Klear Now',
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