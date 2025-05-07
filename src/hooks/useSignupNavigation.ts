
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useSignupNavigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (email: string, password: string, userType: 'brand' | 'influencer') => {
    setIsLoading(true);
    try {
      const { error } = await signUp({ email, password });
      
      if (error) throw error;
      
      // Show success message
      toast.success("Account created successfully! Please check your email to verify your account.");
      
      // Navigate to the appropriate setup page based on user type
      if (userType === 'brand') {
        navigate('/brand/setup');
      } else {
        navigate('/influencer/profile-setup');
      }
      
      return true;
    } catch (err) {
      console.error('Signup error:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to create account');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSignup
  };
};
