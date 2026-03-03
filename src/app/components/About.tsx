import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface AboutProps {
  onBack: () => void;
  onShopNow: () => void;
}

const fadeUpVariant = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.1 }
};

export function About({ onBack, onShopNow }: AboutProps) {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-[#2C2C2C] overflow-x-hidden font-sans">
      {/* HERO */}
      <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <div className="bg-[#A9C356] flex items-center justify-center p-10 lg:p-20 relative z-10 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-[60%_40%_70%_30%/50%_60%_40%_50%] -top-24 -left-24 blur-2xl animate-[spin_12s_linear_infinite]" />
          <div className="relative z-10 max-w-[480px]">
            <motion.span 
              {...fadeUpVariant}
              className="inline-block text-[11px] font-semibold tracking-widest uppercase text-white/80 border border-white/40 rounded-full px-5 py-1.5 mb-8"
            >
              {t('about.hero.eyebrow')}
            </motion.span>
            <motion.h1 
              {...fadeUpVariant} transition={{ delay: 0.2, duration: 0.8 }}
              className="font-['Playfair_Display'] text-4xl lg:text-6xl font-bold leading-tight text-white"
            >
              {t('about.hero.title1')}<br/>
              <em className="font-normal text-white/90 italic whitespace-pre-line">{t('about.hero.title2')}</em>
            </motion.h1>
            <motion.p 
              {...fadeUpVariant} transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-7 text-lg font-light text-white/80 leading-relaxed whitespace-pre-line"
            >
              {t('about.hero.sub')}
            </motion.p>
          </div>
        </div>
        <div className="relative h-[60vw] lg:h-auto overflow-hidden">
          <img src="/about1.png" alt="Glowing skin" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#A9C356]/15 to-transparent lg:w-2/5" />
        </div>
      </section>

      {/* DIVIDER */}
      <div className="text-center m-0 leading-none">
        <svg viewBox="0 0 1440 70" className="w-full max-h-[70px]" preserveAspectRatio="none">
          <path d="M0,0 C360,70 1080,0 1440,60 L1440,0 Z" fill="#FAFAF8"/>
        </svg>
      </div>

      {/* MISSION */}
      <section className="relative bg-[#FAFAF8] py-24 px-6 overflow-hidden z-0">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUpVariant} className="text-center mb-16">
            <div className="text-[10px] font-semibold tracking-widest uppercase text-[#6F832E] mb-2.5">
              {t('about.mission.label')}
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl lg:text-5xl font-bold text-[#2C2C2C]">
              {t('about.mission.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            <motion.div {...fadeUpVariant} className="rounded-3xl overflow-hidden relative min-h-[340px] lg:min-h-[440px]">
              <img src="/about2.png" alt="Skincare mission" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/70 via-[#2C2C2C]/10 to-transparent flex flex-col justify-end p-8 lg:p-10">
                <div className="text-[10px] font-semibold tracking-widest uppercase text-[#A9C356] mb-2">
                  {t('about.mission.card1.label')}
                </div>
                <h2 className="font-['Playfair_Display'] text-xl lg:text-2xl font-bold text-white leading-snug mb-3">
                  {t('about.mission.card1.title')}
                </h2>
                <p className="text-sm text-white/80 font-light leading-relaxed">
                  {t('about.mission.card1.desc')}
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUpVariant} transition={{ delay: 0.2, duration: 0.8 }} className="relative p-10 bg-white rounded-3xl flex flex-col justify-center">
              <div className="absolute left-0 top-6 bottom-6 w-1 bg-[#A9C356] rounded-r-md" />
              <div className="text-[10px] font-semibold tracking-widest uppercase text-[#6F832E] mb-2.5">
                {t('about.mission.card2.label')}
              </div>
              <h2 className="font-['Playfair_Display'] text-2xl lg:text-3xl font-bold leading-snug mb-5 text-[#2C2C2C]">
                {t('about.mission.card2.title')}
              </h2>
              <p className="text-base text-[#2C2C2C]/80 font-light leading-relaxed">
                {t('about.mission.card2.desc')}
              </p>
            </motion.div>
          </div>

          <motion.div {...fadeUpVariant} className="grid grid-cols-1 lg:grid-cols-3 bg-[#A9C356] rounded-[28px] overflow-hidden">
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div className="text-[10px] font-semibold tracking-widest uppercase text-white/70 mb-2.5">
                {t('about.mission.card3.label')}
              </div>
              <h2 className="font-['Playfair_Display'] text-2xl lg:text-3xl font-bold text-white whitespace-pre-line">
                {t('about.mission.card3.title')}
              </h2>
            </div>
            <div className="h-[260px] lg:h-auto overflow-hidden group">
              <img src="/about3.png" alt="Vegan formulation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-base text-white font-light leading-relaxed">
                {t('about.mission.card3.desc')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OTC CERTIFICATION */}
      <section className="relative bg-white py-24 px-6 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <motion.div
              {...fadeUpVariant}
              className="relative rounded-3xl overflow-hidden min-h-[400px] lg:min-h-[500px] group"
            >
              <img
                src="/otc.png"
                alt="FDA-Compliant OTC Manufacturing Facility"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-4 shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-[#A9C356] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold tracking-widest uppercase text-[#6F832E]">{t('otc.badge.official')}</div>
                    <div className="text-sm font-semibold text-[#2C2C2C]">{t('otc.badge.certified')}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div {...fadeUpVariant} transition={{ delay: 0.2, duration: 0.8 }}>
              <div className="text-[10px] font-semibold tracking-widest uppercase text-[#6F832E] mb-3">
                {t('otc.badge')}
              </div>
              <h2 className="font-['Playfair_Display'] text-3xl lg:text-5xl font-bold text-[#2C2C2C] leading-snug mb-5">
                {t('otc.title1')}<br />
                <em className="font-normal italic text-[#A9C356]">{t('otc.title2')}</em>
              </h2>
              <p className="text-base text-[#2C2C2C]/70 font-light leading-relaxed mb-10">
                {t('otc.desc')}
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5 text-[#A9C356]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                    title: t('otc.trust1.title'),
                    desc: t('otc.trust1.desc'),
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 text-[#A9C356]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    ),
                    title: t('otc.trust2.title'),
                    desc: t('otc.trust2.desc'),
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 text-[#A9C356]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    ),
                    title: t('otc.trust3.title'),
                    desc: t('otc.trust3.desc'),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#FAFAF8] rounded-2xl p-5 flex flex-col gap-3 border border-[#E6E6E0]"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#A9C356]/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#2C2C2C] mb-0.5">{item.title}</div>
                      <div className="text-xs text-[#2C2C2C]/55 font-light leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCT SPOTLIGHT */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUpVariant} className="relative max-w-[360px] lg:max-w-none mx-auto">
            <div className="absolute inset-[-20px] bg-[#FAFAF8] rounded-[60%_40%_55%_45%/50%_55%_45%_50%] z-0" />
            <img src="/about4.png" alt="Klear Product" className="relative z-10 w-4/5 mx-auto drop-shadow-2xl" />
          </motion.div>
          <motion.div {...fadeUpVariant} transition={{ delay: 0.2, duration: 0.8 }}>
            <div className="text-[10px] font-semibold tracking-widest uppercase text-[#6F832E] mb-3">
              {t('about.product.label')}
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl lg:text-5xl font-bold text-[#2C2C2C] leading-snug mb-5">
              {t('about.product.title')}
            </h2>
            <p className="text-lg text-[#2C2C2C]/70 font-light leading-relaxed mb-8">
              {t('about.product.desc')}
            </p>
            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="flex flex-wrap gap-2.5 mb-10">
              {['SPF 50+ / PA+++', '50ml', 'Non-comedogenic', 'Dermatologist Tested', 'Fragrance-Free'].map((badge) => (
                <motion.span key={badge} variants={fadeUpVariant} className="bg-white border border-[#E6E6E0] text-[13px] font-medium px-4 py-2 rounded-full text-[#2C2C2C]">
                  {badge}
                </motion.span>
              ))}
            </motion.div>
            <button onClick={onShopNow} className="bg-[#A9C356] hover:bg-[#8FA93C] text-white text-sm font-semibold tracking-wider uppercase px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5">
              {t('about.product.cta')}
            </button>
          </motion.div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="bg-white p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">
          <motion.div {...fadeUpVariant} className="relative h-[60vw] lg:h-auto overflow-hidden">
            <img src="/about5.png" alt="Audience" className="w-full h-full object-cover object-center" />
          </motion.div>
          <motion.div {...fadeUpVariant} transition={{ delay: 0.2, duration: 0.8 }} className="flex items-center p-10 lg:p-20 bg-[#2C2C2C]">
            <div>
              <div className="text-[10px] font-semibold tracking-widest uppercase text-[#A9C356] mb-2.5">
                {t('about.audience.label')}
              </div>
              <h2 className="font-['Playfair_Display'] text-3xl lg:text-5xl font-bold text-white leading-snug mb-6">
                {t('about.audience.title')}
              </h2>
              <p className="text-base text-white/60 font-light leading-relaxed mb-10">
                {t('about.audience.desc')}
              </p>
              <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="flex flex-wrap gap-2.5">
                {['Glass Skin', 'Vegan', 'SPF+', 'Cruelty-Free', 'Fragrance-Free', 'K-Beauty', 'Barrier Care'].map((pill) => (
                  <motion.span key={pill} variants={fadeUpVariant} className="bg-transparent text-[#A9C356] border border-[#A9C356]/40 text-xs font-medium tracking-wide px-4 py-1.5 rounded-full">
                    {pill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    {/* CTA STRIP */}
    <section className="bg-[#2C2C2C] py-16 lg:py-24 flex justify-center items-center overflow-hidden">
        <motion.div {...fadeUpVariant} transition={{ delay: 0.2, duration: 0.8 }} className="flex flex-col items-center justify-center p-10 text-center w-full">
          <h2 className="font-['Playfair_Display'] text-3xl lg:text-4xl text-white font-bold leading-tight mb-4">
            {t('about.cta.title')}
          </h2>
          <p className="text-white/60 text-base font-light leading-relaxed max-w-[380px] mx-auto mb-10 whitespace-pre-line">
            {t('about.cta.desc')}
          </p>
          <button onClick={onShopNow} className="bg-[#A9C356] hover:bg-[#8FA93C] text-white text-sm font-semibold tracking-wider uppercase px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5">
            {t('about.cta.button')}
          </button>
        </motion.div>
      </section>
    </div>
  );
}