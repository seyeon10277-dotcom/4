import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, RotateCcw, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const getSystemPrompt = (lang: 'ko' | 'en') =>
  `You are a warm and knowledgeable K-Beauty consultant for Klear, a premium Korean skincare brand. Respond naturally and concisely (2-3 sentences max unless detail is needed).

Brand Info:
- Flagship: Bemot Moisturizing Sun Serum SPF 50+ / PA+++ ($89) — Bemotrizinol UV filter, oil-free, no white cast
- Also: BLACKPINK Special Edition Skincare Set ($129)
- All products: 100% Vegan, Cruelty-Free, Fragrance-Free
- Manufacturing: FDA-compliant, OTC-certified facility, batch-by-batch QC
- Key ingredients: Bemotrizinol, Niacinamide 5%, Hyaluronic Acid, Centella Asiatica, Vitamin E, Zinc Oxide + Titanium Dioxide, Green Tea Extract
- Shipping: domestic 2-3 days, international 5-7 days, free shipping over $100
- Support: hello@klear.com

IMPORTANT: The user interface language is currently set to ${lang === 'ko' ? 'Korean' : 'English'}. You MUST always reply ONLY in ${lang === 'ko' ? '한국어 (Korean)' : 'English'}, regardless of what language the user types in. Be friendly, professional, and helpful.`;

const quickReplies = [
  { ko: '제품 추천', en: 'Product Recs' },
  { ko: '성분 문의', en: 'Ingredients' },
  { ko: '배송 안내', en: 'Shipping' },
  { ko: '사용 방법', en: 'How to Use' },
];

export function Chatbot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getWelcomeText = (lang: 'ko' | 'en') =>
    lang === 'ko'
      ? '안녕하세요! Klear 뷰티 컨설턴트입니다 🌿\n제품, 성분, 피부 고민 무엇이든 편하게 물어보세요.'
      : "Hello! I'm your Klear beauty consultant 🌿\nAsk me anything about our products, ingredients, or skincare routine.";

  const welcomeText = getWelcomeText(language);

  // 채팅창 열릴 때 웰컴 메시지 세팅
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        text: welcomeText,
        timestamp: new Date(),
      }]);
    }
  }, [isOpen]);

  // 언어 변경 시: 웰컴 메시지만 있으면 교체, 대화 중이면 알림 메시지 추가
  useEffect(() => {
    setMessages(prev => {
      // 아직 대화가 시작되지 않은 경우 (웰컴 메시지만 있음) → 언어에 맞게 교체
      if (prev.length <= 1 && (prev.length === 0 || prev[0].id === 'welcome')) {
        if (prev.length === 0) return prev;
        return [{ ...prev[0], text: getWelcomeText(language) }];
      }
      // 대화 중인 경우 → 언어 전환 안내 메시지 삽입
      const notice: Message = {
        id: `lang-notice-${Date.now()}`,
        role: 'assistant',
        text: language === 'ko'
          ? '언어가 한국어로 변경되었습니다. 이후 답변은 한국어로 제공됩니다.'
          : 'Language switched to English. Replies will now be in English.',
        timestamp: new Date(),
      };
      return [...prev, notice];
    });
  }, [language]);

  // 새 메시지마다 스크롤 하단으로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // 열릴 때 input 포커스
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleReset = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      text: welcomeText,
      timestamp: new Date(),
    }]);
    setInputValue('');
  };

  // OpenAI API 호출 — 전체 대화 히스토리를 messages 배열로 전달해 맥락 유지
  const callOpenAI = async (userText: string, history: Message[]): Promise<string> => {
    const openAIMessages: OpenAIMessage[] = [
      { role: 'system', content: getSystemPrompt(language) },
      // 웰컴 메시지는 system prompt로 이미 처리되므로 제외
      ...history
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.text })),
      { role: 'user', content: userText },
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openAIMessages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data.choices[0].message.content as string;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    // 현재 messages를 히스토리로 저장 후 유저 메시지 추가
    const currentHistory = [...messages];
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const replyText = await callOpenAI(text.trim(), currentHistory);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: replyText,
        timestamp: new Date(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: language === 'ko'
          ? '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
          : 'Something went wrong. Please try again in a moment.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* 채팅 창 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="pointer-events-auto fixed bottom-24 right-6 w-[360px] h-[520px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-[#E6E6E0]"
          >
            {/* 헤더 */}
            <div className="px-5 py-4 bg-[#A9C356] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <Sparkles size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-none">Klear Consultant</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                    <span className="text-white/75 text-[11px] font-light">
                      {language === 'ko' ? '온라인' : 'Online'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleReset}
                title={language === 'ko' ? '대화 초기화' : 'Reset chat'}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/28 flex items-center justify-center transition-colors"
              >
                <RotateCcw size={14} className="text-white" />
              </button>
            </div>

            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FAFAF8]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-[#A9C356] flex items-center justify-center shrink-0 mb-0.5">
                      <Sparkles size={11} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      message.role === 'user'
                        ? 'bg-[#A9C356] text-white rounded-2xl rounded-br-sm'
                        : 'bg-white text-[#2C2C2C] border border-[#E6E6E0] rounded-2xl rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {/* 타이핑 인디케이터 */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2 justify-start"
                >
                  <div className="w-6 h-6 rounded-full bg-[#A9C356] flex items-center justify-center shrink-0 mb-0.5">
                    <Sparkles size={11} className="text-white" />
                  </div>
                  <div className="bg-white border border-[#E6E6E0] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A9C356] animate-[chatBounce_1.2s_ease-in-out_0s_infinite]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A9C356] animate-[chatBounce_1.2s_ease-in-out_0.2s_infinite]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A9C356] animate-[chatBounce_1.2s_ease-in-out_0.4s_infinite]" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 빠른 답변 칩 */}
            <div className="px-4 pt-2.5 pb-2 bg-white border-t border-[#E6E6E0] shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(language === 'ko' ? reply.ko : reply.en)}
                    disabled={isLoading}
                    className="px-3 py-1 text-[11px] font-medium text-[#6F832E] bg-[#A9C356]/10 hover:bg-[#A9C356]/20 border border-[#A9C356]/25 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {language === 'ko' ? reply.ko : reply.en}
                  </button>
                ))}
              </div>
            </div>

            {/* 입력창 */}
            <div className="px-4 pb-4 pt-2 bg-white shrink-0">
              <div className="flex items-center gap-2 bg-[#FAFAF8] border border-[#E6E6E0] rounded-2xl px-4 py-2.5 focus-within:border-[#A9C356] transition-colors duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(inputValue);
                    }
                  }}
                  placeholder={language === 'ko' ? '메시지를 입력하세요...' : 'Ask me anything...'}
                  disabled={isLoading}
                  className="flex-1 text-sm bg-transparent outline-none text-[#2C2C2C] placeholder:text-[#2C2C2C]/35 disabled:opacity-50 font-light"
                />
                <button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-7 h-7 rounded-full bg-[#A9C356] hover:bg-[#8FA93C] flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                >
                  <Send size={13} className="text-white translate-x-px" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}