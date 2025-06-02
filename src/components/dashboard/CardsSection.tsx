
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, CreditCard, Eye, EyeOff, Settings } from "lucide-react";

interface CardsSectionProps {
  language: 'ar' | 'en';
}

const CardsSection: React.FC<CardsSectionProps> = ({ language }) => {
  const translations = {
    ar: {
      myCards: "بطاقاتي",
      addNewCard: "إضافة بطاقة جديدة",
      cardNumber: "رقم البطاقة",
      expiryDate: "تاريخ الانتهاء",
      cardHolder: "حامل البطاقة",
      active: "نشطة",
      virtual: "افتراضية",
      physical: "فيزيائية",
      frozen: "مجمدة",
      manageCard: "إدارة البطاقة"
    },
    en: {
      myCards: "My Cards",
      addNewCard: "Add New Card",
      cardNumber: "Card Number",
      expiryDate: "Expiry Date",
      cardHolder: "Card Holder",
      active: "Active",
      virtual: "Virtual",
      physical: "Physical", 
      frozen: "Frozen",
      manageCard: "Manage Card"
    }
  };

  const t = translations[language];

  const cards = [
    {
      id: 1,
      type: 'virtual',
      number: '4532 •••• •••• 1234',
      holder: 'احمد محمد',
      expiry: '12/26',
      status: 'active',
      color: 'bg-gradient-to-r from-blue-600 to-blue-800'
    },
    {
      id: 2,
      type: 'physical',
      number: '5678 •••• •••• 9012',
      holder: 'احمد محمد',
      expiry: '08/27',
      status: 'active',
      color: 'bg-gradient-to-r from-purple-600 to-purple-800'
    },
    {
      id: 3,
      type: 'virtual',
      number: '1234 •••• •••• 5678',
      holder: 'احمد محمد',
      expiry: '03/25',
      status: 'frozen',
      color: 'bg-gradient-to-r from-gray-600 to-gray-800'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.myCards}</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t.addNewCard}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            {/* Card Visual */}
            <div className={`${card.color} p-6 text-white relative h-48`}>
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                    {card.type === 'virtual' ? t.virtual : t.physical}
                  </Badge>
                </div>
                <Badge 
                  variant={card.status === 'active' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {card.status === 'active' ? t.active : t.frozen}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-80">{t.cardNumber}</p>
                  <p className="font-mono text-lg">{card.number}</p>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-80">{t.cardHolder}</p>
                    <p className="font-medium">{card.holder}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">{t.expiryDate}</p>
                    <p className="font-medium">{card.expiry}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'عرض' : 'View'}
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="h-4 w-4 mr-2" />
                  {t.manageCard}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardsSection;
