import { motion } from 'motion/react';
import { Sun, Droplets, Shield, Heart, Plus, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

interface ProductShowcaseProps {
  onBuyNow?: () => void;
}

export function ProductShowcase({ onBuyNow }: ProductShowcaseProps) {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();

  const products = [
    {
      id: 'bemot-sun-serum-50ml',
      name: 'Bemot Moisturizing Sun Serum SPF 50',
      category: t('products.device'),
      price: 35,
      rating: 4.5,
      reviews: 241,
      image: './sunserum_hero.png',
      features: [t('products.feature1'), t('products.feature2'), t('products.feature3')],
    },
    {
      id: 'blackpink-special-edition',
      name: language === 'ko' ? '블랙핑크 스페셜 에디션 스킨케어 세트' : 'BLACKPINK Special Edition Skincare Set',
      category: 'Special Edition',
      price: 89,
      rating: 4.5,
      reviews: 132,
      image: './blackpink_hero.png',
      features: ['Klear X BLACKPINK', 'Vegan', 'K-Beauty'],
    },
  ];

  const benefits = [
    {
      icon: Sun,
      title: t('products.benefit1.title'),
      description: t('products.benefit1.desc'),
    },
    {
      icon: Droplets,
      title: t('products.benefit2.title'),
      description: t('products.benefit2.desc'),
    },
    {
      icon: Shield,
      title: t('products.benefit3.title'),
      description: t('products.benefit3.desc'),
    },
    {
      icon: Heart,
      title: t('products.benefit4.title'),
      description: t('products.benefit4.desc'),
    },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleBuyNow = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    if (onBuyNow) onBuyNow();
  };

  return (
    <section id="products" className="relative py-32 overflow-hidden bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-[#EEF2E0] border border-[#A9C356]/30 rounded-full text-sm font-semibold mb-4 text-[#6F832E]">
            {t('products.badge')}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#111111]">
            {t('products.title')}
          </h2>
          <p className="text-xl text-[#2C2C2C]/60 max-w-3xl mx-auto">
            {t('products.subtitle')}
          </p>
        </motion.div>

{/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              // h-full, flex, flex-col 추가
              className="group relative h-full flex flex-col"
            >
              <div className="relative h-full flex flex-col bg-white border border-[#E6E6E0] rounded-3xl overflow-hidden hover:border-[#A9C356]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#A9C356]/10">
                {/* Product Image */}
                <div className="relative h-96 overflow-hidden flex items-center justify-center bg-white flex-shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    fallbackSrc="./sunserum_hero.png"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#A9C356]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-4 right-4 px-4 py-2 bg-[#EEF2E0] backdrop-blur-md rounded-full text-sm font-semibold text-[#6F832E]">
                    {product.category}
                  </div>
                </div>

{/* Product Info - flex, flex-col, flex-grow 유지 */}
                <div className="p-8 flex flex-col flex-grow">
                  {/* 수정 1: 타이틀 2줄 고정 (min-h-[56px], line-clamp-2, break-keep 추가) */}
                  <h3 className="text-xl font-bold text-[#111111] mb-1 min-h-[56px] line-clamp-2 break-keep">
                    {product.name}
                  </h3>
                  <span className="text-2xl font-bold text-[#6F832E] block mb-4">
                    ${product.price}
                  </span>

                  <div className="flex items-center justify-start bg-white gap-2 mb-6">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((s) => (
                        <Star key={s} size={18} className="fill-[#A9C356] text-[#A9C356]" />
                      ))}
                      <div className="relative" style={{ width: 18, height: 18 }}>
                        <Star size={18} className="text-gray-300 absolute top-0 left-0" />
                        <div className="overflow-hidden absolute top-0 left-0" style={{ width: '50%' }}>
                          <Star size={18} className="fill-[#A9C356] text-[#A9C356]" />
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-[#2C2C2C]/50">({product.rating})</span>
                    <span className="text-sm text-[#2C2C2C]/50 ml-2">Review {product.reviews}</span>
                  </div>

                  {/* 수정 2: 해시태그 영역 높이 변동 방지 (min-h-[36px] 및 overflow-hidden 추가) */}
                  <div className="flex flex-wrap gap-2 mb-6 min-h-[36px] overflow-hidden">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1.5 bg-[#EEF2E0] border border-[#E6E6E0] rounded-full text-sm text-[#6F832E] whitespace-nowrap"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* 하단 버튼 고정 영역 유지 */}
                  <div className="grid grid-cols-2 gap-4 mt-auto pt-4">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="py-4 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#A9C356]/30 transition-all duration-300 hover:scale-105 text-sm"
                    >
                      {t('products.cta')}
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center gap-2 py-4 bg-white hover:bg-[#EEF2E0] border border-[#A9C356] rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-[#6F832E] text-sm"
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

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <div className="bg-white border border-[#E6E6E0] rounded-2xl p-6 hover:bg-[#EEF2E0] hover:border-[#A9C356]/30 transition-all duration-300 h-full">
                <div className="inline-flex p-3 bg-[#EEF2E0] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 text-[#6F832E]" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#111111]">{benefit.title}</h3>
                <p className="text-sm text-[#2C2C2C]/60">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}