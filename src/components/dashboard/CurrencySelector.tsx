
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Currency } from "@/types/account";

interface CurrencySelectorProps {
  currencies: Currency[];
  selectedCurrency: string;
  onCurrencySelect: (currency: string) => void;
  title: string;
  minimumDepositText: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currencies,
  selectedCurrency,
  onCurrencySelect,
  title,
  minimumDepositText
}) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">{title}</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {currencies.map((currency) => {
          const Icon = currency.icon;
          return (
            <Card 
              key={currency.code}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCurrency === currency.code 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : ''
              }`}
              onClick={() => onCurrencySelect(currency.code)}
            >
              <CardContent className="p-4 text-center">
                <Icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-medium">{currency.code}</h4>
                <p className="text-xs text-gray-600">{currency.name}</p>
                <p className="text-xs text-green-600 mt-1">
                  {minimumDepositText}: {currency.minDeposit.toLocaleString()} {currency.code}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CurrencySelector;
