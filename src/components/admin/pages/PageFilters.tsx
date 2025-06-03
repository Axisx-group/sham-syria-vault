
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

const PageFilters = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="البحث في الصفحات..." className="pr-10" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="نوع الصفحة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              <SelectItem value="home">صفحة رئيسية</SelectItem>
              <SelectItem value="service">صفحة خدمات</SelectItem>
              <SelectItem value="form">نموذج</SelectItem>
              <SelectItem value="dashboard">لوحة تحكم</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="published">منشور</SelectItem>
              <SelectItem value="hidden">مخفي</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Filter className="h-4 w-4 mr-2" />
            فلترة
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageFilters;
