import { motion } from 'motion/react';
import { Globe, Target, TrendingUp, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

export function BrandStory() {
  const { t } = useLanguage();

  const milestones = [
    { year: '2015', title: t('story.milestone1.title'), description: t('story.milestone1.desc') },
    { year: '2018', title: t('story.milestone2.title'), description: t('story.milestone2.desc') },
    { year: '2021', title: t('story.milestone3.title'), description: t('story.milestone3.desc') },
    { year: '2026', title: t('story.milestone4.title'), description: t('story.milestone4.desc') },
  ];

  const values = [
    { icon: Globe, title: t('story.value1.title'), description: t('story.value1.desc') },
    { icon: Target, title: t('story.value2.title'), description: t('story.value2.desc') },
    { icon: TrendingUp, title: t('story.value3.title'), description: t('story.value3.desc') },
    { icon: Users, title: t('story.value4.title'), description: t('story.value4.desc') },
  ];

  return (
    <section id="story" className="relative py-32 overflow-hidden bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-[#EEF2E0] border border-[#A9C356]/30 rounded-full text-sm font-semibold mb-4 text-[#6F832E]">{t('story.badge')}</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#111111]">{t('story.title')}</h2>
          <p className="text-xl text-[#2C2C2C]/60 max-w-3xl mx-auto">{t('story.subtitle')}</p>
        </motion.div>

        {/* Story Content */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1722407348192-a44ce83704da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLb3JlYW4lMjBza2luY2FyZSUyMGxhYm9yYXRvcnklMjBzY2llbmNlfGVufDF8fHx8MTc3MTk4OTE5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Klear Innovation Lab"
                className="w-full h-[600px] object-cover"
                fallbackSrc="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#A9C356]/20 via-transparent to-transparent" />
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className="absolute -bottom-6 -right-6 bg-[#A9C356] rounded-2xl p-6 shadow-2xl text-white">
              <div className="text-4xl font-bold">11+</div>
              <div className="text-sm">{t('story.years')}</div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div key={milestone.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15, duration: 0.5 }} className="flex gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-[#A9C356] rounded-2xl flex items-center justify-center font-bold text-lg text-white group-hover:scale-110 transition-transform duration-300">{milestone.year}</div>
                </div>
                <div className="flex-1 bg-white border border-[#E6E6E0] rounded-2xl p-6 group-hover:bg-[#EEF2E0] group-hover:border-[#A9C356]/30 transition-all duration-300">
                  <h3 className="text-xl font-bold mb-2 text-[#111111]">{milestone.title}</h3>
                  <p className="text-[#2C2C2C]/60">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div key={value.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} className="group relative">
              <div className="relative h-full bg-white border border-[#E6E6E0] rounded-2xl p-8 hover:bg-[#EEF2E0] hover:border-[#A9C356]/30 transition-all duration-300">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="inline-flex p-4 bg-[#EEF2E0] rounded-xl mb-4">
                  <value.icon className="w-6 h-6 text-[#6F832E]" />
                </motion.div>
                <h3 className="text-lg font-bold mb-2 text-[#111111]">{value.title}</h3>
                <p className="text-sm text-[#2C2C2C]/60">{value.description}</p>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#A9C356] group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
