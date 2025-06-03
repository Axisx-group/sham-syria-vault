
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone,
  CreditCard,
  QrCode,
  NfcIcon,
  Shield,
  CheckCircle,
  Fingerprint,
  Eye
} from "lucide-react";

const MobilePaymentIntegration = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: <Smartphone className="h-6 w-6" />,
      description: 'الدفع السريع والآمن',
      available: true,
      color: 'bg-green-600'
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'الدفع بلمسة واحدة',
      available: true,
      color: 'bg-gray-800'
    },
    {
      id: 'nfc-payment',
      name: 'NFC Payment',
      icon: <NfcIcon className="h-6 w-6" />,
      description: 'الدفع اللاسلكي',
      available: true,
      color: 'bg-blue-600'
    },
    {
      id: 'qr-payment',
      name: 'QR Code',
      icon: <QrCode className="h-6 w-6" />,
      description: 'المسح والدفع',
      available: true,
      color: 'bg-purple-600'
    }
  ];

  const handlePayment = async () => {
    if (!selectedPaymentMethod || !amount) return;

    setIsPaymentProcessing(true);
    
    // محاكاة عملية الدفع
    setTimeout(() => {
      setIsPaymentProcessing(false);
      // هنا يمكن إضافة منطق الدفع الفعلي
      alert(`تم الدفع بنجاح باستخدام ${selectedPaymentMethod} بمبلغ ${amount} ليرة سورية`);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">الدفع المحمول</h2>
        <p className="text-gray-600">ادفع بسهولة وأمان من هاتفك المحمول</p>
      </div>

      {/* Payment Amount */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            مبلغ الدفع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Input
              type="number"
              placeholder="أدخل المبلغ"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1"
            />
            <div className="text-lg font-semibold text-gray-700">ليرة سورية</div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>اختر طريقة الدفع</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedPaymentMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPaymentMethod(method.id)}
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`p-3 rounded-full ${method.color} text-white`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  {method.available && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      متاح
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Biometric Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Fingerprint className="h-5 w-5 mr-2" />
            المصادقة البيومترية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center justify-center space-y-2"
            >
              <Fingerprint className="h-6 w-6" />
              <span>بصمة الإصبع</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center justify-center space-y-2"
            >
              <Eye className="h-6 w-6" />
              <span>التعرف على الوجه</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Shield className="h-6 w-6 text-green-600" />
            <div>
              <h4 className="font-medium text-green-900">الأمان المتقدم</h4>
              <p className="text-sm text-green-700">
                جميع المعاملات محمية بتشفير من طرف إلى طرف ومصادقة ثنائية العامل
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Button */}
      <Button
        onClick={handlePayment}
        disabled={!selectedPaymentMethod || !amount || isPaymentProcessing}
        className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
      >
        {isPaymentProcessing ? (
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>جاري المعالجة...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 space-x-reverse">
            <CreditCard className="h-5 w-5" />
            <span>تأكيد الدفع</span>
          </div>
        )}
      </Button>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>المعاملات الأخيرة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 1, method: 'Google Pay', amount: '150,000', date: '2024-01-20', status: 'مكتمل' },
              { id: 2, method: 'Apple Pay', amount: '75,000', date: '2024-01-19', status: 'مكتمل' },
              { id: 3, method: 'NFC Payment', amount: '25,000', date: '2024-01-18', status: 'مكتمل' }
            ].map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.method}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{transaction.amount} ل.س</p>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobilePaymentIntegration;
