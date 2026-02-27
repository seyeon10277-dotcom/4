import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sun, Droplets, Shield, Heart, ChevronDown, ChevronUp, Plus, Check, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

interface ProductDetailProps {
  onBuyNow: () => void;
  onBack: () => void;
}

export function ProductDetail({ onBuyNow, onBack }: ProductDetailProps) {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const product = {
    id: 'bemot-sun-serum-50ml',
    name: 'Bemot Moisturizing Sun Serum SPF 50',
    price: 35,
    volume: '50ml / 1.69 fl oz',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3Vuc2NyZWVuJTIwc2VydW0lMjBib3R0bGV8ZW58MHx8fHwxNzE5MDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  };

  const handleBuyNow = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    onBuyNow();
  };

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
  };

  const benefits = [
    { icon: Sun, title: language === 'ko' ? '이중 보호' : 'Dual Protection', desc: language === 'ko' ? 'UV 차단과 깊은 수분 공급을 동시에' : 'Combines UV defense with deep hydration' },
    { icon: Droplets, title: language === 'ko' ? '가벼운 세럼 텍스처' : 'Lightweight Serum Texture', desc: language === 'ko' ? '끈적임 없이 빠르게 흡수, 메이크업 베이스로 완벽' : 'Non-greasy, absorbs quickly, perfect under makeup' },
    { icon: Shield, title: language === 'ko' ? '진정 & 카밍' : 'Soothing & Calming', desc: language === 'ko' ? '홍조와 자극을 줄여주는 성분 함유' : 'Contains ingredients that reduce redness and irritation' },
    { icon: Heart, title: language === 'ko' ? '오래가는 수분' : 'Long-Lasting Moisture', desc: language === 'ko' ? '무겁지 않게 하루 종일 피부 수분 유지' : 'Keeps skin hydrated throughout the day' },
  ];

  const howToUse = [
    { step: 1, title: language === 'ko' ? '클렌징 & 준비' : 'Cleanse & Prep', desc: language === 'ko' ? '아침 스킨케어 루틴 후, 메이크업 전 마지막 단계로 사용하세요.' : 'Apply after your morning skincare routine, as the last step before makeup.' },
    { step: 2, title: language === 'ko' ? '적정량 사용' : 'Right Amount', desc: language === 'ko' ? '2-3 펌프(약 동전 크기)를 덜어주세요.' : 'Dispense 2-3 pumps (approximately a nickel-sized amount).' },
    { step: 3, title: language === 'ko' ? '골고루 도포' : 'Even Application', desc: language === 'ko' ? '얼굴과 목에 가볍게 두드리며 골고루 펴 발라주세요.' : 'Gently pat and spread evenly across face and neck.' },
    { step: 4, title: language === 'ko' ? '재도포' : 'Reapply', desc: language === 'ko' ? '야외 활동 시 2시간마다, 수영/발한 후 재도포하세요.' : 'Reapply every 2 hours when outdoors, or after swimming/sweating.' },
  ];

  const specs = [
    { label: 'SPF', value: 'SPF 50 PA++++' },
    { label: language === 'ko' ? '제품 유형' : 'Type', value: language === 'ko' ? '가벼운 세럼형 선크림' : 'Lightweight serum-type sun protection' },
    { label: language === 'ko' ? '용량' : 'Volume', value: '50ml / 1.69 fl oz' },
    { label: language === 'ko' ? '마감' : 'Finish', value: language === 'ko' ? '내추럴, 듀이' : 'Natural, dewy' },
    { label: language === 'ko' ? '피부 타입' : 'Skin Type', value: language === 'ko' ? '모든 피부 타입' : 'All skin types' },
    { label: language === 'ko' ? '크루얼티 프리' : 'Cruelty-Free', value: language === 'ko' ? '예' : 'Yes' },
    { label: language === 'ko' ? '파라벤 프리' : 'Paraben-Free', value: language === 'ko' ? '예' : 'Yes' },
    { label: language === 'ko' ? '향료' : 'Fragrance', value: language === 'ko' ? '무향' : 'Unscented' },
  ];

  const faqs = [
    { q: language === 'ko' ? '메이크업 밑에 사용할 수 있나요?' : 'Can I use this under makeup?', a: language === 'ko' ? '네, 가벼운 세럼 텍스처로 메이크업 프라이머로 완벽하게 작동합니다. 파운데이션 도포 전 1-2분 흡수 시간을 두세요.' : 'Yes, the lightweight serum texture works perfectly as a makeup primer. Allow 1-2 minutes to absorb before applying foundation.' },
    { q: language === 'ko' ? '백탁 현상이 있나요?' : 'Will this leave a white cast?', a: language === 'ko' ? '아니요, 모든 피부 톤에서 투명하게 흡수되도록 설계되었습니다.' : 'No, the formula is designed to absorb clear on all skin tones.' },
    { q: language === 'ko' ? '지성/여드름 피부에 적합한가요?' : 'Is this suitable for oily/acne-prone skin?', a: language === 'ko' ? '네, 논코메도제닉이며 모공을 막지 않는 가벼운 텍스처입니다.' : 'Absolutely. It\'s non-comedogenic and has a lightweight texture that won\'t clog pores.' },
    { q: language === 'ko' ? '얼마나 자주 재도포해야 하나요?' : 'How often should I reapply?', a: language === 'ko' ? '장시간 야외 노출 시 2시간마다, 수영이나 발한 후 재도포하세요.' : 'Reapply every 2 hours during prolonged sun exposure, or after swimming/sweating.' },
    { q: language === 'ko' ? '민감한 피부에도 사용할 수 있나요?' : 'Can I use this if I have sensitive skin?', a: language === 'ko' ? '네, 센텔라 아시아티카 같은 진정 성분을 포함하고 있으며 자극성 성분이 없습니다.' : 'Yes, the formula includes soothing ingredients like Centella Asiatica and is free from harsh irritants.' },
    { q: language === 'ko' ? '건성 피부에도 효과가 있나요?' : 'Does it work for dry skin?', a: language === 'ko' ? '네, 보습 세럼 베이스가 UV 차단과 함께 수분을 공급합니다.' : 'Yes, the moisturizing serum base provides hydration while protecting from UV damage.' },
    { q: language === 'ko' ? '방수 기능이 있나요?' : 'Is this water-resistant?', a: language === 'ko' ? '40분간 중등도의 방수 기능이 있지만, 수영 후 재도포를 권장합니다.' : 'It offers moderate water resistance (40 minutes), but reapplication after swimming is recommended.' },
  ];

  return (
    <div className="pt-20 bg-[#FAFAF8]">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[#2C2C2C]/60 hover:text-[#6F832E] transition-colors">
          <ArrowLeft size={20} />
          {language === 'ko' ? '홈으로' : 'Back to Home'}
        </button>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative">
            <div className="rounded-3xl overflow-hidden bg-white border border-[#E6E6E0]">
              <img src={product.image} alt={product.name} className="w-full h-[500px] object-cover" />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1.5 bg-[#EEF2E0] text-[#6F832E] rounded-full text-sm font-semibold mb-3">SPF 50 PA++++</span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#111111] mb-2">{product.name}</h1>
              <p className="text-[#2C2C2C]/60">{product.volume}</p>
            </div>

            <p className="text-lg text-[#2C2C2C]/70">
              {language === 'ko' ? '가벼운 자외선 차단과 수분 공급으로 하루 종일 편안한 피부를 유지하세요.' : 'Lightweight sun protection that moisturizes and soothes for all-day comfort.'}
            </p>

            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-[#A9C356] fill-[#A9C356]" />)}
              <span className="text-sm text-[#2C2C2C]/60 ml-2">(4.8/5 · 2,341 {language === 'ko' ? '리뷰' : 'reviews'})</span>
            </div>

            <div className="text-3xl font-bold text-[#6F832E]">${product.price}</div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-2 gap-3">
              {['No White Cast', 'Oil-Free', 'Non-comedogenic', 'Cruelty-Free'].map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-[#6F832E]">
                  <Check size={16} className="text-[#A9C356]" />
                  {b}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button onClick={handleBuyNow} className="flex-1 py-4 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#A9C356]/30 transition-all duration-300 hover:scale-105 text-lg">
                {language === 'ko' ? '지금 구매하기' : 'Buy Now'}
              </button>
              <button onClick={handleAddToCart} className="px-6 py-4 bg-white border-2 border-[#A9C356] text-[#6F832E] rounded-xl font-semibold hover:bg-[#EEF2E0] transition-all duration-300">
                <Plus size={24} />
              </button>
            </div>

            {/* Trust Signals */}
            <div className="flex gap-6 text-sm text-[#2C2C2C]/60">
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

      {/* Brand Story */}
      <section className="bg-[#EEF2E0] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="/klear-logo.png" alt="Klear" className="h-12 w-auto mx-auto mb-6 rounded-lg" />
          <h2 className="text-3xl font-bold text-[#111111] mb-6">{language === 'ko' ? 'Klear의 철학' : 'The Klear Philosophy'}</h2>
          <p className="text-[#2C2C2C]/70 leading-relaxed mb-4">
            {language === 'ko' ? 'Klear는 효과적이고 편안한 스킨케어를 만들어 일상에 자연스럽게 녹아드는 제품을 추구합니다. 우리의 선 세럼은 기존 자외선 차단제의 불편함(백탁, 끈적임, 건조함)을 해결하기 위해 개발되었습니다.' : "Klear believes in creating effective, comfortable skincare that fits seamlessly into daily life. Our sun serum was developed to address common sunscreen complaints: white cast, greasiness, and dryness."}
          </p>
          <p className="text-[#2C2C2C]/70 leading-relaxed">
            {language === 'ko' ? '실제 피부 고민을 가진 실제 사용자를 위해 설계되었으며, 매일의 착용감을 위해 테스트되었습니다.' : 'Designed for real people with real skin concerns, tested for daily wearability.'}
          </p>
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
          <h2 className="text-3xl font-bold text-center text-[#111111] mb-12">{language === 'ko' ? '제품 상세' : 'Product Specifications'}</h2>
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
            {language === 'ko' ? '매일 피부를 보호하고 가꾸세요' : 'Protect & Nourish Your Skin Every Day'}
          </h2>
          <p className="text-lg text-[#2C2C2C]/60 mb-8">
            {language === 'ko' ? '당신의 피부가 사랑할 가벼운 자외선 차단을 경험하세요.' : 'Experience lightweight sun protection that your skin will love.'}
          </p>
          <button onClick={handleBuyNow} className="px-10 py-4 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-[#A9C356]/30 transition-all duration-300 hover:scale-105">
            {language === 'ko' ? '지금 구매하기' : 'Shop Now'}
          </button>
          <div className="flex justify-center gap-8 mt-6 text-sm text-[#2C2C2C]/60">
            <span>{language === 'ko' ? '🚚 $50 이상 무료배송' : '🚚 Free shipping over $50'}</span>
            <span>{language === 'ko' ? '✅ 30일 만족 보장' : '✅ 30-day satisfaction guarantee'}</span>
            <span>{language === 'ko' ? '🔒 안전한 결제' : '🔒 Secure checkout'}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
