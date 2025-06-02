
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface CardsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const CardsFilters = ({ searchTerm, setSearchTerm }: CardsFiltersProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث برقم البطاقة، اسم العميل أو رقم الحساب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              فلترة
            </Button>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>جميع الأنواع</option>
              <option>Visa</option>
              <option>Mastercard</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>جميع الحالات</option>
              <option>نشطة</option>
              <option>محظورة</option>
              <option>منتهية الصلاحية</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardsFilters;
