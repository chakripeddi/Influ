
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

interface UserReferral {
  user_id: string;
  referral_code: string;
  referrals_count: number;
  points_earned: number;
  created_at: Date;
  role: string;
  brand_referrals_count?: number;
  influencer_referrals_count?: number;
}

interface Referral {
  referrer_id: string;
  referred_id: string;
  referral_code: string;
  status: 'pending' | 'verified' | 'rejected';
  points_awarded: number;
  role: string;
}

type ReferralContextType = {
  referralCode: string | null;
  brandReferralCode: string | null;
  influencerReferralCode: string | null;
  referralsCount: number;
  brandReferralsCount: number;
  influencerReferralsCount: number;
  pointsEarned: number;
  userRole: string | null;
  loading: boolean;
  error: string | null;
  generateReferralLink: (type?: 'brand' | 'influencer') => string;
  copyReferralLink: (type?: 'brand' | 'influencer') => Promise<boolean>;
  shareViaEmail: (type?: 'brand' | 'influencer') => void;
  shareViaWhatsApp: (type?: 'brand' | 'influencer') => void;
  shareViaInstagram: (type?: 'brand' | 'influencer') => void;
};

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const ReferralProvider = ({ children }: { children: ReactNode }) => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [brandReferralCode, setBrandReferralCode] = useState<string | null>(null);
  const [influencerReferralCode, setInfluencerReferralCode] = useState<string | null>(null);
  const [referralsCount, setReferralsCount] = useState<number>(0);
  const [brandReferralsCount, setBrandReferralsCount] = useState<number>(0);
  const [influencerReferralsCount, setInfluencerReferralsCount] = useState<number>(0);
  const [pointsEarned, setPointsEarned] = useState<number>(0);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setLoading(true);
        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        // Get user role from metadata
        const userRole = user.user_metadata?.user_role || null;
        setUserRole(userRole);

        // Get referral data from database
        const { data: referralData, error: referralError } = await supabase
          .from('user_referrals')
          .select('referral_code, referrals_count, points_earned, role, brand_referrals_count, influencer_referrals_count, brand_referral_code, influencer_referral_code')
          .eq('user_id', user.id)
          .maybeSingle();

        if (referralError) {
          if (referralError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
            throw referralError;
          }
        }

        if (!referralData) {
          // Generate new referral codes for user
          const newReferralCode = generateUniqueCode(user.id);
          let brandCode = null;
          let influencerCode = null;

          // For campaigners, generate separate codes for brands and influencers
          if (userRole === 'campaigner') {
            brandCode = generateUniqueCode(user.id + '-brand');
            influencerCode = generateUniqueCode(user.id + '-influencer');
            setBrandReferralCode(brandCode);
            setInfluencerReferralCode(influencerCode);
          }

          setReferralCode(newReferralCode);

          // Store in database - Fix: Convert Date to ISO string
          await supabase
            .from('user_referrals')
            .insert({
              user_id: user.id,
              referral_code: newReferralCode,
              brand_referral_code: brandCode,
              influencer_referral_code: influencerCode,
              referrals_count: 0,
              brand_referrals_count: 0,
              influencer_referrals_count: 0,
              points_earned: 0,
              role: userRole,
              created_at: new Date().toISOString()
            });
        } else {
          // Use existing referral data
          setReferralCode(referralData.referral_code);
          setBrandReferralCode(referralData.brand_referral_code || null);
          setInfluencerReferralCode(referralData.influencer_referral_code || null);
          setReferralsCount(referralData.referrals_count || 0);
          setBrandReferralsCount(referralData.brand_referrals_count || 0);
          setInfluencerReferralsCount(referralData.influencer_referrals_count || 0);
          setPointsEarned(referralData.points_earned || 0);
        }

      } catch (err) {
        console.error('Error fetching referral data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load referral data');
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, []);

  // Generate a unique referral code based on user ID
  const generateUniqueCode = (userId: string): string => {
    // Simple implementation - in production, we'd want something more robust
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `REF-${randomPart}`;
  };

  const generateReferralLink = (type?: 'brand' | 'influencer'): string => {
    if (userRole === 'campaigner' && type === 'brand') {
      return `${window.location.origin}/signup?role=brand&ref=${brandReferralCode}`;
    } else if (userRole === 'campaigner' && type === 'influencer') {
      return `${window.location.origin}/signup?role=influencer&ref=${influencerReferralCode}`;
    } else {
      return `${window.location.origin}/signup?ref=${referralCode}`;
    }
  };

  const copyReferralLink = async (type?: 'brand' | 'influencer'): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(generateReferralLink(type));
      return true;
    } catch (err) {
      console.error('Failed to copy link:', err);
      return false;
    }
  };

  const shareViaEmail = (type?: 'brand' | 'influencer') => {
    const subject = type === 'brand'
      ? "Join Influencer Adsense as a Brand"
      : type === 'influencer'
        ? "Join Influencer Adsense as an Influencer"
        : "Join Influencer Adsense";

    const body = `Hey, I thought you might be interested in joining Influencer Adsense. Use my referral link to sign up: ${generateReferralLink(type)}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = (type?: 'brand' | 'influencer') => {
    const text = `Hey, I thought you might be interested in joining Influencer Adsense${type ? ` as a ${type}` : ''}. Use my referral link to sign up: ${generateReferralLink(type)}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareViaInstagram = (type?: 'brand' | 'influencer') => {
    // Instagram doesn't have a direct sharing API
    // We'll just copy to clipboard and notify the user
    copyReferralLink(type);
    alert('Link copied! Open Instagram and paste in your DM.');
  };

  const value = {
    referralCode,
    brandReferralCode,
    influencerReferralCode,
    referralsCount,
    brandReferralsCount,
    influencerReferralsCount,
    pointsEarned,
    userRole,
    loading,
    error,
    generateReferralLink,
    copyReferralLink,
    shareViaEmail,
    shareViaWhatsApp,
    shareViaInstagram,
  };

  return <ReferralContext.Provider value={value}>{children}</ReferralContext.Provider>;
};

export const useReferral = () => {
  const context = useContext(ReferralContext);
  if (context === undefined) {
    throw new Error('useReferral must be used within a ReferralProvider');
  }
  return context;
};
