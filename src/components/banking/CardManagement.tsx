
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Eye, EyeOff, Lock, Unlock, Settings, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CardManagementProps {
  language: 'ar' | 'en';
}

const CardManagement: React.FC<CardManagementProps> = ({ language }) => {
  const [showCardNumbers, setShowCardNumbers] = useState(false);
  const { toast } = useToast();

  const translations = {
    ar: {
      cardManagement: "إدارة البطاقات",
      myCards: "بطاقاتي",
      cardNumber: "رقم البطاقة",
      expiryDate: "تاريخ الانتهاء",
      status: "الحالة",
      actions: "الإجراءات",
      active: "نشطة",
      blocked: "محجوبة",
      expired: "منتهية الصلاحية",
      block: "حجب",
      unblock: "إلغاء الحجب",
      settings: "الإعدادات",
      requestNew: "طلب بطاقة جديدة",
      debitCard: "بطاقة دفع",
      creditCard: "بطاقة ائتمان",
      mastercard: "ماستركارد",
      visa: "فيزا",
      cardBlocked: "تم حجب البطاقة",
      cardUnblocked: "تم إلغاء حجب البطاقة"
    },
    en: {
      cardManagement: "Card Management",
      myCards: "My Cards",
      cardNumber: "Card Number",
      expiryDate: "Expiry Date",
      status: "Status",
      actions: "Actions",
      active: "Active",
      blocked: "Blocked",
      expired: "Expired",
      block: "Block",
      unblock: "Unblock",
      settings: "Settings",
      requestNew: "Request New Card",
      debitCard: "Debit Card",
      creditCard: "Credit Card",
      mastercard: "Mastercard",
      visa: "Visa",
      cardBlocked: "Card has been blocked",
      cardUnblocked: "Card has been unblocked"
    }
  };

  const t = translations[language];

  const [cards, setCards] = useState([
    {
      id: '1',
      type: t.debitCard,
      brand: t.mastercard,
      number: '5432 **** **** 1234',
      expiry: '12/26',
      status: 'active' as const,
      color: 'bg-gradient-to-r from-blue-600 to-purple-600'
    },
    {
      id: '2',
      type: t.creditCard,
      brand: t.visa,
      number: '4567 **** **** 8901',
      expiry: '08/25',
      status: 'active' as const,
      color: 'bg-gradient-to-r from-green-600 to-teal-600'
    },
    {
      id: '3',
      type: t.debitCard,
      brand: t.visa,
      number: '4321 **** **** 5678',
      expiry: '03/24',
      status: 'expired' as const,
      color: 'bg-gradient-to-r from-gray-600 to-gray-700'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">{t.active}</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-800">{t.blocked}</Badge>;
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800">{t.expired}</Badge>;
      default:
        return null;
    }
  };

  const toggleCardStatus = (cardId: string) => {
    setCards(cards.map(card => {
      if (card.id === cardId && card.status !== 'expired') {
        const newStatus = card.status === 'active' ? 'blocked' : 'active';
        toast({
          title: newStatus === 'blocked' ? t.cardBlocked : t.cardUnblocked,
          description: `${card.brand} ${card.type} ${card.number}`,
        });
        return { ...card, status: newStatus as 'active' | 'blocked' };
      }
      return card;
    }));
  };

  const maskCardNumber = (number: string) => {
    if (showCardNumbers) {
      return number.replace(/\*/g, '1'); // Show dummy numbers
    }
    return number;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t.myCards}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCardNumbers(!showCardNumbers)}
          >
            {showCardNumbers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            {t.requestNew}
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {cards.map(card => (
          <Card key={card.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Card Visual */}
                <div className={`${card.color} p-6 text-white relative`}>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-sm opacity-90">{card.type}</p>
                      <p className="font-semibold">{card.brand}</p>
                    </div>
                    <CreditCard className="h-8 w-8 opacity-80" />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs opacity-75 mb-1">{t.cardNumber}</p>
                      <p className="font-mono text-lg tracking-wider">
                        {maskCardNumber(card.number)}
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs opacity-75">{t.expiryDate}</p>
                        <p className="font-mono">{card.expiry}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-75">Bank Aljazira</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Controls */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{t.status}</span>
                    {getStatusBadge(card.status)}
                  </div>

                  <div className="space-y-2">
                    {card.status !== 'expired' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => toggleCardStatus(card.id)}
                      >
                        {card.status === 'active' ? (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            {t.block}
                          </>
                        ) : (
                          <>
                            <Unlock className="h-4 w-4 mr-2" />
                            {t.unblock}
                          </>
                        )}
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {t.settings}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardManagement;
