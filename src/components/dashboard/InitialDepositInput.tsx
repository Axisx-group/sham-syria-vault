
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from 'lucide-react';

interface Currency {
  code: string;
  name: string;
  icon: LucideIcon;
  minDeposit: number;
  countryCode: string;
}

interface InitialDepositInputProps {
  currency: Currency;
  value: string;
  onChange: (value: string) => void;
  translations: {
    initialDeposit: string;
    optional: string;
    minimumDeposit: string;
  };
}

const InitialDepositInput: React.FC<InitialDepositInputProps> = ({
  currency,
  value,
  onChange,
  translations
}) => {
  const Icon = currency.icon;

  return (
    <div className="space-y-2">
      <Label htmlFor="initialDeposit">
        {translations.initialDeposit} ({translations.optional})
      </Label>
      <div className="relative">
        <Input
          id="initialDeposit"
          type="number"
          placeholder={`${currency.minDeposit} ${currency.code}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      <p className="text-xs text-gray-500">
        {translations.minimumDeposit}: {currency.minDeposit.toLocaleString()} {currency.code}
      </p>
    </div>
  );
};

export default InitialDepositInput;
