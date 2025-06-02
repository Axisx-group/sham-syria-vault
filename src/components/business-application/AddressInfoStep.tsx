
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddressInfoStepProps {
  formData: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const AddressInfoStep: React.FC<AddressInfoStepProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="addressLine1">العنوان الأول *</Label>
        <Input
          id="addressLine1"
          value={formData.addressLine1}
          onChange={(e) => onInputChange('addressLine1', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="addressLine2">العنوان الثاني</Label>
        <Input
          id="addressLine2"
          value={formData.addressLine2}
          onChange={(e) => onInputChange('addressLine2', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="city">المدينة *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="state">المحافظة</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => onInputChange('state', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="postalCode">الرمز البريدي</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => onInputChange('postalCode', e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="country">البلد</Label>
        <Select value={formData.country} onValueChange={(value) => onInputChange('country', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Syria">سوريا</SelectItem>
            <SelectItem value="Lebanon">لبنان</SelectItem>
            <SelectItem value="Jordan">الأردن</SelectItem>
            <SelectItem value="Palestine">فلسطين</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AddressInfoStep;
