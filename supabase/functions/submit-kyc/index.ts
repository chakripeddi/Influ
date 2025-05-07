
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase clients
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );
    
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Get the logged-in user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Get request body (KYC details)
    const kycDetails = await req.json();
    
    // Store KYC details in a secure way (this would typically involve encryption)
    // For this example, we'll just update the wallet with a verified status
    // In a real implementation, this would involve a review process
    
    // Update the user's wallet with KYC verification status
    const { error } = await supabaseAdmin
      .from('wallets')
      .update({ is_kyc_verified: true, updated_at: new Date().toISOString() })
      .eq('user_id', user.id);
    
    if (error) {
      throw new Error(`Failed to update KYC status: ${error.message}`);
    }

    // Create a notification about KYC submission
    await supabaseAdmin.rpc('add_notification', {
      p_user_id: user.id,
      p_type_id: 'kyc_submitted',
      p_title: 'KYC Verification Submitted',
      p_message: 'Your KYC verification has been submitted and is under review.',
      p_data: {}
    });

    return new Response(
      JSON.stringify({ success: true, message: 'KYC details submitted successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
