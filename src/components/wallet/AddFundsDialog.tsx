
import React, { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { AddFundsParams } from '@/types/wallet';
import { walletService } from '@/services/WalletService';

interface AddFundsDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddFundsDialog: React.FC<AddFundsDialogProps> = ({ open, onClose }) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number | ''>('');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypal' | 'stripe' | 'razorpay'>('stripe');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setAmount('');
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setAmount(numValue);
    }
  };

  const handleSubmit = async () => {
    if (amount === '' || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await walletService.addFunds({
        amount: amount as number,
        payment_method: paymentMethod
      } as AddFundsParams);
      
      if (result.success && result.session_url) {
        window.location.href = result.session_url;
      } else {
        throw new Error(result.error || 'Failed to process payment');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setAmount('');
    setPaymentMethod('stripe');
    setError(null);
    onClose();
  };

  const presetAmounts = [10, 25, 50, 100, 500];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Funds to Wallet</DialogTitle>
          <DialogDescription>
            Choose an amount and payment method to add funds to your wallet.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
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
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as any)}
              className="grid grid-cols-2 gap-4"
            >
              <Card className={`cursor-pointer border-2 ${paymentMethod === 'stripe' ? 'border-primary' : 'border-border'}`}>
                <CardHeader className="p-3">
                  <RadioGroupItem value="stripe" id="stripe" className="sr-only" />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
                    alt="Stripe" 
                    className="h-6 w-auto mx-auto"
                  />
                </CardHeader>
              </Card>
              
              <Card className={`cursor-pointer border-2 ${paymentMethod === 'paypal' ? 'border-primary' : 'border-border'}`}>
                <CardHeader className="p-3">
                  <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png" 
                    alt="PayPal" 
                    className="h-6 w-auto mx-auto"
                  />
                </CardHeader>
              </Card>
              
              <Card className={`cursor-pointer border-2 ${paymentMethod === 'razorpay' ? 'border-primary' : 'border-border'}`}>
                <CardHeader className="p-3">
                  <RadioGroupItem value="razorpay" id="razorpay" className="sr-only" />
                  <img 
                    src="https://razorpay.com/assets/razorpay-glyph.svg" 
                    alt="Razorpay" 
                    className="h-6 w-auto mx-auto"
                  />
                </CardHeader>
              </Card>
              
              <Card className={`cursor-pointer border-2 ${paymentMethod === 'credit_card' ? 'border-primary' : 'border-border'}`}>
                <CardHeader className="p-3">
                  <RadioGroupItem value="credit_card" id="credit_card" className="sr-only" />
                  <div className="text-center font-medium">Credit Card</div>
                </CardHeader>
              </Card>
            </RadioGroup>
          </div>
          
          {error && (
            <div className="text-sm font-medium text-destructive">{error}</div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Add Funds'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFundsDialog;
