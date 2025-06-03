
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MoreVertical,
  Eye,
  Edit,
  Lock,
  Unlock,
  CreditCard,
  DollarSign,
  Calendar,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Account {
  id: string;
  accountNumber: string;
  iban: string;
  customerName: string;
  accountType: string;
  currency: string;
  balance: string;
  status: string;
  openDate: string;
  lastActivity: string;
  branchCode: string;
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

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'جاري':
        return 'bg-blue-100 text-blue-800';
      case 'توفير':
        return 'bg-green-100 text-green-800';
      case 'استثماري':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{account.accountNumber}</h3>
              <p className="text-sm text-gray-600 font-mono">{account.iban}</p>
            </div>
          </div>
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
                <DollarSign className="h-4 w-4 mr-2" />
                تاريخ المعاملات
              </DropdownMenuItem>
              {account.status === 'نشط' ? (
                <DropdownMenuItem className="text-red-600">
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
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status and Type Badges */}
        <div className="flex gap-2">
          <Badge className={getStatusColor(account.status)}>
            {account.status}
          </Badge>
          <Badge className={getAccountTypeColor(account.accountType)}>
            {account.accountType}
          </Badge>
          <Badge variant="outline">
            {account.currency}
          </Badge>
        </div>

        {/* Customer Info */}
        <div className="flex items-center text-sm text-gray-600">
          <User className="h-4 w-4 ml-2" />
          {account.customerName}
        </div>

        {/* Balance */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">الرصيد الحالي</p>
          <p className="text-2xl font-bold text-gray-900">{account.balance}</p>
        </div>

        {/* Account Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 ml-2" />
            <span className="font-medium ml-2">تاريخ الفتح:</span>
            {account.openDate}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 ml-2" />
            <span className="font-medium ml-2">آخر نشاط:</span>
            {account.lastActivity}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">رمز الفرع:</span> {account.branchCode}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            عرض المعاملات
          </Button>
          <Button size="sm" className="flex-1">
            إدارة الحساب
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
