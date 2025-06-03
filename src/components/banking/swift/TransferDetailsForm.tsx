
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TransferDetailsFormProps {
  amount: string;
  setAmount: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
  purpose: string;
  setPurpose: (value: string) => void;
  reference: string;
  setReference: (value: string) => void;
  translations: any;
  language: 'ar' | 'en';
  currencies: string[];
  purposes: string[];
}

const TransferDetailsForm: React.FC<TransferDetailsFormProps> = ({
  amount,
  setAmount,
  currency,
  setCurrency,
  purpose,
  setPurpose,
  reference,
  setReference,
  translations,
  language,
  currencies,
  purposes
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{translations.transferDetails}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">{translations.amount} *</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="1"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">{translations.currency}</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map(curr => (
                <SelectItem key={curr} value={curr}>{curr}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">{translations.purpose} *</Label>
          <Select value={purpose} onValueChange={setPurpose}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر الغرض' : 'Select purpose'} />
            </SelectTrigger>
            <SelectContent>
              {purposes.map(p => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">{translations.reference}</Label>
          <Input
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder={language === 'ar' ? 'مرجع اختياري' : 'Optional reference'}
          />
        </div>
      </div>
    </div>
  );
};

export default TransferDetailsForm;
