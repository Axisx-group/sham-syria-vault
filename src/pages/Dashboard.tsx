import React, { useState } from 'react';
import Header from '@/components/landing/Header';
import AccountOverview from '@/components/dashboard/AccountOverview';
import QuickActions from '@/components/dashboard/QuickActions';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import CardsSection from '@/components/dashboard/CardsSection';
import PaymentMethods from '@/components/banking/PaymentMethods';
import MobilePaymentIntegration from '@/components/dashboard/MobilePaymentIntegration';
import KYCDashboard from '@/components/kyc/KYCDashboard';
import KYCApplicationStatus from '@/components/kyc/KYCApplicationStatus';
import SwiftTransferSection from '@/components/dashboard/SwiftTransferSection';

const Dashboard = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [activeTab, setActiveTab] = useState('overview');
  const [showBalance, setShowBalance] = useState(true);

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: '📊' },
    { id: 'transactions', label: 'المعاملات', icon: '💳' },
    { id: 'cards', label: 'البطاقات', icon: '🏦' },
    { id: 'payments', label: 'طرق الدفع', icon: '💰' },
    { id: 'mobile-pay', label: 'الدفع المحمول', icon: '📱' },
    { id: 'kyc', label: 'التحقق من الهوية', icon: '🛡️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'transactions':
        return <TransactionHistory language={language} detailed={true} />;
      case 'cards':
        return <CardsSection language={language} />;
      case 'payments':
        return <PaymentMethods />;
      case 'mobile-pay':
        return <MobilePaymentIntegration />;
      case 'kyc':
        return (
          <div className="max-w-4xl mx-auto">
            <KYCApplicationStatus />
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <AccountOverview language={language} showBalance={showBalance} onToggleBalance={toggleBalance} />
            <QuickActions language={language} />
            <TransactionHistory language={language} />
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header language={language} onLanguageChange={setLanguage} />
      
      {/* Dashboard Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 space-x-reverse overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 space-x-reverse py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">مرحباً!</h1>
            <button onClick={() => setActiveTab('kyc')} className="bg-blue-500 text-white px-4 py-2 rounded">التحقق من الهوية</button>
          </div>
          <AccountOverview language={language} showBalance={showBalance} onToggleBalance={toggleBalance} />
          <QuickActions language={language} />
          <TransactionHistory language={language} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SwiftTransferSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
