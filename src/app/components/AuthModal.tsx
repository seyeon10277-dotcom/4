import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Lock, Mail, Search, KeyRound, ArrowLeft, Gift, Copy, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToAccount?: () => void;
}

type ModalView = 'login' | 'signup' | 'findId' | 'findPassword' | 'signupSuccess';

export function AuthModal({ isOpen, onClose, onGoToAccount }: AuthModalProps) {
  const [view, setView] = useState<ModalView>('login');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foundId, setFoundId] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [couponCopied, setCouponCopied] = useState(false);

  const { signUp, signIn, findId, findPassword } = useAuth();
  const { language } = useLanguage();

  const COUPON_CODE = 'WELCOME20';

  // ✅ 에러 코드 → 현재 언어에 맞는 메시지로 변환
  const translateError = (error: string) => {
    const errors: Record<string, { ko: string; en: string }> = {
      INVALID_CREDENTIALS: {
        ko: '아이디 또는 비밀번호가 틀렸습니다.',
        en: 'Invalid username or password.',
      },
      EMAIL_NOT_FOUND: {
        ko: '해당 이메일로 등록된 아이디가 없습니다.',
        en: 'No account found with this email.',
      },
      ACCOUNT_NOT_FOUND: {
        ko: '아이디와 이메일이 일치하는 계정이 없습니다.',
        en: 'No account matches the provided ID and email.',
      },
    };
    return errors[error]?.[language] ?? error;
  };

  const resetForm = () => {
    setLoginId('');
    setPassword('');
    setEmail('');
    setStatus('');
    setFoundId('');
    setTempPassword('');
    setCouponCopied(false);
  };

  const switchView = (newView: ModalView) => {
    resetForm();
    setView(newView);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(COUPON_CODE).then(() => {
      setCouponCopied(true);
      setTimeout(() => setCouponCopied(false), 2000);
    });
  };

  const handleSignUp = async () => {
    if (!loginId || !password) {
      setStatus(language === 'ko' ? '아이디와 비밀번호를 모두 입력해주세요.' : 'Please enter ID and password.');
      return;
    }
    setIsLoading(true);
    setStatus(language === 'ko' ? '가입 처리 중...' : 'Signing up...');
    const result = await signUp(loginId, password, email);
    if (result.success) {
      setView('signupSuccess');
      setStatus('');
    } else {
      setStatus((language === 'ko' ? '오류: ' : 'Error: ') + (result.error || 'Unknown error'));
    }
    setIsLoading(false);
  };

  const handleSignIn = async () => {
    if (!loginId || !password) {
      setStatus(language === 'ko' ? '아이디와 비밀번호를 모두 입력해주세요.' : 'Please enter ID and password.');
      return;
    }
    setIsLoading(true);
    setStatus(language === 'ko' ? '로그인 확인 중...' : 'Signing in...');
    const result = await signIn(loginId, password, rememberMe);
    if (result.success) {
      setStatus(language === 'ko' ? '✅ 로그인 성공!' : '✅ Login successful!');
      setTimeout(() => {
        onClose();
        resetForm();
        if (onGoToAccount) onGoToAccount();
      }, 1000);
    } else {
      // ✅ translateError로 언어에 맞게 변환
      setStatus(translateError(result.error || '') || (language === 'ko' ? '로그인 실패' : 'Login failed'));
    }
    setIsLoading(false);
  };

  const handleFindId = async () => {
    if (!email) {
      setStatus(language === 'ko' ? '이메일을 입력해주세요.' : 'Please enter your email.');
      return;
    }
    setIsLoading(true);
    const result = await findId(email);
    if (result.success && result.loginId) {
      setFoundId(result.loginId);
      setStatus(language === 'ko' ? '✅ 아이디를 찾았습니다!' : '✅ ID found!');
    } else {
      // ✅ translateError로 언어에 맞게 변환
      setStatus(translateError(result.error || '') || (language === 'ko' ? '아이디를 찾을 수 없습니다.' : 'ID not found.'));
    }
    setIsLoading(false);
  };

  const handleFindPassword = async () => {
    if (!loginId || !email) {
      setStatus(language === 'ko' ? '아이디와 이메일을 모두 입력해주세요.' : 'Please enter ID and email.');
      return;
    }
    setIsLoading(true);
    const result = await findPassword(loginId, email);
    if (result.success && result.tempPassword) {
      setTempPassword(result.tempPassword);
      setStatus(language === 'ko' ? '✅ 임시 비밀번호가 생성되었습니다!' : '✅ Temporary password generated!');
    } else {
      // ✅ translateError로 언어에 맞게 변환
      setStatus(translateError(result.error || '') || (language === 'ko' ? '비밀번호를 찾을 수 없습니다.' : 'Password reset failed.'));
    }
    setIsLoading(false);
  };

  const getTitle = () => {
    switch (view) {
      case 'login': return language === 'ko' ? '로그인' : 'Login';
      case 'signup': return language === 'ko' ? '회원가입' : 'Sign Up';
      case 'signupSuccess': return language === 'ko' ? '🎉 가입 완료!' : '🎉 Welcome!';
      case 'findId': return language === 'ko' ? '아이디 찾기' : 'Find ID';
      case 'findPassword': return language === 'ko' ? '비밀번호 찾기' : 'Find Password';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4">
            <div className="bg-white border border-[#E6E6E0] rounded-3xl shadow-2xl p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  {(view === 'findId' || view === 'findPassword') && (
                    <button onClick={() => switchView('login')} className="p-1 rounded-full hover:bg-[#EEF2E0] transition-colors text-[#2C2C2C]"><ArrowLeft size={20} /></button>
                  )}
                  <h2 className="text-2xl font-bold text-[#111111]">{getTitle()}</h2>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-[#EEF2E0] transition-colors text-[#2C2C2C]"><X size={24} /></button>
              </div>

              <div className="space-y-4">
                {/* ===== SIGNUP SUCCESS VIEW ===== */}
                {view === 'signupSuccess' && (
                  <>
                    <div className="text-center py-4">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                        <Gift className="w-16 h-16 text-[#A9C356] mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-[#111111] mb-2">
                        {language === 'ko' ? '회원가입을 축하합니다!' : 'Congratulations on signing up!'}
                      </h3>
                      <p className="text-[#2C2C2C]/60 mb-6">
                        {language === 'ko' ? '신규 회원 20% 할인 쿠폰을 드립니다!' : 'Here\'s your 20% off welcome coupon!'}
                      </p>
                    </div>

                    {/* Coupon Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative">
                      <div className="bg-gradient-to-r from-[#A9C356] to-[#8FA93C] rounded-2xl p-6 text-white text-center">
                        <div className="text-sm font-medium opacity-80 mb-1">WELCOME COUPON</div>
                        <div className="text-4xl font-bold mb-2">20% OFF</div>
                        <div className="text-sm opacity-80 mb-4">{language === 'ko' ? '모든 제품 적용 가능' : 'Applicable to all products'}</div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 inline-flex items-center gap-3">
                          <span className="text-xl font-bold font-mono tracking-widest">{COUPON_CODE}</span>
                          <button onClick={handleCopyCoupon} className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                            {couponCopied ? <Check size={18} /> : <Copy size={18} />}
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {couponCopied && (
                      <p className="text-sm text-center text-[#6F832E]">
                        {language === 'ko' ? '✅ 쿠폰 코드가 복사되었습니다!' : '✅ Coupon code copied!'}
                      </p>
                    )}

                    <button onClick={() => { switchView('login'); setLoginId(loginId); }} className="w-full py-3 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                      {language === 'ko' ? '로그인 하러 가기' : 'Go to Login'}
                    </button>
                  </>
                )}

                {/* ===== LOGIN VIEW ===== */}
                {view === 'login' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">{language === 'ko' ? '아이디' : 'Username'}</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                        <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder={language === 'ko' ? '아이디를 입력하세요' : 'Enter your username'} className="w-full pl-10 pr-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">{language === 'ko' ? '비밀번호' : 'Password'}</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSignIn()} placeholder={language === 'ko' ? '비밀번호를 입력하세요' : 'Enter your password'} className="w-full pl-10 pr-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-[#E6E6E0] accent-[#A9C356] cursor-pointer" />
                      <label htmlFor="rememberMe" className="text-sm text-[#2C2C2C]/60 cursor-pointer">{language === 'ko' ? '자동 로그인' : 'Remember me'}</label>
                    </div>
                    {status && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`text-sm text-center ${status.includes('✅') ? 'text-[#6F832E]' : status.includes('오류') || status.includes('Error') || status.includes('실패') || status.includes('failed') || status.includes('Invalid') || status.includes('틀렸') ? 'text-red-500' : 'text-[#8FA93C]'}`}>{status}</motion.p>
                    )}
                    <button onClick={handleSignIn} disabled={isLoading} className="w-full py-3 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isLoading ? (language === 'ko' ? '처리 중...' : 'Processing...') : (language === 'ko' ? '로그인' : 'Login')}
                    </button>
                    <div className="flex justify-center gap-4 text-sm">
                      <button onClick={() => switchView('findId')} className="text-[#2C2C2C]/40 hover:text-[#6F832E] transition-colors flex items-center gap-1"><Search size={14} />{language === 'ko' ? '아이디 찾기' : 'Find ID'}</button>
                      <span className="text-[#E6E6E0]">|</span>
                      <button onClick={() => switchView('findPassword')} className="text-[#2C2C2C]/40 hover:text-[#6F832E] transition-colors flex items-center gap-1"><KeyRound size={14} />{language === 'ko' ? '비밀번호 찾기' : 'Find Password'}</button>
                    </div>
                    <button onClick={() => switchView('signup')} className="w-full py-3 bg-[#EEF2E0] hover:bg-[#BBD07B]/30 rounded-xl font-semibold transition-colors text-[#6F832E]">
                      {language === 'ko' ? '계정이 없나요? 회원가입' : "Don't have an account? Sign Up"}
                    </button>
                  </>
                )}

                {/* ===== SIGNUP VIEW ===== */}
                {view === 'signup' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">{language === 'ko' ? '아이디' : 'Username'}</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                        <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder={language === 'ko' ? '아이디를 입력하세요' : 'Enter your username'} className="w-full pl-10 pr-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">{language === 'ko' ? '비밀번호' : 'Password'}</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={language === 'ko' ? '비밀번호를 입력하세요' : 'Enter your password'} className="w-full pl-10 pr-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">{language === 'ko' ? '이메일 (아이디/비밀번호 찾기에 필요)' : 'Email (needed for account recovery)'}</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" className="w-full pl-10 pr-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C]" />
                      </div>
                    </div>
                    {status && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`text-sm text-center ${status.includes('🎉') ? 'text-[#6F832E]' : status.includes('오류') || status.includes('Error') ? 'text-red-500' : 'text-[#8FA93C]'}`}>{status}</motion.p>
                    )}
                    <button onClick={handleSignUp} disabled={isLoading} className="w-full py-3 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isLoading ? (language === 'ko' ? '처리 중...' : 'Processing...') : (language === 'ko' ? '가입 완료' : 'Sign Up')}
                    </button>
                    <button onClick={() => switchView('login')} className="w-full py-3 bg-[#EEF2E0] hover:bg-[#BBD07B]/30 rounded-xl font-semibold transition-colors text-[#6F832E]">
                      {language === 'ko' ? '이미 계정이 있나요? 로그인' : 'Already have an account? Login'}
                    </button>
                  </>
                )}

                {/* ===== FIND ID VIEW ===== */}
                {view === 'findId' && (
                  <>
                    <p className="text-sm text-[#2C2C2C]/60 mb-2">{language === 'ko' ? '가입 시 등록한 이메일을 입력하면 아이디를 찾을 수 있습니다.' : 'Enter the email you registered with to find your ID.'}</p>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">{language === 'ko' ? '이메일' : 'Email'}</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleFindId()} placeholder="example@email.com" className="w-full pl-10 pr-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C]" />
                      </div>
                    </div>
                    {foundId && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-[#EEF2E0] border border-[#A9C356]/30 rounded-xl">
                        <p className="text-sm text-[#2C2C2C]/60 mb-1">{language === 'ko' ? '찾은 아이디:' : 'Your ID:'}</p>
                        <p className="text-lg font-bold text-[#6F832E]">{foundId}</p>
                      </motion.div>
                    )}
                    {status && !foundId && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`text-sm text-center ${status.includes('✅') ? 'text-[#6F832E]' : 'text-red-500'}`}>{status}</motion.p>
                    )}
                    <button onClick={handleFindId} disabled={isLoading} className="w-full py-3 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50">
                      {isLoading ? (language === 'ko' ? '찾는 중...' : 'Searching...') : (language === 'ko' ? '아이디 찾기' : 'Find ID')}
                    </button>
                    {foundId && (
                      <button onClick={() => { switchView('login'); setLoginId(foundId); }} className="w-full py-3 bg-[#EEF2E0] hover:bg-[#BBD07B]/30 rounded-xl font-semibold transition-colors text-[#6F832E]">
                        {language === 'ko' ? '로그인 하러 가기' : 'Go to Login'}
                      </button>
                    )}
                  </>
                )}

                {/* ===== FIND PASSWORD VIEW ===== */}
                {view === 'findPassword' && (
                  <>
                    <p className="text-sm text-[#2C2C2C]/60 mb-2">{language === 'ko' ? '아이디와 가입 시 등록한 이메일을 입력하면 임시 비밀번호가 생성됩니다.' : 'Enter your ID and registered email to get a temporary password.'}</p>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">{language === 'ko' ? '아이디' : 'Username'}</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                        <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder={language === 'ko' ? '아이디를 입력하세요' : 'Enter your username'} className="w-full pl-10 pr-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">{language === 'ko' ? '이메일' : 'Email'}</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleFindPassword()} placeholder="example@email.com" className="w-full pl-10 pr-4 py-3 bg-[#FAFAF8] border border-[#E6E6E0] rounded-xl focus:outline-none focus:border-[#A9C356] transition-colors text-[#2C2C2C]" />
                      </div>
                    </div>
                    {tempPassword && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-[#EEF2E0] border border-[#A9C356]/30 rounded-xl">
                        <p className="text-sm text-[#2C2C2C]/60 mb-1">{language === 'ko' ? '임시 비밀번호:' : 'Temporary Password:'}</p>
                        <p className="text-lg font-bold text-[#6F832E] font-mono select-all">{tempPassword}</p>
                        <p className="text-xs text-amber-600 mt-2">{language === 'ko' ? '⚠️ 로그인 후 반드시 비밀번호를 변경해주세요.' : '⚠️ Please change your password after logging in.'}</p>
                      </motion.div>
                    )}
                    {status && !tempPassword && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`text-sm text-center ${status.includes('✅') ? 'text-[#6F832E]' : 'text-red-500'}`}>{status}</motion.p>
                    )}
                    <button onClick={handleFindPassword} disabled={isLoading} className="w-full py-3 bg-[#A9C356] hover:bg-[#8FA93C] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50">
                      {isLoading ? (language === 'ko' ? '처리 중...' : 'Processing...') : (language === 'ko' ? '임시 비밀번호 발급' : 'Get Temporary Password')}
                    </button>
                    {tempPassword && (
                      <button onClick={() => switchView('login')} className="w-full py-3 bg-[#EEF2E0] hover:bg-[#BBD07B]/30 rounded-xl font-semibold transition-colors text-[#6F832E]">
                        {language === 'ko' ? '로그인 하러 가기' : 'Go to Login'}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}