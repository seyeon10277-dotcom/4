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
      id: 'blackpink-special-edition',
      title: t('hero.title1'),
      subtitle: t('hero.subtitle1'),
      description: t('hero.desc1'),
      imagePerson: '/blackpink_hero.png',
      imageProduct: '/pd2_6.png',
      badge: t('hero.badge1'),
    },
    {
      id: 2,
      title: t('hero.title2'),
      subtitle: t('hero.subtitle2'),
      description: t('hero.desc2'),
      imagePerson: '/sunserum_hero.png',
      imageProduct: '/sunserum_hero_2.png',
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
    <section
      id="home"
      className="relative min-h-screen flex items-stretch overflow-hidden pt-20 bg-[#F5F5F0]"
    >
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
          className="flex w-full min-h-[calc(100vh-80px)]"
        >
          {/* ── LEFT: Text Area ── */}
          <div className="flex flex-col justify-center w-full lg:w-[38%] px-10 lg:px-16 xl:px-20 py-16 bg-[#F5F5F0] shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-1.5 bg-white border border-[#A9C356]/40 rounded-full text-xs font-semibold tracking-wide text-[#6F832E]">
                {slides[currentSlide].badge}
              </span>

              <p className="text-xs uppercase tracking-widest text-[#8FA93C] font-medium">
                {slides[currentSlide].subtitle}
              </p>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-[#111111] leading-tight whitespace-pre-line">
                {slides[currentSlide].title}
              </h1>

              <p className="text-base text-[#2C2C2C]/60 leading-relaxed whitespace-pre-line max-w-sm">
                {slides[currentSlide].description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10"
            >
              <button
                onClick={() => onShopNow?.(slides[currentSlide].id)}
                className="px-8 py-4 bg-[#111111] hover:bg-[#333333] text-white text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
              >
                {t('hero.cta1')}
              </button>
            </motion.div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-3 mt-12">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentSlide ? 1 : -1);
                    setCurrentSlide(index);
                  }}
                  className={`h-[2px] rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-10 bg-[#111111]'
                      : 'w-6 bg-[#2C2C2C]/20 hover:bg-[#2C2C2C]/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: Split Images ── */}
          <div className="hidden lg:flex flex-1 min-h-full">
            {/* Person Image — left half of right panel */}
            <div className="relative w-1/2 overflow-hidden">
              <ImageWithFallback
                src={slides[currentSlide].imagePerson}
                alt={slides[currentSlide].title}
                className="absolute inset-0 w-full h-full object-cover object-center"
                fallbackSrc="/sunserum_hero.png"
              />
            </div>

            {/* Product Image — right half of right panel */}
            <div className="relative w-1/2 overflow-hidden bg-white">
              <ImageWithFallback
                src={slides[currentSlide].imageProduct}
                alt={`${slides[currentSlide].title} product`}
                className="absolute inset-0 w-full h-full object-cover object-center"
                fallbackSrc="/sunserum_hero_2.png"
              />
            </div>
          </div>

          {/* Mobile: single image */}
          <div className="lg:hidden absolute inset-0 top-20 -z-10">
            <ImageWithFallback
              src={slides[currentSlide].imagePerson}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover object-center opacity-20"
              fallbackSrc="/sunserum_hero.png"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full px-4 md:px-8 flex justify-between pointer-events-none z-50">
        <button
          onClick={prevSlide}
          className="pointer-events-auto flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-md border border-[#E6E6E0] rounded-full shadow-sm text-[#111111] hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-md border border-[#E6E6E0] rounded-full shadow-sm text-[#111111] hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}