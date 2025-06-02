
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt, Zap, Droplets, Wifi, Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BillPaymentProps {
  language: 'ar' | 'en';
}

const BillPayment: React.FC<BillPaymentProps> = ({ language }) => {
  const [billType, setBillType] = useState('');
  const [billNumber, setBillNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const translations = {
    ar: {
      billPayment: "دفع الفواتير",
      billType: "نوع الفاتورة",
      billNumber: "رقم الفاتورة",
      amount: "المبلغ",
      fromAccount: "من الحساب",
      payBill: "دفع الفاتورة",
      paymentSuccess: "تم دفع الفاتورة بنجاح",
      paymentError: "فشل في دفع الفاتورة",
      electricity: "كهرباء",
      water: "مياه",
      internet: "إنترنت",
      phone: "هاتف",
      gas: "غاز",
      mainAccount: "الحساب الرئيسي"
    },
    en: {
      billPayment: "Bill Payment",
      billType: "Bill Type",
      billNumber: "Bill Number",
      amount: "Amount",
      fromAccount: "From Account",
      payBill: "Pay Bill",
      paymentSuccess: "Bill paid successfully",
      paymentError: "Bill payment failed",
      electricity: "Electricity",
      water: "Water",
      internet: "Internet",
      phone: "Phone",
      gas: "Gas",
      mainAccount: "Main Account"
    }
  };

  const t = translations[language];

  const billTypes = [
    { id: 'electricity', name: t.electricity, icon: Zap, color: 'text-yellow-600' },
    { id: 'water', name: t.water, icon: Droplets, color: 'text-blue-600' },
    { id: 'internet', name: t.internet, icon: Wifi, color: 'text-purple-600' },
    { id: 'phone', name: t.phone, icon: Receipt, color: 'text-green-600' },
    { id: 'gas', name: t.gas, icon: Car, color: 'text-orange-600' }
  ];

  const handlePayment = async () => {
    if (!billType || !billNumber || !amount || !fromAccount) {
      toast({
        title: t.paymentError,
        description: language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: t.paymentSuccess,
      description: `${language === 'ar' ? 'تم دفع فاتورة' : 'Paid'} ${billTypes.find(b => b.id === billType)?.name} ${language === 'ar' ? 'بمبلغ' : 'for'} ${amount}`,
    });

    // Reset form
    setBillType('');
    setBillNumber('');
    setAmount('');
    setFromAccount('');
    setIsProcessing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          {t.billPayment}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.billType}</label>
          <Select value={billType} onValueChange={setBillType}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر نوع الفاتورة' : 'Select bill type'} />
            </SelectTrigger>
            <SelectContent>
              {billTypes.map(type => {
                const Icon = type.icon;
                return (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${type.color}`} />
                      {type.name}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t.billNumber}</label>
          <Input
            value={billNumber}
            onChange={(e) => setBillNumber(e.target.value)}
            placeholder={language === 'ar' ? 'أدخل رقم الفاتورة' : 'Enter bill number'}
          />
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
          <label className="text-sm font-medium">{t.fromAccount}</label>
          <Select value={fromAccount} onValueChange={setFromAccount}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر الحساب' : 'Select account'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main-syp">{t.mainAccount} (SYP)</SelectItem>
              <SelectItem value="usd">USD Account</SelectItem>
              <SelectItem value="eur">EUR Account</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {language === 'ar' ? 'جاري الدفع...' : 'Processing...'}
            </div>
          ) : (
            t.payBill
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BillPayment;
