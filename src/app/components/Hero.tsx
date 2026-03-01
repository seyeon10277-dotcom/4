import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onShopNow?: () => void;
}

export function Hero({ onShopNow }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const { t } = useLanguage();

  const slides = [
    {
      id: 1,
      title: t('hero.title1'),
      subtitle: t('hero.subtitle1'),
      description: 'Klear X Black Pink 스페셜 에디션 스킨케어 세트를 합리적인 가격에 만나고 전 세계가 주목하는 블랙핑크와 함께하는 가장 깨끗한 뷰티 루틴을 시작해보세요',
      image: '/blackpink_hero.png',  
      badge: t('hero.badge1'),
    },
    {
      id: 2,
      title: t('hero.title2'),
      subtitle: t('hero.subtitle2'),
      description: t('hero.desc2'),
      image: '/sunserum_hero.png',
      badge: t('hero.badge2'),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-[#EEF2E0] via-white to-[#EEF2E0]">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A9C356]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#BBD07B]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 400, damping: 25 },
              opacity: { duration: 0.3 },
            }}
            className="grid lg:grid-cols-2 gap-12 items-center w-full"
          >
            {/* Text Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-block px-4 py-2 bg-[#EEF2E0] border border-[#A9C356]/30 rounded-full text-sm font-semibold mb-4 text-[#6F832E]">
                  {slides[currentSlide].badge}
                </span>
                <h2 className="text-sm uppercase tracking-widest text-[#8FA93C] mb-4">
                  {slides[currentSlide].subtitle}
                </h2>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#111111] leading-tight">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-xl text-[#2C2C2C]/70 leading-relaxed">
                  {slides[currentSlide].description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={onShopNow}
                  className="px-8 py-4 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-[#A9C356]/30 transition-all duration-300 hover:scale-105"
                >
                  {t('hero.cta1')}
                </button>
              </motion.div>

              {/* Slide Indicators */}
              <div className="flex items-center gap-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentSlide ? 1 : -1);
                      setCurrentSlide(index);
                    }}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-12 bg-[#A9C356]'
                        : 'w-8 bg-[#2C2C2C]/20 hover:bg-[#2C2C2C]/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#A9C356]/20 via-[#BBD07B]/10 to-transparent blur-xl" />
                
                <ImageWithFallback
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="relative z-10 w-full h-[500px] object-cover rounded-2xl"
                  fallbackSrc="/sunserum_hero.png"
                />

                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#A9C356]/10 to-transparent"
                />
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

{/* Navigation Arrows (max-w-7xl 바깥으로 이동됨) */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full px-4 md:px-8 xl:px-16 flex justify-between pointer-events-none z-50">
          <button
            onClick={prevSlide}
            className="pointer-events-auto flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-md border border-[#E6E6E0] rounded-full shadow-md text-[#111111] hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-md border border-[#E6E6E0] rounded-full shadow-md text-[#111111] hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>
  );
}
