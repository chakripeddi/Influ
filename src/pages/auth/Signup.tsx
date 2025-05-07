import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import MainLayout from '@/components/layout/MainLayout';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UserReferral {
  user_id: string;
  referral_code: string;
}

interface Referral {
  referrer_id: string;
  referred_id: string;
  referral_code: string;
  referral_type: string;
  status: 'pending' | 'verified' | 'rejected';
  points_awarded: number;
  role: string;
}

const Signup = () => {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  const referralCode = searchParams.get('ref');
  const [role, setRole] = useState<string>(roleParam || 'influencer');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isReferralValid, setIsReferralValid] = useState<boolean | null>(null);
  const [referralChecked, setReferralChecked] = useState<boolean>(false);
  const [referralType, setReferralType] = useState<string>('general');
  const [referrerId, setReferrerId] = useState<string | null>(null);

  useEffect(() => {
    const checkReferralCode = async () => {
      if (referralCode) {
        try {
          // Check if it's a brand or influencer specific referral code
          const { data: brandData } = await supabase
            .from('user_referrals')
            .select('user_id')
            .eq('brand_referral_code', referralCode)
            .maybeSingle();
          
          if (brandData) {
            setIsReferralValid(true);
            setReferralType('brand');
            setReferrerId(brandData.user_id);
            setReferralChecked(true);
            return;
          }
          
          const { data: influencerData } = await supabase
            .from('user_referrals')
            .select('user_id')
            .eq('influencer_referral_code', referralCode)
            .maybeSingle();
          
          if (influencerData) {
            setIsReferralValid(true);
            setReferralType('influencer');
            setReferrerId(influencerData.user_id);
            setReferralChecked(true);
            return;
          }
          
          // Check if it's a general referral code
          const { data: generalData } = await supabase
            .from('user_referrals')
            .select('user_id')
            .eq('referral_code', referralCode)
            .maybeSingle();
          
          if (generalData) {
            setIsReferralValid(true);
            setReferralType('general');
            setReferrerId(generalData.user_id);
            setReferralChecked(true);
            return;
          }

          setIsReferralValid(false);
          setReferralChecked(true);
        } catch (error) {
          console.error('Error checking referral:', error);
          setIsReferralValid(false);
          setReferralChecked(true);
        }
      }
    };

    checkReferralCode();
  }, [referralCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    try {
      // Register the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            user_role: role,
            referred_by: referralCode, // Store referral code if exists
          },
        },
      });

      if (error) {
        throw error;
      }

      // If sign-up successful and referred by someone, update referrer's stats
      if (data?.user && referralCode && isReferralValid && referrerId) {
        const pointsValue = role === 'brand' ? 100 : 50;

        await supabase
          .from('referrals')
          .insert({
            referrer_id: referrerId,
            referred_id: data.user.id,
            referral_code: referralCode,
            referral_type: referralType,
            status: 'pending', // Will be updated to 'verified' after email verification
            points_awarded: 0, // Will be updated after verification to pointsValue
            role: role,
          });
      }

      toast({
        title: "Account created",
        description: `Your ${role} account has been created successfully!`,
      });

      setTimeout(() => navigate(`/onboarding/${role}`), 1500);
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/onboarding/${role}`,
          queryParams: {
            user_role: role,
            referred_by: referralCode || '',
            referral_type: referralType || '',
          },
        },
      });

      if (error) {
        console.error('Google signup error:', error);
        toast({
          title: "Google signup failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Google signup error:', error);
      toast({
        title: "Google signup failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="container max-w-md py-16">
        <Card className="mx-auto w-full">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your information to get started
            </CardDescription>

            {referralCode && referralChecked && (
              <Alert className={`mt-2 ${isReferralValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <AlertDescription className={`text-sm ${isReferralValid ? 'text-green-800' : 'text-red-800'}`}>
                  {isReferralValid
                    ? 'You were referred! You\'ll both receive rewards after signup.'
                    : 'Invalid referral code. You can still sign up, but no referral bonus will be applied.'}
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="name@example.com" required type="email" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" required type="password" />
              </div>

              <div className="space-y-2">
                <Label>I am a:</Label>
                <RadioGroup defaultValue={role} onValueChange={setRole} className="flex gap-4 flex-wrap">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="brand" id="brand" />
                    <Label htmlFor="brand" className="cursor-pointer">Brand</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="influencer" id="influencer" />
                    <Label htmlFor="influencer" className="cursor-pointer">Influencer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="campaigner" id="campaigner" />
                    <Label htmlFor="campaigner" className="cursor-pointer">Campaigner</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full">Sign up</Button>
            </form>

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
                onClick={handleGoogleSignup}
              >
                Google
              </Button>
              <Button variant="outline" type="button" className="w-full">Facebook</Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-center text-muted-foreground mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-brand-purple hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Signup;
