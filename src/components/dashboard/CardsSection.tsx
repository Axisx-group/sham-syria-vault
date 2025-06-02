
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, CreditCard, Eye, EyeOff, Settings, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CardsSectionProps {
  language: 'ar' | 'en';
}

const CardsSection: React.FC<CardsSectionProps> = ({ language }) => {
  const { toast } = useToast();

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
      manageCard: "إدارة البطاقة",
      mastercard: "ماستركارد",
      visa: "فيزا",
      iban: "رقم IBAN",
      copyIban: "نسخ IBAN",
      ibanCopied: "تم نسخ رقم IBAN"
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
      manageCard: "Manage Card",
      mastercard: "Mastercard",
      visa: "Visa",
      iban: "IBAN Number",
      copyIban: "Copy IBAN",
      ibanCopied: "IBAN copied to clipboard"
    }
  };

  const t = translations[language];

  const cards = [
    {
      id: 1,
      type: 'virtual',
      cardType: 'mastercard',
      number: '5678 •••• •••• 1234',
      holder: 'احمد محمد',
      expiry: '12/26',
      status: 'active',
      color: 'bg-gradient-to-r from-orange-600 to-red-600',
      iban: 'SY0000010011234567890123',
      currency: 'USD'
    },
    {
      id: 2,
      type: 'physical',
      cardType: 'visa',
      number: '4532 •••• •••• 9012',
      holder: 'احمد محمد',
      expiry: '08/27',
      status: 'active',
      color: 'bg-gradient-to-r from-blue-600 to-blue-800',
      iban: 'SY0000010011234567890124',
      currency: 'EUR'
    },
    {
      id: 3,
      type: 'virtual',
      cardType: 'mastercard',
      number: '5432 •••• •••• 5678',
      holder: 'احمد محمد',
      expiry: '03/25',
      status: 'frozen',
      color: 'bg-gradient-to-r from-gray-600 to-gray-800',
      iban: 'SY0000010011234567890125',
      currency: 'SYP'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: t.ibanCopied,
      description: text,
    });
  };

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
            <div className={`${card.color} p-6 text-white relative h-56`}>
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                    {card.type === 'virtual' ? t.virtual : t.physical}
                  </Badge>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge 
                    variant={card.status === 'active' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {card.status === 'active' ? t.active : t.frozen}
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                    {card.cardType === 'mastercard' ? t.mastercard : t.visa}
                  </Badge>
                </div>
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

                {/* Currency */}
                <div className="absolute top-6 right-6">
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                    {card.currency}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Card Details & Actions */}
            <CardContent className="p-4 space-y-3">
              {/* IBAN Section */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-600">{t.iban}</p>
                    <p className="font-mono text-sm text-gray-800">{card.iban}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(card.iban)}
                    className="ml-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
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
