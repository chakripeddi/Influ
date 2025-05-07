
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Wallet, WithdrawFundsParams } from '@/types/wallet';
import { walletService } from '@/services/WalletService';
import { formatCurrency } from '@/lib/utils';

interface WithdrawDialogProps {
  open: boolean;
  onClose: () => void;
  wallet: Wallet;
}

const WithdrawDialog: React.FC<WithdrawDialogProps> = ({ open, onClose, wallet }) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number | ''>('');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'paypal' | 'upi'>('bank_transfer');
  const [paymentDetails, setPaymentDetails] = useState<{
    account_name?: string;
    account_number?: string;
    bank_name?: string;
    ifsc_code?: string;
    paypal_email?: string;
    upi_id?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Reset form when opened
  useEffect(() => {
    if (open) {
      setAmount('');
      setPaymentMethod('bank_transfer');
      setPaymentDetails({});
      setError(null);
    }
  }, [open]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setAmount('');
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setAmount(Math.min(numValue, wallet.balance));
    }
  };

  const handlePaymentDetailsChange = (key: string, value: string) => {
    setPaymentDetails(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async () => {
    if (amount === '' || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    // Validate payment details based on method
    if (paymentMethod === 'bank_transfer') {
      const { account_name, account_number, bank_name, ifsc_code } = paymentDetails;
      if (!account_name || !account_number || !bank_name || !ifsc_code) {
        setError('Please fill in all bank details');
        return;
      }
    } else if (paymentMethod === 'paypal') {
      if (!paymentDetails.paypal_email) {
        setError('Please enter a valid PayPal email');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!paymentDetails.upi_id) {
        setError('Please enter a valid UPI ID');
        return;
      }
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await walletService.requestWithdrawal({
        amount: amount as number,
        payment_method: paymentMethod,
        payment_details: paymentDetails
      } as WithdrawFundsParams);
      
      if (result.success) {
        toast({
          title: "Withdrawal Request Submitted",
          description: `Your withdrawal request for ${formatCurrency(amount as number)} has been submitted and is pending approval.`,
        });
        handleClose();
      } else {
        throw new Error(result.error || 'Failed to submit withdrawal request');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Withdrawal Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };
  
  const presetAmounts = [
    Math.min(10, wallet.balance),
    Math.min(25, wallet.balance),
    Math.min(50, wallet.balance),
    Math.min(100, wallet.balance),
    Math.floor(wallet.balance) // Full amount (rounded down)
  ].filter((value, index, self) => {
    return value > 0 && self.indexOf(value) === index; // Remove duplicates and zero values
  });

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Request a withdrawal from your wallet balance of {formatCurrency(wallet.balance)}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="withdraw-amount">Amount</Label>
            <Input
              id="withdraw-amount"
              type="number"
              step="0.01"
              min="0"
              max={wallet.balance}
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {presetAmounts.map((presetAmount) => (
                <Button
                  key={presetAmount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(presetAmount)}
                >
                  ${presetAmount}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label>Payment Method</Label>
            <Tabs defaultValue="bank_transfer" onValueChange={(v) => setPaymentMethod(v as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bank_transfer">Bank Transfer</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="upi">UPI</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bank_transfer" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="account_name">Account Holder Name</Label>
                    <Input 
                      id="account_name" 
                      value={paymentDetails.account_name || ''} 
                      onChange={(e) => handlePaymentDetailsChange('account_name', e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account_number">Account Number</Label>
                    <Input 
                      id="account_number" 
                      value={paymentDetails.account_number || ''} 
                      onChange={(e) => handlePaymentDetailsChange('account_number', e.target.value)} 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bank_name">Bank Name</Label>
                    <Input 
                      id="bank_name" 
                      value={paymentDetails.bank_name || ''} 
                      onChange={(e) => handlePaymentDetailsChange('bank_name', e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifsc_code">IFSC/Swift Code</Label>
                    <Input 
                      id="ifsc_code" 
                      value={paymentDetails.ifsc_code || ''} 
                      onChange={(e) => handlePaymentDetailsChange('ifsc_code', e.target.value)} 
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="paypal" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="paypal_email">PayPal Email</Label>
                  <Input 
                    id="paypal_email" 
                    type="email"
                    value={paymentDetails.paypal_email || ''} 
                    onChange={(e) => handlePaymentDetailsChange('paypal_email', e.target.value)} 
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="upi" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="upi_id">UPI ID</Label>
                  <Input 
                    id="upi_id" 
                    value={paymentDetails.upi_id || ''} 
                    placeholder="username@bank"
                    onChange={(e) => handlePaymentDetailsChange('upi_id', e.target.value)} 
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {error && (
            <div className="text-sm font-medium text-destructive">{error}</div>
          )}
          
          <div className="text-sm text-muted-foreground">
            <p>Note: Withdrawal requests are processed within 1-3 business days.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || amount === '' || (amount as number) <= 0}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Request Withdrawal'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawDialog;
