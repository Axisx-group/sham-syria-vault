
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BusinessInfoStepProps {
  formData: {
    businessName: string;
    businessType: string;
    businessRegistrationNumber: string;
    businessTaxId: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="businessName">اسم الشركة *</Label>
        <Input
          id="businessName"
          value={formData.businessName}
          onChange={(e) => onInputChange('businessName', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="businessType">نوع النشاط التجاري *</Label>
        <Select value={formData.businessType} onValueChange={(value) => onInputChange('businessType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="اختر نوع النشاط" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trading">تجارة</SelectItem>
            <SelectItem value="manufacturing">تصنيع</SelectItem>
            <SelectItem value="services">خدمات</SelectItem>
            <SelectItem value="technology">تكنولوجيا</SelectItem>
            <SelectItem value="construction">إنشاءات</SelectItem>
            <SelectItem value="retail">تجارة تجزئة</SelectItem>
            <SelectItem value="restaurant">مطاعم</SelectItem>
            <SelectItem value="transport">نقل ومواصلات</SelectItem>
            <SelectItem value="other">أخرى</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="businessRegistrationNumber">رقم القيد التجاري *</Label>
          <Input
            id="businessRegistrationNumber"
            value={formData.businessRegistrationNumber}
            onChange={(e) => onInputChange('businessRegistrationNumber', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="businessTaxId">الرقم الضريبي</Label>
          <Input
            id="businessTaxId"
            value={formData.businessTaxId}
            onChange={(e) => onInputChange('businessTaxId', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoStep;
