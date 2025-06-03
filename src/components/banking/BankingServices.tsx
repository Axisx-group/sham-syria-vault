
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightLeft, Receipt, Smartphone, ArrowUpDown, PiggyBank, BarChart3, CreditCard, Globe } from "lucide-react";
import MoneyTransfer from './MoneyTransfer';
import BillPayment from './BillPayment';
import MobileTopup from './MobileTopup';
import CurrencyExchange from './CurrencyExchange';
import LoanApplication from './LoanApplication';
import FinancialReports from './FinancialReports';
import CardManagement from './CardManagement';
import SwiftTransfer from './SwiftTransfer';

interface BankingServicesProps {
  language: 'ar' | 'en';
}

const BankingServices: React.FC<BankingServicesProps> = ({ language }) => {
  const translations = {
    ar: {
      bankingServices: "الخدمات المصرفية",
      moneyTransfer: "تحويل الأموال",
      billPayment: "دفع الفواتير",
      mobileTopup: "شحن الهاتف",
      currencyExchange: "صرف العملات",
      loanApplication: "طلب قرض",
      financialReports: "التقارير المالية",
      cardManagement: "إدارة البطاقات",
      swiftTransfer: "سويفت دولي"
    },
    en: {
      bankingServices: "Banking Services",
      moneyTransfer: "Money Transfer",
      billPayment: "Bill Payment",
      mobileTopup: "Mobile Top-up",
      currencyExchange: "Currency Exchange",
      loanApplication: "Loan Application",
      financialReports: "Financial Reports",
      cardManagement: "Card Management",
      swiftTransfer: "International SWIFT"
    }
  };

  const t = translations[language];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.bankingServices}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transfer" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="transfer" className="flex items-center gap-1">
              <ArrowRightLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{t.moneyTransfer}</span>
            </TabsTrigger>
            <TabsTrigger value="swift" className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{t.swiftTransfer}</span>
            </TabsTrigger>
            <TabsTrigger value="bills" className="flex items-center gap-1">
              <Receipt className="h-4 w-4" />
              <span className="hidden sm:inline">{t.billPayment}</span>
            </TabsTrigger>
            <TabsTrigger value="topup" className="flex items-center gap-1">
              <Smartphone className="h-4 w-4" />
              <span className="hidden sm:inline">{t.mobileTopup}</span>
            </TabsTrigger>
            <TabsTrigger value="exchange" className="flex items-center gap-1">
              <ArrowUpDown className="h-4 w-4" />
              <span className="hidden sm:inline">{t.currencyExchange}</span>
            </TabsTrigger>
            <TabsTrigger value="loans" className="flex items-center gap-1">
              <PiggyBank className="h-4 w-4" />
              <span className="hidden sm:inline">{t.loanApplication}</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">{t.financialReports}</span>
            </TabsTrigger>
            <TabsTrigger value="cards" className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">{t.cardManagement}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transfer" className="mt-6">
            <MoneyTransfer language={language} />
          </TabsContent>

          <TabsContent value="swift" className="mt-6">
            <SwiftTransfer language={language} />
          </TabsContent>

          <TabsContent value="bills" className="mt-6">
            <BillPayment language={language} />
          </TabsContent>

          <TabsContent value="topup" className="mt-6">
            <MobileTopup language={language} />
          </TabsContent>

          <TabsContent value="exchange" className="mt-6">
            <CurrencyExchange language={language} />
          </TabsContent>

          <TabsContent value="loans" className="mt-6">
            <LoanApplication language={language} />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <FinancialReports language={language} />
          </TabsContent>

          <TabsContent value="cards" className="mt-6">
            <CardManagement language={language} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BankingServices;
