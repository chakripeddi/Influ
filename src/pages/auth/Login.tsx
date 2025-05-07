import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from "@/components/ui/alert";
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Define the test user type
interface TestUser {
  id: string;
  email: string;
  password: string;
  role: string;
  referral_code: string;
}

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testUsers, setTestUsers] = useState<TestUser[]>([]);
  const [loadingTestUsers, setLoadingTestUsers] = useState(false);
  
  // Fetch test users on component mount
  useEffect(() => {
    const fetchTestUsers = async () => {
      setLoadingTestUsers(true);
      try {
        const { data, error } = await supabase
          .from('test_users')
          .select('*');
          
        if (error) {
          console.error('Error fetching test users:', error);
          return;
        }
        
        if (data) {
          setTestUsers(data);
        }
      } catch (err) {
        console.error('Failed to fetch test users:', err);
      } finally {
        setLoadingTestUsers(false);
      }
    };
    
    fetchTestUsers();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Try to sign in with Supabase authentication
      const { error } = await signIn({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      // Login successful
      toast({
        title: "Login successful",
        description: "Welcome back to Influencer Adsense!",
      });
      
      // Redirect to home page after successful login
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Invalid email or password. Please try again.'
      );
      
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleLoginWithTestUser = async (testUser: TestUser) => {
    setEmail(testUser.email);
    setPassword(testUser.password);
    setError(null);
    setLoading(true);
    
    try {
      const { error } = await signIn({
        email: testUser.email,
        password: testUser.password
      });
      
      if (error) {
        throw error;
      }
      
      // Login successful
      toast({
        title: "Test Login Successful",
        description: `Logged in as ${testUser.role} user`,
      });
      
      // Redirect to home page after successful login
      navigate('/');
    } catch (err) {
      console.error('Test login error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Invalid test credentials. Please try again.'
      );
      
      toast({
        title: "Test login failed",
        description: `Could not login with ${testUser.role} test account.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
      
      // The redirect will be handled by the auth callback
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setError('Social login failed. Please try again or use email/password.');
      toast({
        title: "Login failed",
        description: "Could not authenticate with social provider.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <div className="container max-w-md py-16">
        <Card className="mx-auto w-full">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Log in to your account</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  placeholder="name@example.com" 
                  required 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-brand-purple hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  required 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </form>
            
            {testUsers.length > 0 && (
              <div className="pt-4">
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or login with test credentials
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {testUsers.map((user) => (
                    <Button
                      key={user.id}
                      variant="outline"
                      type="button"
                      className="w-full text-left flex justify-between items-center"
                      onClick={() => handleLoginWithTestUser(user)}
                      disabled={loading || loadingTestUsers}
                    >
                      <span className="font-medium">{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                type="button" 
                className="w-full"
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
              >
                Google
              </Button>
              <Button 
                variant="outline" 
                type="button" 
                className="w-full"
                onClick={() => handleSocialLogin('facebook')}
                disabled={loading}
              >
                Facebook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-center text-muted-foreground mt-2">
              Don't have an account yet?{" "}
              <Link to="/signup" className="text-brand-purple hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Login;
