
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Filter,
  Calendar
} from "lucide-react";

interface TransactionsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
}

const TransactionsFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  filterType, 
  setFilterType 
}: TransactionsFiltersProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث برقم المعاملة، رقم الحساب أو اسم العميل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              فلترة متقدمة
            </Button>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">جميع الأنواع</option>
              <option value="transfer">تحويلات</option>
              <option value="deposit">إيداعات</option>
              <option value="withdrawal">سحوبات</option>
              <option value="payment">دفعات</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>جميع الحالات</option>
              <option>مكتمل</option>
              <option>قيد المعالجة</option>
              <option>قيد المراجعة</option>
              <option>فشل</option>
            </select>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              اليوم
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsFilters;
