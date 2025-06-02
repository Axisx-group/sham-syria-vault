
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CurrencyExchangeProps {
  language: 'ar' | 'en';
}

const CurrencyExchange: React.FC<CurrencyExchangeProps> = ({ language }) => {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const translations = {
    ar: {
      currencyExchange: "صرف العملات",
      fromCurrency: "من العملة",
      toCurrency: "إلى العملة",
      amount: "المبلغ",
      convertedAmount: "المبلغ المحول",
      exchange: "صرف",
      exchangeSuccess: "تم صرف العملة بنجاح",
      exchangeError: "فشل في صرف العملة",
      exchangeRate: "سعر الصرف",
      currentRates: "الأسعار الحالية"
    },
    en: {
      currencyExchange: "Currency Exchange",
      fromCurrency: "From Currency",
      toCurrency: "To Currency",
      amount: "Amount",
      convertedAmount: "Converted Amount",
      exchange: "Exchange",
      exchangeSuccess: "Currency exchanged successfully",
      exchangeError: "Currency exchange failed",
      exchangeRate: "Exchange Rate",
      currentRates: "Current Rates"
    }
  };

  const t = translations[language];

  const currencies = [
    { code: 'SYP', name: language === 'ar' ? 'الليرة السورية' : 'Syrian Pound' },
    { code: 'USD', name: language === 'ar' ? 'الدولار الأمريكي' : 'US Dollar' },
    { code: 'EUR', name: language === 'ar' ? 'اليورو' : 'Euro' }
  ];

  const exchangeRates = {
    'SYP-USD': 0.00008,
    'USD-SYP': 12500,
    'SYP-EUR': 0.000076,
    'EUR-SYP': 13200,
    'USD-EUR': 0.95,
    'EUR-USD': 1.05
  };

  const calculateExchange = () => {
    if (!fromCurrency || !toCurrency || !amount) return;
    
    const rateKey = `${fromCurrency}-${toCurrency}` as keyof typeof exchangeRates;
    const rate = exchangeRates[rateKey] || 1;
    const result = (parseFloat(amount) * rate).toFixed(2);
    setConvertedAmount(result);
  };

  React.useEffect(() => {
    calculateExchange();
  }, [fromCurrency, toCurrency, amount]);

  const handleExchange = async () => {
    if (!fromCurrency || !toCurrency || !amount || fromCurrency === toCurrency) {
      toast({
        title: t.exchangeError,
        description: language === 'ar' ? 'يرجى التحقق من البيانات المدخلة' : 'Please check your input data',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate exchange process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: t.exchangeSuccess,
      description: `${language === 'ar' ? 'تم تحويل' : 'Converted'} ${amount} ${fromCurrency} ${language === 'ar' ? 'إلى' : 'to'} ${convertedAmount} ${toCurrency}`,
    });

    // Reset form
    setFromCurrency('');
    setToCurrency('');
    setAmount('');
    setConvertedAmount('');
    setIsProcessing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5" />
          {t.currencyExchange}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Exchange Rates */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            {t.currentRates}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>USD/SYP: 12,500</div>
            <div>EUR/SYP: 13,200</div>
            <div>USD/EUR: 0.95</div>
            <div>EUR/USD: 1.05</div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t.fromCurrency}</label>
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر العملة' : 'Select currency'} />
            </SelectTrigger>
            <SelectContent>
              {currencies.map(currency => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t.amount}</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t.toCurrency}</label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر العملة' : 'Select currency'} />
            </SelectTrigger>
            <SelectContent>
              {currencies.filter(currency => currency.code !== fromCurrency).map(currency => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {convertedAmount && (
          <div className="bg-green-50 p-4 rounded-lg">
            <label className="text-sm font-medium text-green-800">{t.convertedAmount}</label>
            <div className="text-2xl font-bold text-green-900">
              {convertedAmount} {toCurrency}
            </div>
          </div>
        )}

        <Button 
          onClick={handleExchange}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {language === 'ar' ? 'جاري الصرف...' : 'Processing...'}
            </div>
          ) : (
            t.exchange
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CurrencyExchange;
