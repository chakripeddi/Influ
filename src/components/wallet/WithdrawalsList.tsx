
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { formatCurrency } from '@/lib/utils';
import { WithdrawalRequest } from '@/types/wallet';

interface WithdrawalsListProps {
  withdrawals: WithdrawalRequest[];
}

const WithdrawalsList: React.FC<WithdrawalsListProps> = ({ withdrawals }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Approved</Badge>;
      case 'processed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Processed</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'paypal':
        return 'PayPal';
      case 'upi':
        return 'UPI';
      default:
        return method;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Withdrawal Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {withdrawals.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No withdrawal requests found</p>
            </div>
          ) : (
            withdrawals.map(withdrawal => (
              <div 
                key={withdrawal.id} 
                className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{formatCurrency(withdrawal.amount)}</h3>
                    <span className="mx-2">•</span>
                    {getStatusBadge(withdrawal.status)}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span>{formatPaymentMethod(withdrawal.payment_method)}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDistanceToNow(new Date(withdrawal.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
                {withdrawal.admin_notes && (
                  <div className="text-sm text-muted-foreground max-w-[50%] text-right">
                    {withdrawal.admin_notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WithdrawalsList;
