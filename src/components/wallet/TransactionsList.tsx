
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Gift, 
  LogOut, 
  MinusCircle, 
  PlusCircle, 
  RefreshCw, 
  Search, 
  ShoppingCart 
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow } from 'date-fns';
import { formatCurrency } from '@/lib/utils';
import { Transaction, TransactionType } from '@/types/wallet';

interface TransactionsListProps {
  transactions: Transaction[];
  onFilterChange: (filterValue: string) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTransactions = transactions.filter(transaction => {
    if (!searchTerm) return true;
    
    return (
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transaction_type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case 'credit':
        return <PlusCircle className="h-5 w-5 text-green-500" />;
      case 'debit':
        return <MinusCircle className="h-5 w-5 text-red-500" />;
      case 'referral_bonus':
        return <Gift className="h-5 w-5 text-purple-500" />;
      case 'campaign_spend':
        return <ShoppingCart className="h-5 w-5 text-red-500" />;
      case 'campaign_earning':
        return <Award className="h-5 w-5 text-green-500" />;
      case 'withdrawal':
        return <LogOut className="h-5 w-5 text-red-500" />;
      case 'points_conversion':
        return <RefreshCw className="h-5 w-5 text-blue-500" />;
      default:
        return <PlusCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTransactionDescription = (transaction: Transaction): string => {
    if (transaction.description) return transaction.description;
    
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
        return 'Transaction';
    }
  };
  
  const getAmountTextClass = (type: TransactionType) => {
    switch (type) {
      case 'credit':
      case 'referral_bonus':
      case 'campaign_earning':
      case 'points_conversion':
        return 'text-green-600 font-semibold';
      case 'debit':
      case 'campaign_spend':
      case 'withdrawal':
        return 'text-red-600 font-semibold';
      default:
        return 'text-gray-700 font-semibold';
    }
  };

  const getAmountPrefix = (type: TransactionType) => {
    switch (type) {
      case 'credit':
      case 'referral_bonus':
      case 'campaign_earning':
      case 'points_conversion':
        return '+';
      case 'debit':
      case 'campaign_spend':
      case 'withdrawal':
        return '-';
      default:
        return '';
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Transactions</CardTitle>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search transactions..." 
              className="pl-8 w-full md:w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select defaultValue="all" onValueChange={onFilterChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="referral_bonus">Referral</SelectItem>
                <SelectItem value="campaign_spend">Campaign Spend</SelectItem>
                <SelectItem value="campaign_earning">Campaign Earning</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No transactions found</p>
            </div>
          ) : (
            filteredTransactions.map(transaction => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    {getTransactionIcon(transaction.transaction_type)}
                  </div>
                  <div>
                    <h3 className="font-medium">{getTransactionDescription(transaction)}</h3>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <span>{formatDistanceToNow(new Date(transaction.created_at), { addSuffix: true })}</span>
                      <span className="mx-2">•</span>
                      {getStatusBadge(transaction.status)}
                      {transaction.points !== 0 && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{transaction.points > 0 ? '+' : ''}{transaction.points} points</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className={getAmountTextClass(transaction.transaction_type)}>
                  {getAmountPrefix(transaction.transaction_type)}{formatCurrency(Math.abs(transaction.amount))}
                </div>
              </div>
            ))
          )}
          
          {transactions.length > 5 && (
            <div className="pt-4 text-center">
              <Button variant="outline">View All Transactions</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsList;
