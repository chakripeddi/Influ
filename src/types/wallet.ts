
export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  points: number;
  currency: string;
  is_kyc_verified: boolean;
  created_at: string;
  updated_at: string;
}

export type TransactionType = 'credit' | 'debit' | 'referral_bonus' | 'campaign_spend' | 'campaign_earning' | 'withdrawal' | 'points_conversion';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface Transaction {
  id: string;
  wallet_id: string;
  user_id: string;
  amount: number;
  points: number;
  transaction_type: TransactionType;
  status: TransactionStatus;
  description: string | null;
  reference_id: string | null;
  created_at: string;
  updated_at: string;
}

export type WithdrawalStatus = 'pending' | 'approved' | 'rejected' | 'processed';

export interface WithdrawalRequest {
  id: string;
  user_id: string;
  wallet_id: string;
  amount: number;
  payment_method: string;
  payment_details: Record<string, any>;
  status: WithdrawalStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface KYCDetails {
  full_name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  id_type: 'passport' | 'drivers_license' | 'national_id' | 'tax_id';
  id_number: string;
  bank_name?: string;
  bank_account_number?: string;
  bank_routing_number?: string;
  upi_id?: string;
}

export interface AddFundsParams {
  amount: number;
  payment_method: 'credit_card' | 'paypal' | 'stripe' | 'razorpay';
}

export interface WithdrawFundsParams {
  amount: number;
  payment_method: 'bank_transfer' | 'paypal' | 'upi';
  payment_details: {
    account_name?: string;
    account_number?: string;
    bank_name?: string;
    ifsc_code?: string;
    upi_id?: string;
    paypal_email?: string;
  };
}

export interface FilterOptions {
  transactionType?: TransactionType | 'all';
  startDate?: Date;
  endDate?: Date;
  status?: TransactionStatus | 'all';
}
