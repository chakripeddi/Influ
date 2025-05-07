
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, Wallet } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Wallet as WalletType } from '@/types/wallet';

interface WalletCardProps {
  wallet: WalletType;
  onAddFunds: () => void;
  onWithdraw: () => void;
  onConvertPoints?: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ 
  wallet, 
  onAddFunds, 
  onWithdraw,
  onConvertPoints 
}) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Wallet className="mr-2 h-6 w-6" />
            My Wallet
          </CardTitle>
          <div className="text-sm bg-black/20 px-3 py-1 rounded-full">
            {wallet.is_kyc_verified ? 'KYC Verified' : 'KYC Required'}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Available Balance</p>
            <h2 className="text-3xl font-bold flex items-center">
              <CircleDollarSign className="mr-1 h-7 w-7 text-green-500" />
              {formatCurrency(wallet.balance)}
            </h2>
          </div>
          
          {wallet.points > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Points Balance</p>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{wallet.points} points</h3>
                {onConvertPoints && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onConvertPoints}
                    disabled={wallet.points < 100}
                  >
                    Convert to Cash
                  </Button>
                )}
              </div>
              {wallet.points < 100 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Need {100 - wallet.points} more points to convert
                </p>
              )}
            </div>
          )}
          
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={onAddFunds}
            >
              Add Funds
            </Button>
            <Button 
              className="flex-1" 
              variant="outline"
              onClick={onWithdraw}
              disabled={wallet.balance <= 0 || !wallet.is_kyc_verified}
            >
              {wallet.is_kyc_verified ? 'Withdraw' : 'KYC Required'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
