
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from 'lucide-react';

interface AddressInfoFormProps {
  formData: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  onInputChange: (field: string, value: string) => void;
  language: 'ar' | 'en';
}

const AddressInfoForm: React.FC<AddressInfoFormProps> = ({ formData, onInputChange, language }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          {language === 'ar' ? 'معلومات العنوان' : 'Address Information'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="addressLine1">{language === 'ar' ? 'العنوان الأول *' : 'Address Line 1 *'}</Label>
          <Input
            id="addressLine1"
            value={formData.addressLine1}
            onChange={(e) => onInputChange('addressLine1', e.target.value)}
            placeholder={language === 'ar' ? 'الشارع والرقم' : 'Street and number'}
            required
          />
        </div>

        <div>
          <Label htmlFor="addressLine2">{language === 'ar' ? 'العنوان الثاني' : 'Address Line 2'}</Label>
          <Input
            id="addressLine2"
            value={formData.addressLine2}
            onChange={(e) => onInputChange('addressLine2', e.target.value)}
            placeholder={language === 'ar' ? 'شقة، وحدة، إلخ (اختياري)' : 'Apartment, unit, etc. (optional)'}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city">{language === 'ar' ? 'المدينة *' : 'City *'}</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => onInputChange('city', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="state">{language === 'ar' ? 'المحافظة' : 'State/Province'}</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => onInputChange('state', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="postalCode">{language === 'ar' ? 'الرمز البريدي' : 'Postal Code'}</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => onInputChange('postalCode', e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="country">{language === 'ar' ? 'البلد *' : 'Country *'}</Label>
          <Select value={formData.country} onValueChange={(value) => onInputChange('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر البلد' : 'Select country'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Syria">{language === 'ar' ? 'سوريا' : 'Syria'}</SelectItem>
              <SelectItem value="Lebanon">{language === 'ar' ? 'لبنان' : 'Lebanon'}</SelectItem>
              <SelectItem value="Jordan">{language === 'ar' ? 'الأردن' : 'Jordan'}</SelectItem>
              <SelectItem value="Palestine">{language === 'ar' ? 'فلسطين' : 'Palestine'}</SelectItem>
              <SelectItem value="Iraq">{language === 'ar' ? 'العراق' : 'Iraq'}</SelectItem>
              <SelectItem value="Turkey">{language === 'ar' ? 'تركيا' : 'Turkey'}</SelectItem>
              <SelectItem value="Germany">{language === 'ar' ? 'ألمانيا' : 'Germany'}</SelectItem>
              <SelectItem value="France">{language === 'ar' ? 'فرنسا' : 'France'}</SelectItem>
              <SelectItem value="Other">{language === 'ar' ? 'أخرى' : 'Other'}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressInfoForm;
