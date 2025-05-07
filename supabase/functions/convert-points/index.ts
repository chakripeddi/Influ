
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

    // Get the points to convert
    const { points } = await req.json();
    
    if (!points || points <= 0) {
      throw new Error('Invalid points amount');
    }

    // Fetch user's wallet
    const { data: wallet, error: walletError } = await supabaseClient
      .from('wallets')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (walletError || !wallet) {
      throw new Error('Wallet not found');
    }
    
    if (wallet.points < points) {
      throw new Error('Insufficient points');
    }
    
    // Convert points to cash (1 point = $0.1)
    const conversionRate = 0.1;
    const cashAmount = points * conversionRate;
    
    // Call the add_wallet_transaction function to handle the conversion
    const { data, error } = await supabaseAdmin.rpc('add_wallet_transaction', {
      p_user_id: user.id,
      p_amount: cashAmount,
      p_transaction_type: 'points_conversion',
      p_description: `Converted ${points} points to $${cashAmount.toFixed(2)}`,
      p_points: -points
    });
    
    if (error) {
      throw new Error(`Failed to convert points: ${error.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        points_converted: points, 
        cash_amount: cashAmount,
        message: `Successfully converted ${points} points to $${cashAmount.toFixed(2)}` 
      }),
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
