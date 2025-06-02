
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MoreVertical,
  Eye,
  Edit,
  Lock,
  Unlock,
  TrendingUp,
  Calendar,
  CreditCard
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Account {
  id: string;
  iban: string;
  customerName: string;
  accountType: string;
  currency: string;
  balance: string;
  status: string;
  openDate: string;
  lastTransaction: string;
  monthlyTransactions: number;
  avgMonthlyBalance: string;
}

interface AccountCardProps {
  account: Account;
}

const AccountCard = ({ account }: AccountCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط':
        return 'bg-green-100 text-green-800';
      case 'مجمد':
        return 'bg-yellow-100 text-yellow-800';
      case 'مغلق':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCurrencyColor = (currency: string) => {
    const colors = {
      'SYP': 'bg-blue-100 text-blue-800',
      'USD': 'bg-green-100 text-green-800',
      'EUR': 'bg-purple-100 text-purple-800',
      'TRY': 'bg-red-100 text-red-800'
    };
    return colors[currency as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatBalance = (balance: string, currency: string) => {
    const symbols = { SYP: '₺', USD: '$', EUR: '€', TRY: '₺' };
    return `${balance} ${symbols[currency as keyof typeof symbols] || currency}`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Account Info */}
          <div className="lg:col-span-4">
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{account.id}</h3>
                  <Badge className={getStatusColor(account.status)}>
                    {account.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{account.iban}</p>
                <p className="text-sm font-medium text-gray-800">{account.customerName}</p>
                <p className="text-xs text-gray-500">{account.accountType}</p>
              </div>
            </div>
          </div>

          {/* Balance and Currency */}
          <div className="lg:col-span-2">
            <div className="text-center">
              <Badge className={getCurrencyColor(account.currency)}>
                {account.currency}
              </Badge>
              <p className="text-lg font-bold text-gray-900 mt-1">
                {formatBalance(account.balance, account.currency)}
              </p>
              <p className="text-xs text-gray-500">الرصيد الحالي</p>
            </div>
          </div>

          {/* Stats */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{account.monthlyTransactions}</p>
                <p className="text-xs text-gray-500">معاملة شهرية</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">
                  {formatBalance(account.avgMonthlyBalance, account.currency)}
                </p>
                <p className="text-xs text-gray-500">متوسط الرصيد</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="lg:col-span-2">
            <div className="space-y-1">
              <div className="flex items-center text-xs text-gray-600">
                <Calendar className="h-3 w-3 ml-1" />
                افتتح: {account.openDate}
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <TrendingUp className="h-3 w-3 ml-1" />
                آخر معاملة: {account.lastTransaction}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="lg:col-span-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  تعديل الحساب
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  تاريخ المعاملات
                </DropdownMenuItem>
                {account.status === 'نشط' ? (
                  <DropdownMenuItem className="text-yellow-600">
                    <Lock className="h-4 w-4 mr-2" />
                    تجميد الحساب
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="text-green-600">
                    <Unlock className="h-4 w-4 mr-2" />
                    إلغاء التجميد
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
