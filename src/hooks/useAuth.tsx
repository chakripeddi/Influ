
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (credentials: { email: string, password: string }) => Promise<{ error: Error | null }>;
  signUp: (credentials: { email: string, password: string }) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Listen for changes
      const { data: { subscription } } = await supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      
      return () => {
        subscription?.unsubscribe();
      };
    };
    
    checkUser();
  }, []);

  const signIn = async (credentials: { email: string, password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });
    return { error };
  };

  const signUp = async (credentials: { email: string, password: string }) => {
    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
