import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

const CHATBOT_URL = 'https://klear-chatbot-final.vercel.app/';

interface ChatbotProps {
  externalOpen?: boolean;
  onExternalOpenHandled?: () => void;
}

export function Chatbot({ externalOpen, onExternalOpenHandled }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (externalOpen) {
      setIsOpen(true);
      onExternalOpenHandled?.();
    }
  }, [externalOpen]);

  return (
    <div className="pointer-events-none">
      {/* FAB 버튼 */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto fixed bottom-6 right-6 w-14 h-14 bg-[#4CAF50] rounded-full shadow-xl z-50 flex items-center justify-center hover:shadow-[0_8px_30px_rgba(76,175,80,0.45)] transition-shadow duration-300"
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