
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/components/layout/MainLayout';
import WalletCard from '@/components/wallet/WalletCard';
import TransactionsList from '@/components/wallet/TransactionsList';
import AddFundsDialog from '@/components/wallet/AddFundsDialog';
import WithdrawDialog from '@/components/wallet/WithdrawDialog';
import KYCDialog from '@/components/wallet/KYCDialog';
import WithdrawalsList from '@/components/wallet/WithdrawalsList';
import ConvertPointsDialog from '@/components/wallet/ConvertPointsDialog';
import { walletService } from '@/services/WalletService';
import { Wallet, Transaction, FilterOptions, WithdrawalRequest, TransactionType } from '@/types/wallet';
import { AlertCircle } from 'lucide-react';

const WalletPage: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [showConvertPoints, setShowConvertPoints] = useState(false);
  const [filter, setFilter] = useState<TransactionType | 'all'>('all');

  // Check for success/cancelled URL params from payment flow
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const cancelled = urlParams.get('cancelled');
    
    if (success === 'true') {
      toast({
        title: "Payment Successful",
        description: "Funds have been added to your wallet",
        variant: "default",
      });
      // Clear the URL params
      window.history.replaceState({}, document.title, window.location.pathname);
      // Refetch data
      walletQuery.refetch();
    } else if (cancelled === 'true') {
      toast({
        title: "Payment Cancelled",
        description: "Your payment was cancelled",
        variant: "destructive",
      });
      // Clear the URL params
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [toast]);

  // Fetch wallet data
  const walletQuery = useQuery({
    queryKey: ['wallet'],
    queryFn: () => walletService.getWallet(),
    enabled: !!user,
  });

  // Fetch transactions data with filters
  const transactionsQuery = useQuery({
    queryKey: ['transactions', filter],
    queryFn: () => walletService.getTransactions({
      transactionType: filter
    } as FilterOptions),
    enabled: !!user,
  });

  // Fetch withdrawal requests
  const withdrawalsQuery = useQuery({
    queryKey: ['withdrawals'],
    queryFn: () => walletService.getWithdrawalRequests(),
    enabled: !!user,
  });

  const handleFilterChange = (value: string) => {
    setFilter(value as TransactionType | 'all');
  };

  const handleAddFunds = () => {
    setShowAddFunds(true);
  };

  const handleWithdraw = () => {
    if (!walletQuery.data?.is_kyc_verified) {
      setShowKYC(true);
    } else {
      setShowWithdraw(true);
    }
  };

  const handleConvertPoints = () => {
    if (walletQuery.data?.points && walletQuery.data.points >= 100) {
      setShowConvertPoints(true);
    } else {
      toast({
        title: "Not Enough Points",
        description: "You need at least 100 points to convert to cash",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>My Wallet</title>
      </Helmet>
      <div className="container max-w-screen-lg py-8">
        <h1 className="text-3xl font-bold mb-6">My Wallet</h1>
        
        {walletQuery.isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load wallet data. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 md:col-span-3 lg:col-span-1">
            {walletQuery.isLoading ? (
              <Card>
                <CardContent className="py-6">
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-2/3" />
                    <Skeleton className="h-12 w-full" />
                    <div className="flex space-x-3">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : walletQuery.data ? (
              <WalletCard 
                wallet={walletQuery.data as Wallet} 
                onAddFunds={handleAddFunds} 
                onWithdraw={handleWithdraw}
                onConvertPoints={handleConvertPoints}
              />
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No wallet found</AlertTitle>
                <AlertDescription>
                  We couldn't find a wallet for your account.
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-6">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions">
                {transactionsQuery.isLoading ? (
                  <Card>
                    <CardContent className="py-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <Skeleton className="h-6 w-1/4" />
                          <Skeleton className="h-6 w-1/4" />
                        </div>
                        {Array(5).fill(null).map((_, i) => (
                          <div key={i} className="flex justify-between items-center pb-4 border-b last:border-0">
                            <div className="flex items-center">
                              <Skeleton className="h-10 w-10 rounded-full mr-4" />
                              <div>
                                <Skeleton className="h-4 w-40 mb-2" />
                                <Skeleton className="h-3 w-24" />
                              </div>
                            </div>
                            <Skeleton className="h-5 w-16" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <TransactionsList 
                    transactions={transactionsQuery.data || []} 
                    onFilterChange={handleFilterChange}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="withdrawals">
                {withdrawalsQuery.isLoading ? (
                  <Card>
                    <CardContent className="py-6">
                      <div className="space-y-4">
                        {Array(3).fill(null).map((_, i) => (
                          <div key={i} className="flex justify-between items-center pb-4 border-b last:border-0">
                            <div>
                              <Skeleton className="h-5 w-32 mb-2" />
                              <Skeleton className="h-3 w-48" />
                            </div>
                            <Skeleton className="h-5 w-20" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <WithdrawalsList withdrawals={withdrawalsQuery.data || []} />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Add Funds Dialog */}
        <AddFundsDialog 
          open={showAddFunds} 
          onClose={() => setShowAddFunds(false)} 
        />
        
        {/* Withdraw Dialog */}
        {walletQuery.data && (
          <WithdrawDialog 
            open={showWithdraw} 
            onClose={() => setShowWithdraw(false)} 
            wallet={walletQuery.data as Wallet} 
          />
        )}
        
        {/* KYC Dialog */}
        <KYCDialog 
          open={showKYC} 
          onClose={() => setShowKYC(false)} 
        />
        
        {/* Convert Points Dialog */}
        {walletQuery.data && (
          <ConvertPointsDialog 
            open={showConvertPoints} 
            onClose={() => setShowConvertPoints(false)}
            wallet={walletQuery.data as Wallet}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default WalletPage;
