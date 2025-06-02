
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
  CreditCard,
  Shield,
  Calendar,
  AlertTriangle,
  XCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CardData {
  id: string;
  cardNumber: string;
  fullCardNumber: string;
  customerName: string;
  cardType: string;
  cardCategory: string;
  status: string;
  expiryDate: string;
  issueDate: string;
  linkedAccount: string;
  creditLimit: string;
  currentBalance: string;
  monthlySpent: string;
  lastTransaction: string;
  securityLevel: string;
}

interface CardItemProps {
  card: CardData;
}

const CardItem = ({ card }: CardItemProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشطة':
        return 'bg-green-100 text-green-800';
      case 'محظورة':
        return 'bg-red-100 text-red-800';
      case 'منتهية الصلاحية':
        return 'bg-yellow-100 text-yellow-800';
      case 'معلقة':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'بلاتينية':
        return 'bg-gray-800 text-white';
      case 'ذهبية':
        return 'bg-yellow-400 text-yellow-900';
      case 'فضية':
        return 'bg-gray-400 text-gray-900';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getSecurityIcon = (level: string) => {
    switch (level) {
      case 'عالي':
        return <Shield className="h-4 w-4 text-green-600" />;
      case 'متوسط':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'منخفض':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Card Info */}
          <div className="lg:col-span-4">
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className={`w-16 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white ${
                card.cardType === 'Visa' ? 'bg-blue-600' : 'bg-red-600'
              }`}>
                {card.cardType}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-mono text-lg font-semibold">{card.cardNumber}</h3>
                  <Badge className={getStatusColor(card.status)}>
                    {card.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-gray-800">{card.customerName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={getCategoryColor(card.cardCategory)}>
                    {card.cardCategory}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    الحساب: {card.linkedAccount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Info */}
          <div className="lg:col-span-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">الحد الائتماني:</span>
                <span className="text-sm font-semibold">₺{card.creditLimit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">الرصيد المتاح:</span>
                <span className="text-sm font-semibold text-green-600">₺{card.currentBalance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">الإنفاق الشهري:</span>
                <span className="text-sm font-semibold text-blue-600">₺{card.monthlySpent}</span>
              </div>
            </div>
          </div>

          {/* Dates and Security */}
          <div className="lg:col-span-3">
            <div className="space-y-2">
              <div className="flex items-center text-xs text-gray-600">
                <Calendar className="h-3 w-3 ml-1" />
                انتهاء الصلاحية: {card.expiryDate}
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Calendar className="h-3 w-3 ml-1" />
                تاريخ الإصدار: {card.issueDate}
              </div>
              <div className="flex items-center text-xs text-gray-600">
                {getSecurityIcon(card.securityLevel)}
                <span className="mr-1">الأمان: {card.securityLevel}</span>
              </div>
              <div className="text-xs text-gray-500">
                آخر معاملة: {card.lastTransaction}
              </div>
            </div>
          </div>

          {/* Usage Bar */}
          <div className="lg:col-span-1">
            <div className="w-full">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>الاستخدام</span>
                <span>{Math.round((parseInt(card.monthlySpent.replace(',', '')) / parseInt(card.creditLimit.replace(',', ''))) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ 
                    width: `${Math.round((parseInt(card.monthlySpent.replace(',', '')) / parseInt(card.creditLimit.replace(',', ''))) * 100)}%`
                  }}
                ></div>
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
                  تعديل الحدود
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="h-4 w-4 mr-2" />
                  تاريخ المعاملات
                </DropdownMenuItem>
                {card.status === 'نشطة' ? (
                  <DropdownMenuItem className="text-red-600">
                    <Lock className="h-4 w-4 mr-2" />
                    حظر البطاقة
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="text-green-600">
                    <Unlock className="h-4 w-4 mr-2" />
                    إلغاء الحظر
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

export default CardItem;
