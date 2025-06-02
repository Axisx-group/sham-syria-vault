
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";

interface AccountPreferencesStepProps {
  formData: {
    preferredCurrency: string;
    initialDeposit: string;
    requestDebitCard: boolean;
    requestCreditCard: boolean;
  };
  documents: {
    nationalId?: File;
    businessLicense?: File;
    commercialRegistration?: File;
  };
  onInputChange: (field: string, value: string | boolean) => void;
  onFileChange: (documentType: 'nationalId' | 'businessLicense' | 'commercialRegistration', file: File | null) => void;
}

const AccountPreferencesStep: React.FC<AccountPreferencesStepProps> = ({ 
  formData, 
  documents, 
  onInputChange, 
  onFileChange 
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="preferredCurrency">العملة المفضلة</Label>
          <Select value={formData.preferredCurrency} onValueChange={(value) => onInputChange('preferredCurrency', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SYP">ليرة سورية (SYP)</SelectItem>
              <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
              <SelectItem value="EUR">يورو (EUR)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="initialDeposit">الإيداع الأولي (اختياري)</Label>
          <Input
            id="initialDeposit"
            type="number"
            value={formData.initialDeposit}
            onChange={(e) => onInputChange('initialDeposit', e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="debitCard"
            checked={formData.requestDebitCard}
            onCheckedChange={(checked) => onInputChange('requestDebitCard', checked)}
          />
          <Label htmlFor="debitCard">طلب بطاقة خصم</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="creditCard"
            checked={formData.requestCreditCard}
            onCheckedChange={(checked) => onInputChange('requestCreditCard', checked)}
          />
          <Label htmlFor="creditCard">طلب بطاقة ائتمان</Label>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">الوثائق المطلوبة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="nationalId">الهوية الشخصية *</Label>
            <div className="mt-2 flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="text-sm text-gray-600">
                  <label htmlFor="nationalId" className="cursor-pointer">
                    <span>ارفع صورة الهوية</span>
                    <input
                      id="nationalId"
                      name="nationalId"
                      type="file"
                      className="sr-only"
                      accept="image/*,.pdf"
                      onChange={(e) => onFileChange('nationalId', e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>
            </div>
            {documents.nationalId && (
              <p className="text-sm text-green-600 mt-2">✓ {documents.nationalId.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="businessLicense">رخصة العمل *</Label>
            <div className="mt-2 flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="text-sm text-gray-600">
                  <label htmlFor="businessLicense" className="cursor-pointer">
                    <span>ارفع رخصة العمل</span>
                    <input
                      id="businessLicense"
                      name="businessLicense"
                      type="file"
                      className="sr-only"
                      accept="image/*,.pdf"
                      onChange={(e) => onFileChange('businessLicense', e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>
            </div>
            {documents.businessLicense && (
              <p className="text-sm text-green-600 mt-2">✓ {documents.businessLicense.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="commercialRegistration">السجل التجاري *</Label>
            <div className="mt-2 flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="text-sm text-gray-600">
                  <label htmlFor="commercialRegistration" className="cursor-pointer">
                    <span>ارفع السجل التجاري</span>
                    <input
                      id="commercialRegistration"
                      name="commercialRegistration"
                      type="file"
                      className="sr-only"
                      accept="image/*,.pdf"
                      onChange={(e) => onFileChange('commercialRegistration', e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>
            </div>
            {documents.commercialRegistration && (
              <p className="text-sm text-green-600 mt-2">✓ {documents.commercialRegistration.name}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPreferencesStep;
