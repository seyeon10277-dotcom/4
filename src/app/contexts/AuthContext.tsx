import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../lib/supabase';

interface User {
  id: number;
  login_id: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  autoLogin: boolean;
  setAutoLogin: (val: boolean) => void;
  signUp: (loginId: string, password: string, email?: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (loginId: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  findId: (email: string) => Promise<{ success: boolean; loginId?: string; error?: string }>;
  findPassword: (loginId: string, email: string) => Promise<{ success: boolean; tempPassword?: string; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoLogin, setAutoLogin] = useState(false);

  useEffect(() => {
    // 자동 로그인 설정 복원
    const savedAutoLogin = localStorage.getItem('klear_auto_login');
    if (savedAutoLogin === 'true') {
      setAutoLogin(true);
    }

    // 로컬 스토리지에서 사용자 정보 복원
    const savedUser = localStorage.getItem('klear_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (loginId: string, password: string, email?: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ login_id: loginId, password: password, email: email }])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signIn = async (loginId: string, password: string, rememberMe?: boolean) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('login_id', loginId)
        .eq('password', password)
        .single();

      if (error || !data) {
        return { success: false, error: 'INVALID_CREDENTIALS' }; // ← 변경
      }

      const userData = {
        id: data.id,
        login_id: data.login_id,
        email: data.email
      };

      setUser(userData);
      localStorage.setItem('klear_user', JSON.stringify(userData));

      // 자동 로그인 설정 저장
      if (rememberMe) {
        setAutoLogin(true);
        localStorage.setItem('klear_auto_login', 'true');
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signOut = () => {
    setUser(null);
    setAutoLogin(false);
    localStorage.removeItem('klear_user');
    localStorage.removeItem('klear_auto_login');
  };

  const findId = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('login_id')
        .eq('email', email)
        .single();

      if (error || !data) {
        return { success: false, error: 'EMAIL_NOT_FOUND' }; // ← 변경
      }

      return { success: true, loginId: data.login_id };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const findPassword = async (loginId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('login_id', loginId)
        .eq('email', email)
        .single();

      if (error || !data) {
        return { success: false, error: 'ACCOUNT_NOT_FOUND' }; // ← 변경
      }

      // 임시 비밀번호 생성
      const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();

      // DB에 임시 비밀번호 업데이트
      const { error: updateError } = await supabase
        .from('users')
        .update({ password: tempPassword })
        .eq('id', data.id);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      return { success: true, tempPassword };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, autoLogin, setAutoLogin, signUp, signIn, signOut, findId, findPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}