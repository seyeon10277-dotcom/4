import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

const CHATBOT_URL = 'https://klear-chatbot-final.vercel.app/';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pointer-events-none">
      {/* FAB 버튼 */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto fixed bottom-6 right-6 w-14 h-14 bg-[#A9C356] rounded-full shadow-xl z-50 flex items-center justify-center hover:shadow-[0_8px_30px_rgba(169,195,86,0.45)] transition-shadow duration-300"
        aria-label="Open Klear chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Sparkles size={20} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* iframe 팝업 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="pointer-events-auto fixed bottom-24 right-6 w-[380px] h-[560px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-[#E6E6E0]"
          >
            {/* 헤더 */}
            <div className="px-5 py-4 bg-[#A9C356] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Sparkles size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-none">Klear Consultant</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                    <span className="text-white/75 text-[11px] font-light">온라인</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/28 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            {/* iframe */}
            <iframe
              src={CHATBOT_URL}
              className="flex-1 w-full border-none"
              title="Klear Chatbot"
              allow="microphone"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
