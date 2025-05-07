
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const testUsers = [
      { 
        email: 'brand@test.com', 
        password: 'Test123!', 
        role: 'brand',
        referral_code: 'BRAND_TEST_REF',
        metadata: { user_role: 'brand' } 
      },
      { 
        email: 'influencer@test.com', 
        password: 'Test123!', 
        role: 'influencer',
        referral_code: 'INFLUENCER_TEST_REF',
        metadata: { user_role: 'influencer' } 
      },
      { 
        email: 'campaigner@test.com', 
        password: 'Test123!', 
        role: 'campaigner',
        referral_code: 'CAMPAIGNER_TEST_REF',
        metadata: { user_role: 'campaigner' } 
      }
    ]

    const results = []

    for (const user of testUsers) {
      // First, check if the user already exists in test_users table
      const { data: existingTestUser } = await supabase
        .from('test_users')
        .select('email')
        .eq('email', user.email)
        .maybeSingle();

      if (existingTestUser) {
        results.push({ email: user.email, status: 'User already exists' });
        continue;
      }
      
      // Create the user
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true, // This automatically confirms the email
        user_metadata: user.metadata
      });

      if (error) {
        results.push({ email: user.email, error: error.message })
        continue
      }

      if (data.user) {
        // Insert referral data
        const { error: referralError } = await supabase
          .from('user_referrals')
          .insert({
            user_id: data.user.id,
            role: user.role,
            referral_code: user.referral_code,
            ...(user.role === 'brand' && { brand_referral_code: user.referral_code }),
            ...(user.role === 'influencer' && { influencer_referral_code: user.referral_code })
          })

        // Save test user credentials
        const { error: testUserError } = await supabase
          .from('test_users')
          .insert({
            email: user.email,
            password: user.password,
            role: user.role,
            referral_code: user.referral_code
          })

        if (referralError || testUserError) {
          results.push({ 
            email: user.email, 
            referralError: referralError?.message, 
            testUserError: testUserError?.message 
          })
        } else {
          results.push({ email: user.email, status: 'Created successfully with email confirmed' })
        }
      }
    }

    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
})
