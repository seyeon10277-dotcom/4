import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onGoToAbout?: () => void;
}

export function Footer({ onGoToAbout }: FooterProps) {
  const { t } = useLanguage();

  const footerLinks = {
    products: [
      { label: t('footer.product1'), href: '#products' },
      { label: t('footer.product2'), href: '#products' },
      { label: t('footer.product3'), href: '#technology' },
    ],
    company: [
      { label: t('footer.company1'), href: '#about' },
      { label: t('footer.company2'), href: '#' },
    ],
    support: [
      { label: t('footer.support1'), href: '#'},
    ],
    legal: [
      { label: t('footer.legal1'), href: '#' },
      { label: t('footer.legal2'), href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com', label: 'YouTube' },
    { icon: Twitter, href: 'https://x.com', label: 'Twitter' },
  ];

  return (
    <footer id="contact" className="relative py-20 overflow-hidden border-t border-[#E6E6E0] bg-[#FAFAF8]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <div className="bg-[#EEF2E0] border border-[#A9C356]/20 rounded-3xl p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-4 text-[#111111]">{t('footer.newsletter.title')}</h3>
              <p className="text-[#2C2C2C]/60 mb-8">{t('footer.newsletter.desc')}</p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className="flex-1 px-6 py-4 bg-white border border-[#E6E6E0] rounded-full focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C]"
                />
                <button className="px-8 py-4 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-[#A9C356]/30 transition-all duration-300 hover:scale-105 whitespace-nowrap">
                  {t('footer.newsletter.button')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <img src="/klear-logo-header.png" className="h-8 auto" />
              </div>
              <p className="text-[#2C2C2C]/60 mb-6 leading-relaxed whitespace-pre-line">{t('footer.tagline')}</p>
              <div className="space-y-3 text-sm text-[#2C2C2C]/60">
                <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#6F832E]" /><span>Seoul, South Korea</span></div>
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#6F832E]" /><span>+82 (2) 1234-5678</span></div>
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#6F832E]" /><span>hello@klear.co.kr</span></div>
              </div>
            </motion.div>
          </div>

          {[
            { title: t('footer.products'), links: footerLinks.products, delay: 0.1 },
            { title: t('footer.company'), links: footerLinks.company, delay: 0.2 },
            { title: t('footer.support'), links: footerLinks.support, delay: 0.3 },
            { title: t('footer.legal'), links: footerLinks.legal, delay: 0.4 },
          ].map((section) => (
            <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: section.delay, duration: 0.6 }}>
              <h4 className="font-semibold mb-4 text-[#111111]">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {/* 3. onClick 이벤트 핸들러 추가 */}
                    <a 
                      href={link.href} 
                      onClick={(e) => {
                        if (link.href === '#about') {
                          e.preventDefault();
                          if (onGoToAbout) onGoToAbout();
                        }
                      }}
                      className="text-[#2C2C2C]/60 hover:text-[#6F832E] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }} className="pt-8 border-t border-[#E6E6E0]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-[#2C2C2C]/60">{t('footer.copyright')}</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} title={social.label} className="p-3 bg-[#EEF2E0] border border-[#E6E6E0] rounded-full hover:bg-[#BBD07B] hover:border-[#A9C356]/30 transition-all duration-300 hover:scale-110 text-[#6F832E]">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
