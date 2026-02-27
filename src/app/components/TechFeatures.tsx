import { motion } from 'motion/react';
import { Plus, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

interface TechFeaturesProps {
  onBuyNow?: () => void;
}

export function TechFeatures({ onBuyNow }: TechFeaturesProps) {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();

  const allProducts = [
    { id: 'barrier-cloud-cream', name: language === 'ko' ? '배리어 클라우드 모이스처라이징 크림' : 'Barrier-Cloud Moisturizing Cream', price: 32, rating: 4.5, reviews: 198, image: '/1.png', category: 'Cream' },
    { id: 'ceramide-glow-toner', name: language === 'ko' ? '세라마이드 글로우 밀키 토너' : 'Ceramide Glow Milky Toner', price: 28, rating: 4.5, reviews: 165, image: '/2.png', category: 'Toner' },
    { id: 'heartleaf-toner-pads', name: language === 'ko' ? '어성초 수딩 쿨링 토너 패드' : 'Heartleaf Soothing Cooling Toner Pads', price: 24, rating: 4.5, reviews: 210, image: '/3.png', category: 'Toner Pad' },
    { id: 'hypochlorous-mist', name: language === 'ko' ? '차아염소산 수딩 미스트' : 'Hypochlorous Acid Soothing Mist', price: 18, rating: 4.5, reviews: 143, image: '/4.png', category: 'Mist' },
    { id: 'snail-mucin-essence', name: language === 'ko' ? '스네일 뮤신 & 세라마이드 배리어 에센스' : 'Snail Mucin & Ceramide Barrier Essence', price: 35, rating: 4.5, reviews: 241, image: '/5.png', category: 'Essence' },
    { id: 'vitamin-c-jelly-mask', name: language === 'ko' ? '비건 비타민 C 브라이트닝 젤리 마스크' : 'Vegan Vitamin C Brightening Jelly Mask', price: 22, rating: 4.5, reviews: 187, image: '/6.png', category: 'Mask' },
    { id: 'matcha-bha-cleanser', name: language === 'ko' ? '말차 & BHA 포어 클렌징 폼' : 'Matcha & BHA Pore Foaming Cleanser', price: 20, rating: 4.5, reviews: 156, image: '/7.png', category: 'Cleanser' },
    { id: 'mineral-sun-stick', name: language === 'ko' ? '미네랄 톤업 선 스틱' : 'Mineral Tone-up Sun Stick', price: 26, rating: 4.5, reviews: 132, image: '/8.png', category: 'Sun Care' },
    { id: 'soybean-cleansing-oil', name: language === 'ko' ? '콩 추출물 딥 클렌징 오일' : 'Soybean Deep Cleansing Oil', price: 25, rating: 4.5, reviews: 174, image: '/9.png', category: 'Cleansing Oil' },
  ];

  const stats = [
    { number: '98%', label: t('tech.stat1'), suffix: '' },
    { number: '2-4', label: t('tech.stat2'), suffix: 'weeks' },
    { number: '50K+', label: t('tech.stat3'), suffix: '' },
    { number: '15+', label: t('tech.stat4'), suffix: '' },
  ];

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
  };

  const handleBuyNow = (product: typeof allProducts[0]) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    if (onBuyNow) onBuyNow();
  };

  return (
    <section id="technology" className="relative py-32 overflow-hidden bg-[#EEF2E0]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-white border border-[#A9C356]/30 rounded-full text-sm font-semibold mb-4 text-[#6F832E]">
            ALL PRODUCTS
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#111111]">
            {language === 'ko' ? '전체 제품' : 'All Products'}
          </h2>
          <p className="text-xl text-[#2C2C2C]/60 max-w-3xl mx-auto">
            {language === 'ko' ? '클리어의 모든 스킨케어 제품을 만나보세요' : 'Discover our complete skincare collection'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {allProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative bg-white border border-[#E6E6E0] rounded-3xl overflow-hidden hover:border-[#A9C356]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#A9C356]/10">
                <div className="relative h-80 overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    fallbackSrc="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#A9C356]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 px-4 py-2 bg-[#EEF2E0] backdrop-blur-md rounded-full text-sm font-semibold text-[#6F832E]">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#111111] mb-1">{product.name}</h3>
                  <span className="text-xl font-bold text-[#6F832E] block mb-2">${product.price}</span>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((s) => (
                        <Star key={s} size={16} className="fill-[#A9C356] text-[#A9C356]" />
                      ))}
                      <div className="relative" style={{ width: 16, height: 16 }}>
                        <Star size={16} className="text-gray-300 absolute top-0 left-0" />
                        <div className="overflow-hidden absolute top-0 left-0" style={{ width: '50%' }}>
                          <Star size={16} className="fill-[#A9C356] text-[#A9C356]" />
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-[#2C2C2C]/50">({product.rating})</span>
                    <span className="text-sm text-[#2C2C2C]/50">Review {product.reviews}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="py-3 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#A9C356]/30 transition-all duration-300 hover:scale-105 text-sm"
                    >
                      {t('products.cta')}
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-[#EEF2E0] border border-[#A9C356] rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-[#6F832E] text-sm"
                    >
                      <Plus size={18} />
                      Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-white border border-[#E6E6E0] rounded-3xl p-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-5xl md:text-6xl font-bold text-[#6F832E] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-[#2C2C2C]/60 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}