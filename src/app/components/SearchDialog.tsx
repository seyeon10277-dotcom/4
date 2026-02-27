import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchableContent = [
  { id: '1', title: 'Bemot Moisturizing Sun Serum SPF 50', category: 'Product', section: '#products' },
  { id: '2', title: 'Bemot Sun Serum SPF 50 (Travel)', category: 'Product', section: '#products' },
  { id: '3', title: 'Niacinamide 5%', category: 'Ingredient', section: '#technology' },
  { id: '4', title: 'Hyaluronic Acid', category: 'Ingredient', section: '#technology' },
  { id: '5', title: 'Centella Asiatica', category: 'Ingredient', section: '#technology' },
  { id: '6', title: 'Brand Story', category: 'About', section: '#story' },
  { id: '7', title: 'Contact', category: 'Support', section: '#contact' },
];

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const { language } = useLanguage();

  const filteredResults = searchableContent.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleResultClick = (section: string) => {
    const element = document.querySelector(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
      setQuery('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
            <div className="bg-white border border-[#E6E6E0] rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-[#E6E6E0]">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                  <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={language === 'ko' ? '검색어를 입력하세요...' : 'Search...'} autoFocus className="w-full pl-12 pr-12 py-4 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-lg text-[#2C2C2C]" />
                  <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[#EEF2E0] rounded-lg transition-colors text-[#2C2C2C]"><X size={20} /></button>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {query.trim() === '' ? (
                  <div className="p-8 text-center text-[#2C2C2C]/40">{language === 'ko' ? '검색어를 입력하면 결과가 표시됩니다' : 'Start typing to see results'}</div>
                ) : filteredResults.length === 0 ? (
                  <div className="p-8 text-center text-[#2C2C2C]/40">{language === 'ko' ? '검색 결과가 없습니다' : 'No results found'}</div>
                ) : (
                  <div className="p-4 space-y-2">
                    {filteredResults.map((result) => (
                      <motion.button key={result.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => handleResultClick(result.section)} className="w-full text-left p-4 bg-[#FAFAF8] hover:bg-[#EEF2E0] border border-[#E6E6E0] rounded-xl transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-[#111111] group-hover:text-[#6F832E] transition-colors">{result.title}</h3>
                            <p className="text-sm text-[#2C2C2C]/60">{result.category}</p>
                          </div>
                          <Search className="w-4 h-4 text-[#2C2C2C]/40 group-hover:text-[#6F832E] transition-colors" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-[#E6E6E0] bg-[#FAFAF8]">
                <p className="text-sm text-[#2C2C2C]/40 text-center">{language === 'ko' ? '항목을 클릭하면 해당 섹션으로 이동합니다' : 'Click on a result to jump to that section'}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
