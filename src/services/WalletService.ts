
import { supabase } from '@/integrations/supabase/client';
import { 
  Wallet, 
  Transaction, 
  WithdrawalRequest, 
  FilterOptions,
  KYCDetails,
  AddFundsParams,
  WithdrawFundsParams,
  TransactionType
} from '@/types/wallet';
import { Json } from '@/integrations/supabase/types';

class WalletService {
  // Get user wallet information
  async getWallet(): Promise<Wallet | null> {
    const { data: walletData, error } = await supabase
      .from('wallets')
      .select('*')
      .limit(1)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching wallet:', error);
      return null;
    }
    
    return walletData as Wallet;
  }

  // Get user transactions with filters
  async getTransactions(filters?: FilterOptions): Promise<Transaction[]> {
    let query = supabase
      .from('wallet_transactions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (filters) {
      if (filters.transactionType && filters.transactionType !== 'all') {
        query = query.eq('transaction_type', filters.transactionType);
      }
      
      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      
      if (filters.startDate) {
        query = query.gte('created_at', filters.startDate.toISOString());
      }
      
      if (filters.endDate) {
        query = query.lte('created_at', filters.endDate.toISOString());
      }
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
    
    return data as Transaction[];
  }

  // Get user withdrawal requests
  async getWithdrawalRequests(): Promise<WithdrawalRequest[]> {
    const { data, error } = await supabase
      .from('withdrawal_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching withdrawal requests:', error);
      return [];
    }
    
    return data as WithdrawalRequest[];
  }

  // Add funds to wallet
  async addFunds({ amount, payment_method }: AddFundsParams): Promise<{ success: boolean; session_url?: string; error?: string }> {
    try {
      // Create a checkout session with Stripe/Razorpay/PayPal
      const { data, error } = await supabase.functions.invoke('create-payment-session', {
        body: { amount, payment_method }
      });
      
      if (error) throw error;
      
      return {
        success: true,
        session_url: data.url
      };
    } catch (error) {
      console.error('Error adding funds:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add funds'
      };
    }
  }

  // Request withdrawal of funds
  async requestWithdrawal(params: WithdrawFundsParams): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: wallet } = await supabase
        .from('wallets')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      if (!wallet) {
        return { success: false, error: 'Wallet not found' };
      }
      
      if ((wallet as Wallet).balance < params.amount) {
        return { success: false, error: 'Insufficient funds' };
      }
      
      if (!(wallet as Wallet).is_kyc_verified) {
        return { success: false, error: 'KYC verification required before withdrawal' };
      }
      
      // Get the user's ID from the auth context
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }
      
      const { error } = await supabase
        .from('withdrawal_requests')
        .insert({
          amount: params.amount,
          payment_method: params.payment_method,
          payment_details: params.payment_details as Json,
          user_id: user.id,
          wallet_id: (wallet as Wallet).id
        });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Error requesting withdrawal:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to request withdrawal'
      };
    }
  }

  // Submit KYC details
  async submitKycDetails(kycDetails: KYCDetails): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.functions.invoke('submit-kyc', {
        body: kycDetails
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Error submitting KYC details:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit KYC details'
      };
    }
  }

  // Convert points to cash
  async convertPointsToCash(points: number): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.functions.invoke('convert-points', {
        body: { points }
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Error converting points:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to convert points'
      };
    }
  }

  // Get formatted transaction description
  getTransactionDescription(transaction: Transaction): string {
    switch (transaction.transaction_type) {
      case 'credit':
        return 'Funds added to wallet';
      case 'debit':
        return 'Funds deducted from wallet';
      case 'referral_bonus':
        return 'Referral bonus earned';
      case 'campaign_spend':
        return 'Campaign payment';
      case 'campaign_earning':
        return 'Campaign earnings';
      case 'withdrawal':
        return 'Funds withdrawn';
      case 'points_conversion':
        return 'Points converted to cash';
      default:
        return transaction.description || 'Transaction';
    }
  }

  // Get transaction icon
  getTransactionIcon(type: TransactionType): string {
    switch (type) {
      case 'credit':
        return 'plus-circle';
      case 'debit':
        return 'minus-circle';
      case 'referral_bonus':
        return 'gift';
      case 'campaign_spend':
        return 'shopping-cart';
      case 'campaign_earning':
        return 'award';
      case 'withdrawal':
        return 'log-out';
      case 'points_conversion':
        return 'refresh-cw';
      default:
        return 'circle';
    }
  }

  // Get transaction color
  getTransactionColor(type: TransactionType): string {
    switch (type) {
      case 'credit':
      case 'referral_bonus':
      case 'campaign_earning':
      case 'points_conversion':
        return 'text-green-500';
      case 'debit':
      case 'campaign_spend':
      case 'withdrawal':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }
}

export const walletService = new WalletService();
