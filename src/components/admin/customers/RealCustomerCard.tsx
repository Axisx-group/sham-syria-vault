
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Customer } from '@/hooks/useCustomers';

interface RealCustomerCardProps {
  customer: Customer;
  onStatusChange: (customerId: string, status: string) => void;
}

const RealCustomerCard: React.FC<RealCustomerCardProps> = ({ customer, onStatusChange }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'suspended':
        return 'معلق';
      case 'closed':
        return 'مغلق';
      default:
        return status;
    }
  };

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case 'personal':
        return 'شخصي';
      case 'business':
        return 'تجاري';
      default:
        return type;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {customer.first_name} {customer.last_name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getStatusColor(customer.status)}>
                  {getStatusLabel(customer.status)}
                </Badge>
                <Badge variant="outline">
                  {getAccountTypeLabel(customer.account_type)}
                </Badge>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onStatusChange(customer.id, 'active')}>
                تفعيل
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(customer.id, 'suspended')}>
                تعليق
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onStatusChange(customer.id, 'closed')}
                className="text-red-600"
              >
                إغلاق
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{customer.phone}</span>
          </div>
          {customer.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{customer.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>انضم في {new Date(customer.join_date).toLocaleDateString('ar-SA')}</span>
          </div>
        </div>

        {customer.last_login && (
          <div className="mt-4 pt-4 border-t">
            <span className="text-xs text-gray-500">
              آخر دخول: {new Date(customer.last_login).toLocaleString('ar-SA')}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealCustomerCard;
