
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MobileTopupProps {
  language: 'ar' | 'en';
}

const MobileTopup: React.FC<MobileTopupProps> = ({ language }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const translations = {
    ar: {
      mobileTopup: "شحن الهاتف",
      phoneNumber: "رقم الهاتف",
      operator: "شركة الاتصالات",
      amount: "مبلغ الشحن",
      fromAccount: "من الحساب",
      topup: "شحن",
      topupSuccess: "تم شحن الرقم بنجاح",
      topupError: "فشل في شحن الرقم",
      syriatel: "سيريتل",
      mtn: "إم تي إن",
      mainAccount: "الحساب الرئيسي"
    },
    en: {
      mobileTopup: "Mobile Top-up",
      phoneNumber: "Phone Number",
      operator: "Mobile Operator",
      amount: "Top-up Amount",
      fromAccount: "From Account",
      topup: "Top-up",
      topupSuccess: "Phone topped up successfully",
      topupError: "Top-up failed",
      syriatel: "Syriatel",
      mtn: "MTN",
      mainAccount: "Main Account"
    }
  };

  const t = translations[language];

  const operators = [
    { id: 'syriatel', name: t.syriatel },
    { id: 'mtn', name: t.mtn }
  ];

  const amounts = ['500', '1000', '2000', '5000', '10000'];

  const handleTopup = async () => {
    if (!phoneNumber || !operator || !amount || !fromAccount) {
      toast({
        title: t.topupError,
        description: language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate topup process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: t.topupSuccess,
      description: `${language === 'ar' ? 'تم شحن الرقم' : 'Topped up'} ${phoneNumber} ${language === 'ar' ? 'بمبلغ' : 'with'} ${amount} ${language === 'ar' ? 'ل.س' : 'SYP'}`,
    });

    // Reset form
    setPhoneNumber('');
    setOperator('');
    setAmount('');
    setFromAccount('');
    setIsProcessing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          {t.mobileTopup}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.phoneNumber}</label>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="09xxxxxxxx"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t.operator}</label>
          <Select value={operator} onValueChange={setOperator}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر الشركة' : 'Select operator'} />
            </SelectTrigger>
            <SelectContent>
              {operators.map(op => (
                <SelectItem key={op.id} value={op.id}>
                  {op.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t.amount}</label>
          <Select value={amount} onValueChange={setAmount}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر المبلغ' : 'Select amount'} />
            </SelectTrigger>
            <SelectContent>
              {amounts.map(amt => (
                <SelectItem key={amt} value={amt}>
                  {amt} {language === 'ar' ? 'ل.س' : 'SYP'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t.fromAccount}</label>
          <Select value={fromAccount} onValueChange={setFromAccount}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر الحساب' : 'Select account'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main-syp">{t.mainAccount} (SYP)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleTopup}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {language === 'ar' ? 'جاري الشحن...' : 'Processing...'}
            </div>
          ) : (
            t.topup
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MobileTopup;
