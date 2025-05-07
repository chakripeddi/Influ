
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
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Wallet } from '@/types/wallet';
import { walletService } from '@/services/WalletService';

interface ConvertPointsDialogProps {
  open: boolean;
  onClose: () => void;
  wallet: Wallet;
}

const ConvertPointsDialog: React.FC<ConvertPointsDialogProps> = ({ open, onClose, wallet }) => {
  const { toast } = useToast();
  const [points, setPoints] = useState<number>(100);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate the cash value (conversion rate: 1 point = $0.1)
  const conversionRate = 0.1;
  const cashValue = points * conversionRate;
  
  // Minimum points needed for conversion
  const minPoints = 100;
  // Maximum points the user can convert
  const maxPoints = wallet.points;
  
  // Reset points when dialog opens
  React.useEffect(() => {
    if (open) {
      setPoints(Math.min(100, maxPoints));
      setError(null);
    }
  }, [open, maxPoints]);

  const handlePointsChange = (value: number[]) => {
    setPoints(value[0]);
  };

  const handleConvert = async () => {
    if (points < minPoints) {
      setError(`You need at least ${minPoints} points to convert`);
      return;
    }
    
    if (points > maxPoints) {
      setError(`You only have ${maxPoints} points available`);
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await walletService.convertPointsToCash(points);
      
      if (result.success) {
        toast({
          title: "Points Converted",
          description: `Successfully converted ${points} points to $${cashValue.toFixed(2)}`,
        });
        onClose();
      } else {
        throw new Error(result.error || 'Failed to convert points');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Conversion Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Convert Points to Cash</DialogTitle>
          <DialogDescription>
            Convert your points to cash that will be added to your wallet balance.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Points to Convert</Label>
              <span className="text-sm font-medium">{points} points</span>
            </div>
            <Slider
              defaultValue={[Math.min(100, maxPoints)]}
              max={maxPoints}
              min={0}
              step={10}
              value={[points]}
              onValueChange={handlePointsChange}
              disabled={maxPoints < minPoints}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0</span>
              <span>{maxPoints}</span>
            </div>
          </div>
          
          <div className="space-y-2 bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm">Points</span>
              <span className="font-medium">{points}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Conversion Rate</span>
              <span className="font-medium">1 point = ${conversionRate.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">Cash Value</span>
              <span className="font-bold">${cashValue.toFixed(2)}</span>
            </div>
          </div>
          
          {error && (
            <div className="text-sm font-medium text-destructive">{error}</div>
          )}
          
          {maxPoints < minPoints && (
            <div className="text-sm text-amber-600">
              You need at least {minPoints} points to convert to cash. You currently have {maxPoints} points.
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConvert} 
            disabled={isLoading || points < minPoints || points > maxPoints}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              'Convert Points'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConvertPointsDialog;
