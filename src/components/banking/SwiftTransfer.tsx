
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Globe, CreditCard, AlertCircle, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SwiftTransferProps {
  language: 'ar' | 'en';
}

const SwiftTransfer: React.FC<SwiftTransferProps> = ({ language }) => {
  const [fromAccount, setFromAccount] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryAddress, setBeneficiaryAddress] = useState('');
  const [beneficiaryAccount, setBeneficiaryAccount] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAddress, setBankAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [purpose, setPurpose] = useState('');
  const [reference, setReference] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const translations = {
    ar: {
      swiftTransfer: "تحويل سويفت دولي",
      fromAccount: "من الحساب",
      beneficiaryInfo: "معلومات المستفيد",
      beneficiaryName: "اسم المستفيد",
      beneficiaryAddress: "عنوان المستفيد",
      beneficiaryAccount: "رقم حساب المستفيد",
      bankInfo: "معلومات البنك",
      swiftCode: "رمز السويفت",
      bankName: "اسم البنك",
      bankAddress: "عنوان البنك",
      transferDetails: "تفاصيل التحويل",
      amount: "المبلغ",
      currency: "العملة",
      purpose: "الغرض من التحويل",
      reference: "المرجع",
      fees: "الرسوم",
      processingTime: "وقت المعالجة",
      transfer: "تحويل",
      cancel: "إلغاء",
      swiftFee: "رسوم السويفت: 25 USD",
      processingTimeText: "1-3 أيام عمل",
      transferSuccess: "تم إرسال التحويل بنجاح",
      transferError: "فشل في إرسال التحويل",
      mainAccountUSD: "الحساب الرئيسي (USD)",
      mainAccountEUR: "الحساب الرئيسي (EUR)",
      savingsAccountUSD: "حساب التوفير (USD)",
      business: "أعمال",
      personal: "شخصي",
      investment: "استثمار",
      family: "عائلة",
      education: "تعليم",
      medical: "طبي"
    },
    en: {
      swiftTransfer: "International SWIFT Transfer",
      fromAccount: "From Account",
      beneficiaryInfo: "Beneficiary Information",
      beneficiaryName: "Beneficiary Name",
      beneficiaryAddress: "Beneficiary Address",
      beneficiaryAccount: "Beneficiary Account Number",
      bankInfo: "Bank Information",
      swiftCode: "SWIFT Code",
      bankName: "Bank Name",
      bankAddress: "Bank Address",
      transferDetails: "Transfer Details",
      amount: "Amount",
      currency: "Currency",
      purpose: "Purpose of Transfer",
      reference: "Reference",
      fees: "Fees",
      processingTime: "Processing Time",
      transfer: "Transfer",
      cancel: "Cancel",
      swiftFee: "SWIFT Fee: 25 USD",
      processingTimeText: "1-3 business days",
      transferSuccess: "Transfer sent successfully",
      transferError: "Failed to send transfer",
      mainAccountUSD: "Main Account (USD)",
      mainAccountEUR: "Main Account (EUR)",
      savingsAccountUSD: "Savings Account (USD)",
      business: "Business",
      personal: "Personal",
      investment: "Investment",
      family: "Family",
      education: "Education",
      medical: "Medical"
    }
  };

  const t = translations[language];

  const accounts = [
    { id: 'main-usd', name: t.mainAccountUSD, balance: 15000, currency: 'USD' },
    { id: 'main-eur', name: t.mainAccountEUR, balance: 12000, currency: 'EUR' },
    { id: 'savings-usd', name: t.savingsAccountUSD, balance: 8500, currency: 'USD' }
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD'];

  const purposes = [
    t.business,
    t.personal,
    t.investment,
    t.family,
    t.education,
    t.medical
  ];

  const handleTransfer = async () => {
    if (!fromAccount || !beneficiaryName || !beneficiaryAccount || !swiftCode || !amount || !purpose) {
      toast({
        title: t.transferError,
        description: language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate transfer process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: t.transferSuccess,
      description: `${language === 'ar' ? 'تم إرسال تحويل بقيمة' : 'Transfer of'} ${amount} ${currency} ${language === 'ar' ? 'بنجاح' : 'sent successfully'}`,
    });

    // Reset form
    setFromAccount('');
    setBeneficiaryName('');
    setBeneficiaryAddress('');
    setBeneficiaryAccount('');
    setSwiftCode('');
    setBankName('');
    setBankAddress('');
    setAmount('');
    setCurrency('USD');
    setPurpose('');
    setReference('');
    setIsProcessing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          {t.swiftTransfer}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {language === 'ar' 
              ? 'التحويلات الدولية تخضع للقوانين المحلية والدولية. قد تستغرق 1-3 أيام عمل.'
              : 'International transfers are subject to local and international regulations. Processing may take 1-3 business days.'
            }
          </AlertDescription>
        </Alert>

        {/* From Account */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t.fromAccount}</Label>
          <Select value={fromAccount} onValueChange={setFromAccount}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر الحساب' : 'Select account'} />
            </SelectTrigger>
            <SelectContent>
              {accounts.map(account => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name} - {account.balance.toLocaleString()} {account.currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Beneficiary Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t.beneficiaryInfo}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t.beneficiaryName} *</Label>
              <Input
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل اسم المستفيد' : 'Enter beneficiary name'}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t.beneficiaryAccount} *</Label>
              <Input
                value={beneficiaryAccount}
                onChange={(e) => setBeneficiaryAccount(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل رقم الحساب' : 'Enter account number'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">{t.beneficiaryAddress}</Label>
            <Input
              value={beneficiaryAddress}
              onChange={(e) => setBeneficiaryAddress(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل عنوان المستفيد' : 'Enter beneficiary address'}
            />
          </div>
        </div>

        {/* Bank Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t.bankInfo}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t.swiftCode} *</Label>
              <Input
                value={swiftCode}
                onChange={(e) => setSwiftCode(e.target.value.toUpperCase())}
                placeholder="ABCDUS33XXX"
                maxLength={11}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t.bankName}</Label>
              <Input
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل اسم البنك' : 'Enter bank name'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">{t.bankAddress}</Label>
            <Input
              value={bankAddress}
              onChange={(e) => setBankAddress(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل عنوان البنك' : 'Enter bank address'}
            />
          </div>
        </div>

        {/* Transfer Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t.transferDetails}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t.amount} *</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="1"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t.currency}</Label>
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
              <Label className="text-sm font-medium">{t.purpose} *</Label>
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
              <Label className="text-sm font-medium">{t.reference}</Label>
              <Input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder={language === 'ar' ? 'مرجع اختياري' : 'Optional reference'}
              />
            </div>
          </div>
        </div>

        {/* Fees and Processing Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">{t.fees}: {t.swiftFee}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium">{t.processingTime}: {t.processingTimeText}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            onClick={handleTransfer}
            disabled={isProcessing}
            className="flex-1"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {language === 'ar' ? 'جاري المعالجة...' : 'Processing...'}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                {t.transfer}
              </div>
            )}
          </Button>
          
          <Button variant="outline" className="flex-1">
            {t.cancel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SwiftTransfer;
