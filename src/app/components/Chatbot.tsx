import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessage: Message = {
  id: '1',
  text: '안녕하세요! Klear 챗봇입니다. 무엇을 도와드릴까요?',
  sender: 'bot',
  timestamp: new Date(),
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const { language } = useLanguage();

  // 대화 초기화 함수
  const handleReset = () => {
    setMessages([
      {
        ...initialMessage,
        text: language === 'ko' 
          ? '안녕하세요! Klear 챗봇입니다. 무엇을 도와드릴까요?' 
          : 'Hello! I\'m Klear chatbot. How can I help you?',
        timestamp: new Date(),
      }
    ]);
    setInputValue('');
  };

  const quickReplies = [
    { ko: '제품 정보', en: 'Product Info', response: 'Age-R Booster Pro와 PDRN 스킨부스터 앰플에 대해 궁금하신가요?' },
    { ko: '배송 문의', en: 'Shipping', response: '국내 배송은 2-3일, 해외 배송은 5-7일 소요됩니다.' },
    { ko: '사용 방법', en: 'How to Use', response: '제품 사용 방법에 대한 자세한 안내를 드리겠습니다.' },
    { ko: '가격 문의', en: 'Pricing', response: 'Age-R Booster Pro는 $299, PDRN 앰플은 $89입니다.' },
  ];

  const getAutoReply = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('가격') || lowerMessage.includes('얼마')) {
      return 'Age-R Booster Pro는 $299, PDRN 스킨부스터 앰플은 $89입니다. 세트 구매 시 15% 할인 혜택이 있습니다!';
    }
    
    if (lowerMessage.includes('shipping') || lowerMessage.includes('배송')) {
      return '국내 배송은 2-3일, 해외 배송은 5-7일 소요됩니다. 무료 배송은 $100 이상 구매 시 제공됩니다.';
    }
    
    if (lowerMessage.includes('technology') || lowerMessage.includes('기술')) {
      return 'AI 분석, RF 마이크로 전류, 멀티 LED 테라피 등 최첨단 기술을 사용합니다. 더 자세한 정보는 Technology 섹션을 확인해주세요.';
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('연락') || lowerMessage.includes('문의')) {
      return '이메일: hello@aprbeauty.com | 전화: +1 (555) 123-4567 | 평일 09:00-18:00 운영합니다.';
    }
    
    return language === 'ko' 
      ? '죄송합니다. 질문을 이해하지 못했습니다. 아래 버튼을 클릭하거나 다시 질문해주세요.'
      : "I'm sorry, I didn't understand. Please try again or click a quick reply below.";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAutoReply(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInputValue('');
  };

  const handleQuickReply = (reply: typeof quickReplies[0]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: language === 'ko' ? reply.ko : reply.en,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: reply.response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <>
      {/* Chat Button - 🤖 이모지 이미지 */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-2xl z-40 hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center overflow-hidden"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <span className="text-3xl" role="img" aria-label="chatbot">🤖</span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-gradient-to-br from-blue-950 via-purple-950 to-blue-900 border border-white/10 rounded-3xl shadow-2xl z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span className="text-xl">🤖</span>
                {language === 'ko' ? '도움말 및 리소스' : 'Help & Resources'}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {language === 'ko' ? '무엇을 도와드릴까요?' : 'How can we help you?'}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-white/10 border border-white/10'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="p-3 border-t border-white/10 bg-white/5">
              <div className="flex flex-wrap gap-2 mb-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-colors"
                  >
                    {language === 'ko' ? reply.ko : reply.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={language === 'ko' ? '메시지 입력...' : 'Type a message...'}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"
                />
                <button
                  onClick={handleReset}
                  className="p-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all hover:scale-105"
                  title={language === 'ko' ? '대화 초기화' : 'Reset conversation'}
                >
                  <RotateCcw size={20} />
                </button>
                <button
                  onClick={handleSend}
                  className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:shadow-lg transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
