
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SwiftTransferProps, Account } from './swift/types';
import { swiftTransferTranslations } from './swift/translations';
import SwiftTransferAlert from './swift/SwiftTransferAlert';
import AccountSelector from './swift/AccountSelector';
import BeneficiaryForm from './swift/BeneficiaryForm';
import BankInfoForm from './swift/BankInfoForm';
import TransferDetailsForm from './swift/TransferDetailsForm';
import FeesAndTimeInfo from './swift/FeesAndTimeInfo';
import TransferButtons from './swift/TransferButtons';

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

  const t = swiftTransferTranslations[language];

  const accounts: Account[] = [
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
        <SwiftTransferAlert language={language} />

        <AccountSelector
          accounts={accounts}
          value={fromAccount}
          onChange={setFromAccount}
          label={t.fromAccount}
          placeholder={language === 'ar' ? 'اختر الحساب' : 'Select account'}
        />

        <BeneficiaryForm
          beneficiaryName={beneficiaryName}
          setBeneficiaryName={setBeneficiaryName}
          beneficiaryAccount={beneficiaryAccount}
          setBeneficiaryAccount={setBeneficiaryAccount}
          beneficiaryAddress={beneficiaryAddress}
          setBeneficiaryAddress={setBeneficiaryAddress}
          translations={t}
          language={language}
        />

        <BankInfoForm
          swiftCode={swiftCode}
          setSwiftCode={setSwiftCode}
          bankName={bankName}
          setBankName={setBankName}
          bankAddress={bankAddress}
          setBankAddress={setBankAddress}
          translations={t}
          language={language}
        />

        <TransferDetailsForm
          amount={amount}
          setAmount={setAmount}
          currency={currency}
          setCurrency={setCurrency}
          purpose={purpose}
          setPurpose={setPurpose}
          reference={reference}
          setReference={setReference}
          translations={t}
          language={language}
          currencies={currencies}
          purposes={purposes}
        />

        <FeesAndTimeInfo translations={t} />

        <TransferButtons
          isProcessing={isProcessing}
          onTransfer={handleTransfer}
          translations={t}
          language={language}
        />
      </CardContent>
    </Card>
  );
};

export default SwiftTransfer;
