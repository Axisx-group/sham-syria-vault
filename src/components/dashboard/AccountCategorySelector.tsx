
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building2, 
  GraduationCap, 
  Heart, 
  Briefcase, 
  TrendingUp, 
  Building, 
  Laptop 
} from "lucide-react";

interface AccountCategory {
  id: string;
  type: 'personal' | 'business';
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  benefits: string[];
  minDeposit: number;
  currency: string;
  color: string;
  bgColor: string;
  popular?: boolean;
}

interface AccountCategorySelectorProps {
  onCategorySelect: (category: AccountCategory) => void;
  language: 'ar' | 'en';
}

const AccountCategorySelector: React.FC<AccountCategorySelectorProps> = ({
  onCategorySelect,
  language
}) => {
  const translations = {
    ar: {
      personalAccounts: "الحسابات الشخصية",
      businessAccounts: "الحسابات التجارية",
      popular: "الأكثر شيوعاً",
      minDeposit: "الحد الأدنى للإيداع",
      selectAccount: "اختيار هذا الحساب",
      currentPersonal: "حساب جاري شخصي",
      savingsPersonal: "حساب توفير شخصي",
      studentAccount: "حساب طلابي",
      seniorAccount: "حساب كبار السن",
      smallBusiness: "حساب تجاري صغير",
      mediumBusiness: "حساب تجاري متوسط",
      largeBusiness: "حساب تجاري كبير",
      freelancerAccount: "حساب فري لانسر",
      currentPersonalDesc: "للمعاملات اليومية والتحويلات السريعة",
      savingsPersonalDesc: "للادخار والاستثمار بفوائد عالية",
      studentAccountDesc: "للطلاب بمميزات خاصة ورسوم مخفضة",
      seniorAccountDesc: "لكبار السن بشروط مميزة وخدمات إضافية",
      smallBusinessDesc: "للشركات الناشئة والصغيرة",
      mediumBusinessDesc: "للشركات المتوسطة والمتنامية",
      largeBusinessDesc: "للشركات الكبيرة والمؤسسات",
      freelancerAccountDesc: "للعاملين المستقلين والمهنيين"
    },
    en: {
      personalAccounts: "Personal Accounts",
      businessAccounts: "Business Accounts",
      popular: "Most Popular",
      minDeposit: "Minimum Deposit",
      selectAccount: "Select This Account",
      currentPersonal: "Personal Current Account",
      savingsPersonal: "Personal Savings Account",
      studentAccount: "Student Account",
      seniorAccount: "Senior Account",
      smallBusiness: "Small Business Account",
      mediumBusiness: "Medium Business Account",
      largeBusiness: "Large Business Account",
      freelancerAccount: "Freelancer Account",
      currentPersonalDesc: "For daily transactions and quick transfers",
      savingsPersonalDesc: "For savings and investment with high interest",
      studentAccountDesc: "For students with special benefits and reduced fees",
      seniorAccountDesc: "For seniors with special terms and additional services",
      smallBusinessDesc: "For startups and small businesses",
      mediumBusinessDesc: "For medium and growing businesses",
      largeBusinessDesc: "For large companies and institutions",
      freelancerAccountDesc: "For freelancers and independent professionals"
    }
  };

  const t = translations[language];

  const personalAccounts: AccountCategory[] = [
    {
      id: 'current-personal',
      type: 'personal',
      name: t.currentPersonal,
      description: t.currentPersonalDesc,
      icon: Users,
      benefits: [
        language === 'ar' ? 'تحويلات فورية مجانية' : 'Free instant transfers',
        language === 'ar' ? 'بطاقة خصم مجانية' : 'Free debit card',
        language === 'ar' ? 'خدمة عملاء 24/7' : '24/7 customer service',
        language === 'ar' ? 'تطبيق جوال متقدم' : 'Advanced mobile app'
      ],
      minDeposit: 25000,
      currency: 'SYP',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      popular: true
    },
    {
      id: 'savings-personal',
      type: 'personal',
      name: t.savingsPersonal,
      description: t.savingsPersonalDesc,
      icon: TrendingUp,
      benefits: [
        language === 'ar' ? 'فوائد عالية تصل إلى 8%' : 'High interest up to 8%',
        language === 'ar' ? 'ادخار تلقائي' : 'Automatic savings',
        language === 'ar' ? 'حماية من التضخم' : 'Inflation protection',
        language === 'ar' ? 'استثمار آمن' : 'Safe investment'
      ],
      minDeposit: 50000,
      currency: 'SYP',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'student',
      type: 'personal',
      name: t.studentAccount,
      description: t.studentAccountDesc,
      icon: GraduationCap,
      benefits: [
        language === 'ar' ? 'بدون رسوم شهرية' : 'No monthly fees',
        language === 'ar' ? 'حد أدنى منخفض للإيداع' : 'Low minimum deposit',
        language === 'ar' ? 'خصومات على الخدمات' : 'Service discounts',
        language === 'ar' ? 'قروض طلابية' : 'Student loans'
      ],
      minDeposit: 10000,
      currency: 'SYP',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'senior',
      type: 'personal',
      name: t.seniorAccount,
      description: t.seniorAccountDesc,
      icon: Heart,
      benefits: [
        language === 'ar' ? 'فوائد مميزة' : 'Special interest rates',
        language === 'ar' ? 'خدمة عملاء مخصصة' : 'Dedicated customer service',
        language === 'ar' ? 'تأمين صحي مجاني' : 'Free health insurance',
        language === 'ar' ? 'استشارات مالية' : 'Financial consultations'
      ],
      minDeposit: 30000,
      currency: 'SYP',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  const businessAccounts: AccountCategory[] = [
    {
      id: 'small-business',
      type: 'business',
      name: t.smallBusiness,
      description: t.smallBusinessDesc,
      icon: Briefcase,
      benefits: [
        language === 'ar' ? 'حدود تحويل عالية' : 'High transfer limits',
        language === 'ar' ? 'أدوات محاسبية' : 'Accounting tools',
        language === 'ar' ? 'دعم فني متخصص' : 'Specialized technical support',
        language === 'ar' ? 'تقارير مالية' : 'Financial reports'
      ],
      minDeposit: 100000,
      currency: 'SYP',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      popular: true
    },
    {
      id: 'medium-business',
      type: 'business',
      name: t.mediumBusiness,
      description: t.mediumBusinessDesc,
      icon: Building2,
      benefits: [
        language === 'ar' ? 'حلول دفع متقدمة' : 'Advanced payment solutions',
        language === 'ar' ? 'إدارة رواتب' : 'Payroll management',
        language === 'ar' ? 'خدمات تجارة إلكترونية' : 'E-commerce services',
        language === 'ar' ? 'استشارات مالية' : 'Financial consultations'
      ],
      minDeposit: 500000,
      currency: 'SYP',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'large-business',
      type: 'business',
      name: t.largeBusiness,
      description: t.largeBusinessDesc,
      icon: Building,
      benefits: [
        language === 'ar' ? 'مدير حساب مخصص' : 'Dedicated account manager',
        language === 'ar' ? 'حلول مصرفية شاملة' : 'Comprehensive banking solutions',
        language === 'ar' ? 'تمويل تجاري' : 'Trade financing',
        language === 'ar' ? 'خدمات دولية' : 'International services'
      ],
      minDeposit: 2000000,
      currency: 'SYP',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'freelancer',
      type: 'business',
      name: t.freelancerAccount,
      description: t.freelancerAccountDesc,
      icon: Laptop,
      benefits: [
        language === 'ar' ? 'إدارة الفواتير' : 'Invoice management',
        language === 'ar' ? 'تتبع المشاريع' : 'Project tracking',
        language === 'ar' ? 'تحويلات دولية' : 'International transfers',
        language === 'ar' ? 'أدوات ضريبية' : 'Tax tools'
      ],
      minDeposit: 50000,
      currency: 'SYP',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    }
  ];

  const AccountCard = ({ account }: { account: AccountCategory }) => {
    const Icon = account.icon;
    
    return (
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 hover:border-blue-200">
        {account.popular && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            {t.popular}
          </Badge>
        )}
        
        <CardHeader className="pb-3">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${account.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`h-8 w-8 ${account.color}`} />
          </div>
          <CardTitle className="text-lg mb-2">{account.name}</CardTitle>
          <p className="text-sm text-gray-600 leading-relaxed">{account.description}</p>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{t.minDeposit}:</span>
              <span className="font-bold text-gray-900">
                {account.minDeposit.toLocaleString()} {account.currency}
              </span>
            </div>
            
            <div className="space-y-2">
              {account.benefits.slice(0, 3).map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={() => onCategorySelect(account)}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
              size="sm"
            >
              {t.selectAccount}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Personal Accounts Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{t.personalAccounts}</h3>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'حسابات مصممة خصيصاً للأفراد والاستخدام الشخصي'
                : 'Accounts designed specifically for individuals and personal use'
              }
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalAccounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </div>

      {/* Business Accounts Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center">
            <Building2 className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{t.businessAccounts}</h3>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'حلول مصرفية متكاملة للشركات والأعمال التجارية'
                : 'Comprehensive banking solutions for companies and businesses'
              }
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessAccounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountCategorySelector;
