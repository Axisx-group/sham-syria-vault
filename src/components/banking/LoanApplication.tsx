
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PiggyBank, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoanApplicationProps {
  language: 'ar' | 'en';
}

const LoanApplication: React.FC<LoanApplicationProps> = ({ language }) => {
  const [loanType, setLoanType] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState('');
  const [purpose, setPurpose] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const translations = {
    ar: {
      loanApplication: "طلب قرض",
      loanType: "نوع القرض",
      amount: "مبلغ القرض",
      period: "فترة القرض",
      purpose: "الغرض من القرض",
      monthlyIncome: "الدخل الشهري",
      apply: "تقديم الطلب",
      applicationSuccess: "تم تقديم طلب القرض بنجاح",
      applicationError: "فشل في تقديم الطلب",
      personalLoan: "قرض شخصي",
      autoLoan: "قرض سيارة",
      homeLoan: "قرض منزل",
      businessLoan: "قرض تجاري",
      months: "شهر",
      estimatedPayment: "القسط الشهري المتوقع"
    },
    en: {
      loanApplication: "Loan Application",
      loanType: "Loan Type",
      amount: "Loan Amount",
      period: "Loan Period",
      purpose: "Loan Purpose",
      monthlyIncome: "Monthly Income",
      apply: "Apply",
      applicationSuccess: "Loan application submitted successfully",
      applicationError: "Failed to submit application",
      personalLoan: "Personal Loan",
      autoLoan: "Auto Loan",
      homeLoan: "Home Loan",
      businessLoan: "Business Loan",
      months: "months",
      estimatedPayment: "Estimated Monthly Payment"
    }
  };

  const t = translations[language];

  const loanTypes = [
    { id: 'personal', name: t.personalLoan, rate: 12 },
    { id: 'auto', name: t.autoLoan, rate: 8 },
    { id: 'home', name: t.homeLoan, rate: 6 },
    { id: 'business', name: t.businessLoan, rate: 10 }
  ];

  const periods = ['12', '24', '36', '48', '60', '72'];

  const calculateMonthlyPayment = () => {
    if (!amount || !period || !loanType) return 0;
    
    const principal = parseFloat(amount);
    const rate = loanTypes.find(l => l.id === loanType)?.rate || 10;
    const monthlyRate = rate / 100 / 12;
    const numPayments = parseInt(period);
    
    if (monthlyRate === 0) return principal / numPayments;
    
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                   (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return payment;
  };

  const monthlyPayment = calculateMonthlyPayment();

  const handleApplication = async () => {
    if (!loanType || !amount || !period || !purpose || !monthlyIncome) {
      toast({
        title: t.applicationError,
        description: language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate application process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: t.applicationSuccess,
      description: `${language === 'ar' ? 'طلب قرض بمبلغ' : 'Loan application for'} ${amount} ${language === 'ar' ? 'تحت المراجعة' : 'under review'}`,
    });

    // Reset form
    setLoanType('');
    setAmount('');
    setPeriod('');
    setPurpose('');
    setMonthlyIncome('');
    setIsProcessing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PiggyBank className="h-5 w-5" />
          {t.loanApplication}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.loanType}</label>
          <Select value={loanType} onValueChange={setLoanType}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر نوع القرض' : 'Select loan type'} />
            </SelectTrigger>
            <SelectContent>
              {loanTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name} ({type.rate}%)
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
          <label className="text-sm font-medium">{t.period}</label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر المدة' : 'Select period'} />
            </SelectTrigger>
            <SelectContent>
              {periods.map(p => (
                <SelectItem key={p} value={p}>
                  {p} {t.months}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t.monthlyIncome}</label>
          <Input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t.purpose}</label>
          <Textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder={language === 'ar' ? 'اذكر الغرض من القرض...' : 'Describe the loan purpose...'}
          />
        </div>

        {monthlyPayment > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">{t.estimatedPayment}</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              {monthlyPayment.toLocaleString('ar-SY')} {language === 'ar' ? 'ل.س' : 'SYP'}
            </div>
          </div>
        )}

        <Button 
          onClick={handleApplication}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {language === 'ar' ? 'جاري التقديم...' : 'Processing...'}
            </div>
          ) : (
            t.apply
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoanApplication;
