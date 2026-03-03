import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sun, Droplets, Shield, Heart, ChevronDown, ChevronUp, Plus, Check, Star, ChevronLeft, ChevronRight, Cloud, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

interface ProductDetailProps {
  onBuyNow: () => void;
  onBack: () => void;
}

export function ProductDetail_2({ onBuyNow, onBack }: ProductDetailProps) {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // 1. 이미지 슬라이더 상태 및 데이터 추가
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroImages = [
    './blackpink_productshow.png', // 기존 이미지
    '/pd2_2.png',
    '/pd2_3.png',
    '/pd2_4.png',
    '/pd2_5.png',
    '/pd2_6.png',
  ];

  const product = {
    id: 'blackpink-special-edition', // ❌ 기존 'bemot-sun-serum-50ml'에서 반드시 변경
    name: language === 'ko' ? '블랙핑크 스페셜 에디션 스킨케어 세트' : 'BLACKPINK Special Edition Skincare Set',
    price: 59.99,
    originalPrice: 67.00,
    volume: '50ml / 1.69 fl oz',
  };

  // 2. 슬라이더 제어 함수
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  const handleBuyNow = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: heroImages[0] });
    onBuyNow();
  };

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: heroImages[0] });
  };

  const benefits = [
    { icon: Cloud, title: language === 'ko' ? '구름 같은 텍스처' : 'Cloud-like Texture', desc: language === 'ko' ? '달팽이 점액을 휘핑 기법으로 배합하여 끈적임 없이 즉각 흡수' : 'Whipped snail mucin formula that absorbs instantly without stickiness' },
    { icon: Shield, title: language === 'ko' ? '강력한 장벽 복구' : 'Ultimate Barrier Repair', desc: language === 'ko' ? '세라마이드와 판테놀이 스킨 사이클링 후 자극받은 피부 진정' : 'Ceramides and Panthenol soothe irritated skin after skin cycling' },
    { icon: Sparkles, title: language === 'ko' ? '유리알 피부 광채' : 'Glass Skin Finish', desc: language === 'ko' ? '풍부한 수분감으로 투명하고 매끄러운 피부결 연출' : 'Provides deep hydration for a transparent, smooth, glass skin complexion' },
    { icon: Droplets, title: language === 'ko' ? '3중 딥 레이어 보습' : 'Deep Layer Hydration', desc: language === 'ko' ? '히알루론산이 피부 깊숙이 수분을 공급하고 하루 종일 유지' : 'Hyaluronic Acid deeply hydrates and retains moisture all day' },
  ];

  const howToUse = [
    { step: 1, title: language === 'ko' ? '클렌징 및 톤' : 'Cleanse & Tone', desc: language === 'ko' ? '세안 후 토너로 피부결을 정돈하세요.' : 'After cleansing, prep your skin with a toner.' },
    { step: 2, title: language === 'ko' ? '적정량 덜기' : 'Dispense', desc: language === 'ko' ? '동전 크기만큼 덜어 구름 같은 휘핑 제형을 확인하세요.' : 'Dispense a nickel-sized amount to reveal the whipped cloud texture.' },
    { step: 3, title: language === 'ko' ? '도포 및 흡수' : 'Apply & Pat', desc: language === 'ko' ? '얼굴 전체에 펴 발라 부드럽게 두드리며 달팽이 점액 성분을 흡수시킵니다.' : 'Spread evenly and gently pat to help the snail mucin absorb.' },
    { step: 4, title: language === 'ko' ? '스킨 사이클링 레이어링' : 'Skin Cycling Layering', desc: language === 'ko' ? '레티놀이나 산성 성분 사용 후, 자극받은 피부 위에 듬뿍 올려 보호막을 형성하세요.' : 'Apply generously over irritated skin to form a protective barrier after using retinol or acids.' },
  ];

  const specs = [
    { label: language === 'ko' ? '제품 유형' : 'Type', value: language === 'ko' ? '휘핑 장벽 크림' : 'Whipped barrier cream' },
    { label: language === 'ko' ? '주요 성분' : 'Key Ingredients', value: language === 'ko' ? '달팽이 점액, 세라마이드, 판테놀, 히알루론산' : 'Snail Mucin, Ceramide, Panthenol, Hyaluronic Acid' },
    { label: language === 'ko' ? '용량' : 'Volume', value: '50ml / 1.69 fl oz' },
    { label: language === 'ko' ? '마감' : 'Finish', value: language === 'ko' ? '유리알 광채, 끈적임 없음' : 'Glass Skin, Non-sticky' },
    { label: language === 'ko' ? '피부 타입' : 'Skin Type', value: language === 'ko' ? '모든 피부 타입 (민감성 포함)' : 'All skin types (Including sensitive)' },
    { label: language === 'ko' ? '크루얼티 프리' : 'Cruelty-Free', value: language === 'ko' ? '예' : 'Yes' },
    { label: language === 'ko' ? '파라벤 프리' : 'Paraben-Free', value: language === 'ko' ? '예' : 'Yes' },
    { label: language === 'ko' ? '향료' : 'Fragrance', value: language === 'ko' ? '무향' : 'Unscented' },
  ];

  const faqs = [
    { q: language === 'ko' ? '달팽이 점액인데 끈적이지 않나요?' : 'Is it sticky because of the snail mucin?', a: language === 'ko' ? '달팽이 점액 특유의 쫀쫀한 영양감은 유지하되, 특수 휘핑 기법을 적용하여 구름처럼 가볍고 산뜻하게 흡수됩니다.' : 'It retains the nourishing properties of snail mucin but utilizes a special whipped technique for a light, cloud-like, non-sticky absorption.' },
    { q: language === 'ko' ? '스킨 사이클링 휴식기에 사용해도 되나요?' : 'Is it suitable for skin cycling recovery days?', a: language === 'ko' ? '네, 세라마이드와 판테놀이 고농축 배합되어 필링이나 레티놀 사용 후 손상된 피부 장벽을 빠르게 복구합니다.' : 'Yes, it is highly concentrated with ceramides and panthenol to rapidly repair damaged skin barriers after peeling or retinol use.' },
    { q: language === 'ko' ? '메이크업 전에 사용하면 밀리나요?' : 'Will it pill under makeup?', a: language === 'ko' ? '아닙니다. 피부에 빠르게 밀착되는 제형으로, 파운데이션 전 완벽한 유리알 피부 베이스 역할을 합니다.' : 'No. The fast-absorbing formula bonds perfectly to the skin, acting as a flawless glass skin base before foundation.' },
    { q: language === 'ko' ? '지성이나 여드름 피부에 적합한가요?' : 'Is this suitable for oily/acne-prone skin?', a: language === 'ko' ? '네, 논코메도제닉이며 무거운 유분기 없이 수분 장벽만 채워주어 지성 피부에도 부담이 없습니다.' : 'Absolutely. It is non-comedogenic and fortifies the moisture barrier without heavy oils, making it comfortable for oily skin.' },
    { q: language === 'ko' ? '달팽이 점액은 윤리적으로 채취되었나요?' : 'Is the snail mucin ethically sourced?', a: language === 'ko' ? '네, 달팽이에게 스트레스를 주지 않는 안전하고 윤리적인 환경에서 점액을 수집하여 크루얼티 프리 인증을 받았습니다.' : 'Yes, the mucin is collected in a safe, ethical environment that does not stress the snails, ensuring a cruelty-free process.' },
  ];

  // 상세 이미지 배열
  const detailImages = ['/pd2_1.png', '/pd2_2.png', '/pd2_3.png', '/pd2_4.png', '/pd2_5.png', '/pd2_6.png'];

return (
    <div className="pt-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[#2C2C2C]/60 hover:text-[#6F832E] transition-colors">
          <ArrowLeft size={20} />
          {language === 'ko' ? '홈으로' : 'Back to Home'}
        </button>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 3. 이미지 슬라이더 UI 수정 */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative group">
            <div className="rounded-3xl overflow-hidden bg-white border border-[#E6E6E0] h-[500px] lg:h-[600px] relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={heroImages[currentIndex]}
                  alt={`${product.name} ${currentIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* 화살표 버튼 */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 border border-[#E6E6E0] text-[#111111] hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 border border-[#E6E6E0] text-[#111111] hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={24} />
              </button>

              {/* 페이지 인디케이터 (선택 사항) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {heroImages.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-[#A9C356] w-6' : 'bg-[#111111]/20'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col space-y-6 h-[500px] lg:h-[600px]">
            <div>
              <span className="inline-block px-3 py-1.5 bg-[#EEF2E0] text-[#6F832E] rounded-full text-sm font-semibold mb-3">BEST SELLER</span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#111111] mb-2">{product.name}</h1>
              <p className="text-[#2C2C2C]/60">{product.volume}</p>
            </div>

            <p className="text-lg text-[#2C2C2C]/70">
              {language === 'ko' ? '달팽이 점액과 고농축 세럼과 세라마이드가 결합된 구름결 장벽 복구 크림. 스킨 사이클링 후 자극받은 피부를 진정시키며, 끈적임 없이 맑은 유리알 광채를 선사하는 휘핑 포뮬러입니다.' : 'A cloud-like barrier recovery cream combining snail mucin and highly concentrated ceramides. Soothes irritated skin after skin cycling and delivers a clear, glass-skin glow with a non-sticky whipped formula.'}
            </p>

            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-[#A9C356] fill-[#A9C356]" />)}
              <span className="text-sm text-[#2C2C2C]/60 ml-2">(4.5/5 · 132 {language === 'ko' ? '리뷰' : 'reviews'})</span>
            </div>

            <div className="flex items-baseline gap-3 text-3xl font-bold">
              <span className="text-[#EF4444]">${product.price.toFixed(2)}</span>
              <span className="text-[#9CA3AF] line-through text-xl">$35</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {['Non-Sticky Mucin', 'Barrier Repair', 'Non-comedogenic', 'Cruelty-Free'].map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-[#6F832E]">
                  <Check size={16} className="text-[#A9C356]" />
                  {b}
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-auto pt-2">
              <button onClick={handleBuyNow} className="flex-1 py-4 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#A9C356]/30 transition-all duration-300 hover:scale-105 text-lg">
                {language === 'ko' ? '지금 구매하기' : 'Buy Now'}
              </button>
              <button onClick={handleAddToCart} className="px-6 py-4 bg-white border-2 border-[#A9C356] text-[#6F832E] rounded-xl font-semibold hover:bg-[#EEF2E0] transition-all duration-300">
                <Plus size={24} />
              </button>
            </div>

            <div className="flex gap-6 text-sm text-[#2C2C2C]/60 pt-2">
              <span>{language === 'ko' ? '🚚 $50 이상 무료배송' : '🚚 Free shipping over $50'}</span>
              <span>{language === 'ko' ? '✅ 30일 환불 보장' : '✅ 30-day guarantee'}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#111111] mb-12">{language === 'ko' ? '주요 특장점' : 'Key Benefits'}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-[#FAFAF8] border border-[#E6E6E0] rounded-2xl p-6 hover:border-[#A9C356]/30 transition-all">
                <div className="inline-flex p-3 bg-[#EEF2E0] rounded-xl mb-4"><b.icon className="w-6 h-6 text-[#6F832E]" /></div>
                <h3 className="text-lg font-bold text-[#111111] mb-2">{b.title}</h3>
                <p className="text-sm text-[#2C2C2C]/60">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story & Detail Images */}
      <section className="bg-[#EEF2E0] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg border border-[#E6E6E0]/50 mb-20">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/EngW7tLk6R8"
              title="Klear Product Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* pd1 ~ pd6 Images */}
          <div className="max-w-4xl mx-auto space-y-0 flex flex-col items-center">
            {detailImages.map((img, idx) => (
              <motion.img
                key={idx}
                src={`./${img}`}
                alt={`Detail ${idx + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-full h-auto object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#111111] mb-12">{language === 'ko' ? '사용 방법' : 'How to Use'}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howToUse.map((step) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: step.step * 0.1 }} className="text-center">
                <div className="w-16 h-16 bg-[#A9C356] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">{step.step}</div>
                <h3 className="text-lg font-bold text-[#111111] mb-2">{step.title}</h3>
                <p className="text-sm text-[#2C2C2C]/60">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Specifications */}
      <section className="bg-[#FAFAF8] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#111111] mb-12">{language === 'ko' ? '상품 안내' : 'Product Information'}</h2>
          <div className="bg-white border border-[#E6E6E0] rounded-2xl overflow-hidden">
            {specs.map((spec, i) => (
              <div key={i} className={`flex justify-between px-6 py-4 ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF8]'}`}>
                <span className="font-medium text-[#2C2C2C]/60">{spec.label}</span>
                <span className="font-semibold text-[#111111]">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#111111] mb-12">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[#E6E6E0] rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#FAFAF8] transition-colors">
                  <span className="font-semibold text-[#111111] pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={20} className="text-[#6F832E] flex-shrink-0" /> : <ChevronDown size={20} className="text-[#2C2C2C]/40 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-6 pb-4">
                    <p className="text-[#2C2C2C]/70 border-l-2 border-[#A9C356] pl-4">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#EEF2E0] py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
            {language === 'ko' ? '매일 피부 장벽을 복구하고 광채를 채우세요' : 'Repair & Glow Every Day'}
          </h2>
          <p className="text-lg text-[#2C2C2C]/60 mb-8">
            {language === 'ko' ? '끈적임 없이 피부가 편안해지는 구름결 장벽 케어를 경험하세요.' : 'Experience the weightless, cloud-like barrier care that your skin will love.'}
          </p>
          <button onClick={handleBuyNow} className="px-10 py-4 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-[#A9C356]/30 transition-all duration-300 hover:scale-105">
            {language === 'ko' ? '지금 구매하기' : 'Shop Now'}
          </button>
        </div>
      </section>
    </div>
  );
}