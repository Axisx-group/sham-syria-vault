
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MoneyTransferProps {
  language: 'ar' | 'en';
}

const MoneyTransfer: React.FC<MoneyTransferProps> = ({ language }) => {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const translations = {
    ar: {
      moneyTransfer: "تحويل الأموال",
      fromAccount: "من الحساب",
      toAccount: "إلى الحساب",
      amount: "المبلغ",
      note: "ملاحظة (اختيارية)",
      transfer: "تحويل",
      transferSuccess: "تم التحويل بنجاح",
      transferError: "فشل في التحويل",
      mainAccountSYP: "الحساب الرئيسي (ل.س)",
      savingsAccountSYP: "حساب التوفير (ل.س)",
      usdAccount: "الحساب بالدولار (USD)",
      eurAccount: "الحساب باليورو (EUR)"
    },
    en: {
      moneyTransfer: "Money Transfer",
      fromAccount: "From Account",
      toAccount: "To Account", 
      amount: "Amount",
      note: "Note (Optional)",
      transfer: "Transfer",
      transferSuccess: "Transfer completed successfully",
      transferError: "Transfer failed",
      mainAccountSYP: "Main Account (SYP)",
      savingsAccountSYP: "Savings Account (SYP)",
      usdAccount: "USD Account",
      eurAccount: "EUR Account"
    }
  };

  const t = translations[language];

  const accounts = [
    { id: 'main-syp', name: t.mainAccountSYP, balance: 2450000, currency: 'SYP' },
    { id: 'savings-syp', name: t.savingsAccountSYP, balance: 850000, currency: 'SYP' },
    { id: 'usd', name: t.usdAccount, balance: 3250, currency: 'USD' },
    { id: 'eur', name: t.eurAccount, balance: 2750, currency: 'EUR' }
  ];

  const handleTransfer = async () => {
    if (!fromAccount || !toAccount || !amount || fromAccount === toAccount) {
      toast({
        title: t.transferError,
        description: language === 'ar' ? 'يرجى التحقق من البيانات المدخلة' : 'Please check your input data',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate transfer process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: t.transferSuccess,
      description: `${language === 'ar' ? 'تم تحويل' : 'Transferred'} ${amount} ${language === 'ar' ? 'بنجاح' : 'successfully'}`,
    });

    // Reset form
    setFromAccount('');
    setToAccount('');
    setAmount('');
    setNote('');
    setIsProcessing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5" />
          {t.moneyTransfer}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.fromAccount}</label>
          <Select value={fromAccount} onValueChange={setFromAccount}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر الحساب' : 'Select account'} />
            </SelectTrigger>
            <SelectContent>
              {accounts.map(account => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t.toAccount}</label>
          <Select value={toAccount} onValueChange={setToAccount}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر الحساب' : 'Select account'} />
            </SelectTrigger>
            <SelectContent>
              {accounts.filter(account => account.id !== fromAccount).map(account => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
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
          <label className="text-sm font-medium">{t.note}</label>
          <Input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={language === 'ar' ? 'أدخل ملاحظة...' : 'Enter a note...'}
          />
        </div>

        <Button 
          onClick={handleTransfer}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {language === 'ar' ? 'جاري التحويل...' : 'Processing...'}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              {t.transfer}
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoneyTransfer;
