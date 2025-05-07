
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { KYCDetails } from '@/types/wallet';
import { walletService } from '@/services/WalletService';

interface KYCDialogProps {
  open: boolean;
  onClose: () => void;
}

const KYCDialog: React.FC<KYCDialogProps> = ({ open, onClose }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<KYCDetails>({
    full_name: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    id_type: 'national_id',
    id_number: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSelectChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    const requiredFields = ['full_name', 'address', 'city', 'state', 'postal_code', 'country', 'id_number'];
    for (const field of requiredFields) {
      if (!formData[field as keyof KYCDetails]) {
        setError(`${field.replace('_', ' ')} is required`);
        return;
      }
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await walletService.submitKycDetails(formData);
      
      if (result.success) {
        toast({
          title: "KYC Verification Submitted",
          description: "Your KYC details have been submitted and are under review.",
        });
        onClose();
      } else {
        throw new Error(result.error || 'Failed to submit KYC details');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "KYC Submission Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>KYC Verification</DialogTitle>
          <DialogDescription>
            Complete KYC verification to enable withdrawals from your wallet.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input 
              id="full_name" 
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder="As per your ID document"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input 
                id="state" 
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postal_code">Postal Code</Label>
              <Input 
                id="postal_code" 
                value={formData.postal_code}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country" 
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id_type">ID Type</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('id_type', value)} 
                defaultValue={formData.id_type}
              >
                <SelectTrigger id="id_type">
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="drivers_license">Driver's License</SelectItem>
                  <SelectItem value="national_id">National ID</SelectItem>
                  <SelectItem value="tax_id">Tax ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="id_number">ID Number</Label>
              <Input 
                id="id_number" 
                value={formData.id_number}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          {/* Bank details section */}
          <div className="border-t pt-4 mt-4">
            <h3 className="text-sm font-medium mb-4">Banking Details (Optional)</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bank_name">Bank Name</Label>
                <Input 
                  id="bank_name" 
                  value={formData.bank_name || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank_account_number">Account Number</Label>
                <Input 
                  id="bank_account_number" 
                  value={formData.bank_account_number || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <Label htmlFor="bank_routing_number">Routing Number / IFSC</Label>
              <Input 
                id="bank_routing_number" 
                value={formData.bank_routing_number || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2 mt-4">
              <Label htmlFor="upi_id">UPI ID (If applicable)</Label>
              <Input 
                id="upi_id" 
                value={formData.upi_id || ''}
                onChange={handleInputChange}
                placeholder="username@bank"
              />
            </div>
          </div>
          
          {error && (
            <div className="text-sm font-medium text-destructive">{error}</div>
          )}
          
          <div className="text-sm text-muted-foreground">
            <p>Note: KYC verification can take 1-3 business days to process.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit KYC Details'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default KYCDialog;
