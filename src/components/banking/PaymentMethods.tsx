
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  CreditCard,
  Smartphone,
  QrCode,
  DollarSign,
  Lock,
  CheckCircle,
  Plus,
  Trash2
} from "lucide-react";

interface PaymentMethod {
  id: string;
  type: 'card' | 'wallet' | 'bank';
  name: string;
  details: string;
  logo: string;
  isDefault: boolean;
  status: 'active' | 'inactive';
}

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'بطاقة ائتمان فيزا',
      details: '**** **** **** 1234',
      logo: 'visa',
      isDefault: true,
      status: 'active'
    },
    {
      id: '2',
      type: 'wallet',
      name: 'محفظة Google Pay',
      details: 'ahmed.ali@gmail.com',
      logo: 'google-pay',
      isDefault: false,
      status: 'active'
    },
    {
      id: '3',
      type: 'wallet',
      name: 'محفظة Apple Pay',
      details: 'iPhone 14 Pro',
      logo: 'apple-pay',
      isDefault: false,
      status: 'active'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCVV, setNewCardCVV] = useState('');

  const handleAddCard = () => {
    if (newCardNumber && newCardExpiry && newCardCVV) {
      const newCard: PaymentMethod = {
        id: Date.now().toString(),
        type: 'card',
        name: 'بطاقة ائتمان جديدة',
        details: `**** **** **** ${newCardNumber.slice(-4)}`,
        logo: 'visa',
        isDefault: false,
        status: 'active'
      };
      setPaymentMethods([...paymentMethods, newCard]);
      setNewCardNumber('');
      setNewCardExpiry('');
      setNewCardCVV('');
      setShowAddForm(false);
    }
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="h-6 w-6" />;
      case 'wallet':
        return <Smartphone className="h-6 w-6" />;
      case 'bank':
        return <DollarSign className="h-6 w-6" />;
      default:
        return <CreditCard className="h-6 w-6" />;
    }
  };

  const getMethodColor = (type: string) => {
    switch (type) {
      case 'card':
        return 'bg-blue-500';
      case 'wallet':
        return 'bg-green-500';
      case 'bank':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">طرق الدفع</h2>
          <p className="text-gray-600">إدارة وإضافة طرق الدفع الخاصة بك</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          إضافة طريقة دفع
        </Button>
      </div>

      {/* Add New Payment Method Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              إضافة بطاقة ائتمان جديدة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم البطاقة
                </label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={newCardNumber}
                  onChange={(e) => setNewCardNumber(e.target.value)}
                  maxLength={19}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاريخ الانتهاء
                </label>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={newCardExpiry}
                  onChange={(e) => setNewCardExpiry(e.target.value)}
                  maxLength={5}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رمز الأمان (CVV)
                </label>
                <Input
                  type="text"
                  placeholder="123"
                  value={newCardCVV}
                  onChange={(e) => setNewCardCVV(e.target.value)}
                  maxLength={4}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddCard} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                إضافة البطاقة
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
              >
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Methods List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`p-3 rounded-full ${getMethodColor(method.type)} text-white`}>
                    {getMethodIcon(method.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.details}</p>
                  </div>
                </div>
                {method.isDefault && (
                  <Badge className="bg-green-100 text-green-800">
                    افتراضي
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Lock className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">آمن</span>
                </div>
                <Badge 
                  className={method.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                  }
                >
                  {method.status === 'active' ? 'نشط' : 'غير نشط'}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setPaymentMethods(methods => 
                      methods.map(m => ({
                        ...m,
                        isDefault: m.id === method.id
                      }))
                    );
                  }}
                  disabled={method.isDefault}
                >
                  {method.isDefault ? 'افتراضي' : 'جعل افتراضي'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => {
                    setPaymentMethods(methods => 
                      methods.filter(m => m.id !== method.id)
                    );
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Digital Wallet Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <QrCode className="h-5 w-5 mr-2" />
            المحافظ الرقمية المتاحة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center justify-center space-y-2"
            >
              <div className="text-lg font-bold text-blue-600">Google Pay</div>
              <div className="text-xs text-gray-500">ربط محفظة Google Pay</div>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center justify-center space-y-2"
            >
              <div className="text-lg font-bold text-gray-800">Apple Pay</div>
              <div className="text-xs text-gray-500">ربط محفظة Apple Pay</div>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center justify-center space-y-2"
            >
              <div className="text-lg font-bold text-green-600">PayPal</div>
              <div className="text-xs text-gray-500">ربط حساب PayPal</div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Lock className="h-5 w-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-900">الأمان والحماية</h4>
              <p className="text-sm text-blue-700">
                جميع طرق الدفع محمية بتشفير 256-bit SSL ومعايير الأمان المصرفية العالمية
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethods;
