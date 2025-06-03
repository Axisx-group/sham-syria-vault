
import React from 'react';
import { Check, X } from "lucide-react";

interface CardsComparisonProps {
  language: 'ar' | 'en';
}

const CardsComparison: React.FC<CardsComparisonProps> = ({ language }) => {
  const translations = {
    ar: {
      title: "مقارنة البطاقات",
      subtitle: "اختر البطاقة التي تناسب احتياجاتك",
      features: {
        creditLimit: "الحد الائتماني",
        cashback: "استرداد نقدي",
        loungeAccess: "دخول صالات المطار",
        concierge: "خدمة الكونسيرج",
        insurance: "تأمين السفر",
        rewards: "برنامج المكافآت",
        fees: "الرسوم السنوية",
        support: "الدعم الفني"
      },
      platinum: "بلاتينية إليت",
      gold: "ذهبية برستيج",
      classic: "كلاسيكية سمارت",
      unlimited: "غير محدود",
      limited: "محدود",
      basic: "أساسي",
      premium: "متميز",
      free: "مجاني",
      paid: "مدفوع"
    },
    en: {
      title: "Compare Cards",
      subtitle: "Choose the card that suits your needs",
      features: {
        creditLimit: "Credit Limit",
        cashback: "Cashback",
        loungeAccess: "Airport Lounge Access",
        concierge: "Concierge Service",
        insurance: "Travel Insurance",
        rewards: "Rewards Program",
        fees: "Annual Fees",
        support: "Technical Support"
      },
      platinum: "Platinum Elite",
      gold: "Gold Prestige",
      classic: "Classic Smart",
      unlimited: "Unlimited",
      limited: "Limited",
      basic: "Basic",
      premium: "Premium",
      free: "Free",
      paid: "Paid"
    }
  };

  const t = translations[language];

  const comparisonData = [
    {
      feature: t.features.creditLimit,
      platinum: t.unlimited,
      gold: "50,000 $",
      classic: "10,000 $"
    },
    {
      feature: t.features.cashback,
      platinum: "5%",
      gold: "3%",
      classic: "1%"
    },
    {
      feature: t.features.loungeAccess,
      platinum: true,
      gold: true,
      classic: false
    },
    {
      feature: t.features.concierge,
      platinum: true,
      gold: false,
      classic: false
    },
    {
      feature: t.features.insurance,
      platinum: t.premium,
      gold: t.basic,
      classic: t.basic
    },
    {
      feature: t.features.rewards,
      platinum: "5x",
      gold: "3x",
      classic: "1x"
    },
    {
      feature: t.features.fees,
      platinum: "$500",
      gold: "$200",
      classic: t.free
    },
    {
      feature: t.features.support,
      platinum: "24/7 VIP",
      gold: "24/7",
      classic: "24/7"
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">{t.title}</h2>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-slate-900 to-slate-800">
                <th className="px-8 py-6 text-left text-white font-bold text-lg">المزايا</th>
                <th className="px-8 py-6 text-center text-white font-bold text-lg">{t.platinum}</th>
                <th className="px-8 py-6 text-center text-white font-bold text-lg">{t.gold}</th>
                <th className="px-8 py-6 text-center text-white font-bold text-lg">{t.classic}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'} hover:bg-blue-50/50 transition-colors`}>
                  <td className="px-8 py-6 font-semibold text-gray-900">{row.feature}</td>
                  <td className="px-8 py-6 text-center">
                    {typeof row.platinum === 'boolean' ? (
                      row.platinum ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="font-semibold text-purple-600">{row.platinum}</span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-center">
                    {typeof row.gold === 'boolean' ? (
                      row.gold ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="font-semibold text-amber-600">{row.gold}</span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-center">
                    {typeof row.classic === 'boolean' ? (
                      row.classic ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="font-semibold text-blue-600">{row.classic}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CardsComparison;
