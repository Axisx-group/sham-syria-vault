
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  User,
  FileText,
  Camera,
  CreditCard,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface KYCFormData {
  level: 'basic' | 'intermediate' | 'advanced';
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    phoneNumber: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  documents: {
    idDocument?: File;
    proofOfAddress?: File;
    bankStatement?: File;
    employmentLetter?: File;
    selfie?: File;
  };
  financialInfo: {
    occupation: string;
    monthlyIncome: string;
    sourceOfFunds: string;
    expectedTransactionVolume: string;
  };
}

const KYCVerificationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState<'basic' | 'intermediate' | 'advanced'>('basic');
  const [formData, setFormData] = useState<KYCFormData>({
    level: 'basic',
    personalInfo: {
      fullName: '',
      dateOfBirth: '',
      nationality: '',
      phoneNumber: '',
      email: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'سوريا'
    },
    documents: {},
    financialInfo: {
      occupation: '',
      monthlyIncome: '',
      sourceOfFunds: '',
      expectedTransactionVolume: ''
    }
  });

  const kycLevels = [
    {
      id: 'basic',
      title: 'التحقق الأساسي',
      description: 'تحقق سريع للمعاملات البسيطة',
      limits: 'حد أقصى: $1,000 شهرياً',
      requirements: ['الهوية الشخصية', 'رقم الهاتف', 'البريد الإلكتروني'],
      color: 'bg-green-100 text-green-800',
      icon: User
    },
    {
      id: 'intermediate',
      title: 'التحقق المتوسط',
      description: 'تحقق شامل للمعاملات المتوسطة',
      limits: 'حد أقصى: $10,000 شهرياً',
      requirements: ['جميع متطلبات المستوى الأساسي', 'إثبات العنوان', 'كشف حساب بنكي'],
      color: 'bg-blue-100 text-blue-800',
      icon: Shield
    },
    {
      id: 'advanced',
      title: 'التحقق المتقدم',
      description: 'تحقق كامل للمعاملات الكبيرة',
      limits: 'حد أقصى: $100,000 شهرياً',
      requirements: ['جميع المتطلبات السابقة', 'إثبات الدخل', 'مصدر الأموال', 'صورة شخصية'],
      color: 'bg-purple-100 text-purple-800',
      icon: CreditCard
    }
  ];

  const getProgress = () => {
    const totalSteps = selectedLevel === 'basic' ? 3 : selectedLevel === 'intermediate' ? 4 : 5;
    return (currentStep / totalSteps) * 100;
  };

  const handleInputChange = (section: keyof KYCFormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section] as any,
        [field]: value
      }
    }));
  };

  const handleFileUpload = (documentType: keyof KYCFormData['documents'], file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
  };

  const renderLevelSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">اختر مستوى التحقق المطلوب</h2>
        <p className="text-gray-600">اختر المستوى الذي يناسب احتياجاتك المصرفية</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kycLevels.map((level) => {
          const IconComponent = level.icon;
          return (
            <Card 
              key={level.id}
              className={`cursor-pointer transition-all ${
                selectedLevel === level.id 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedLevel(level.id as any)}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gray-100">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{level.title}</CardTitle>
                <Badge className={level.color}>{level.limits}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{level.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">المتطلبات:</h4>
                  <ul className="text-xs space-y-1">
                    {level.requirements.map((req, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">المعلومات الشخصية</h2>
        <p className="text-gray-600">أدخل معلوماتك الشخصية بدقة</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName">الاسم الكامل *</Label>
          <Input
            id="fullName"
            value={formData.personalInfo.fullName}
            onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
            placeholder="الاسم الكامل كما يظهر في الهوية"
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">تاريخ الميلاد *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="nationality">الجنسية *</Label>
          <Select onValueChange={(value) => handleInputChange('personalInfo', 'nationality', value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الجنسية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="syrian">سورية</SelectItem>
              <SelectItem value="lebanese">لبنانية</SelectItem>
              <SelectItem value="jordanian">أردنية</SelectItem>
              <SelectItem value="other">أخرى</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="phoneNumber">رقم الهاتف *</Label>
          <Input
            id="phoneNumber"
            value={formData.personalInfo.phoneNumber}
            onChange={(e) => handleInputChange('personalInfo', 'phoneNumber', e.target.value)}
            placeholder="+963 XXX XXX XXX"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="email">البريد الإلكتروني *</Label>
          <Input
            id="email"
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            placeholder="example@email.com"
          />
        </div>
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">معلومات العنوان</h2>
        <p className="text-gray-600">أدخل عنوان إقامتك الحالي</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label htmlFor="street">العنوان التفصيلي *</Label>
          <Input
            id="street"
            value={formData.address.street}
            onChange={(e) => handleInputChange('address', 'street', e.target.value)}
            placeholder="الشارع والرقم"
          />
        </div>
        <div>
          <Label htmlFor="city">المدينة *</Label>
          <Input
            id="city"
            value={formData.address.city}
            onChange={(e) => handleInputChange('address', 'city', e.target.value)}
            placeholder="المدينة"
          />
        </div>
        <div>
          <Label htmlFor="state">المحافظة</Label>
          <Input
            id="state"
            value={formData.address.state}
            onChange={(e) => handleInputChange('address', 'state', e.target.value)}
            placeholder="المحافظة"
          />
        </div>
        <div>
          <Label htmlFor="postalCode">الرمز البريدي</Label>
          <Input
            id="postalCode"
            value={formData.address.postalCode}
            onChange={(e) => handleInputChange('address', 'postalCode', e.target.value)}
            placeholder="الرمز البريدي"
          />
        </div>
        <div>
          <Label htmlFor="country">البلد *</Label>
          <Select onValueChange={(value) => handleInputChange('address', 'country', value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر البلد" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="سوريا">سوريا</SelectItem>
              <SelectItem value="لبنان">لبنان</SelectItem>
              <SelectItem value="الأردن">الأردن</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderDocumentUpload = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">رفع المستندات</h2>
        <p className="text-gray-600">ارفع المستندات المطلوبة للتحقق</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ID Document */}
        <div className="space-y-2">
          <Label>الهوية الشخصية *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">ارفع صورة الهوية الشخصية</p>
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => e.target.files && handleFileUpload('idDocument', e.target.files[0])}
              className="hidden"
              id="idDocument"
            />
            <Label htmlFor="idDocument" className="cursor-pointer">
              <Button variant="outline" size="sm" asChild>
                <span>اختر ملف</span>
              </Button>
            </Label>
            {formData.documents.idDocument && (
              <p className="text-green-600 text-sm mt-2">
                ✓ {formData.documents.idDocument.name}
              </p>
            )}
          </div>
        </div>

        {/* Proof of Address */}
        {(selectedLevel === 'intermediate' || selectedLevel === 'advanced') && (
          <div className="space-y-2">
            <Label>إثبات العنوان *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">فاتورة كهرباء أو ماء أو غاز</p>
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => e.target.files && handleFileUpload('proofOfAddress', e.target.files[0])}
                className="hidden"
                id="proofOfAddress"
              />
              <Label htmlFor="proofOfAddress" className="cursor-pointer">
                <Button variant="outline" size="sm" asChild>
                  <span>اختر ملف</span>
                </Button>
              </Label>
              {formData.documents.proofOfAddress && (
                <p className="text-green-600 text-sm mt-2">
                  ✓ {formData.documents.proofOfAddress.name}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Bank Statement */}
        {(selectedLevel === 'intermediate' || selectedLevel === 'advanced') && (
          <div className="space-y-2">
            <Label>كشف حساب بنكي *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <CreditCard className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">كشف حساب آخر 3 أشهر</p>
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => e.target.files && handleFileUpload('bankStatement', e.target.files[0])}
                className="hidden"
                id="bankStatement"
              />
              <Label htmlFor="bankStatement" className="cursor-pointer">
                <Button variant="outline" size="sm" asChild>
                  <span>اختر ملف</span>
                </Button>
              </Label>
              {formData.documents.bankStatement && (
                <p className="text-green-600 text-sm mt-2">
                  ✓ {formData.documents.bankStatement.name}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Selfie */}
        {selectedLevel === 'advanced' && (
          <div className="space-y-2">
            <Label>صورة شخصية مع الهوية *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">صورة واضحة تحمل فيها هويتك</p>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && handleFileUpload('selfie', e.target.files[0])}
                className="hidden"
                id="selfie"
              />
              <Label htmlFor="selfie" className="cursor-pointer">
                <Button variant="outline" size="sm" asChild>
                  <span>التقط صورة</span>
                </Button>
              </Label>
              {formData.documents.selfie && (
                <p className="text-green-600 text-sm mt-2">
                  ✓ {formData.documents.selfie.name}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderFinancialInfo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">المعلومات المالية</h2>
        <p className="text-gray-600">معلومات عن وضعك المالي ومصدر الأموال</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="occupation">المهنة *</Label>
          <Input
            id="occupation"
            value={formData.financialInfo.occupation}
            onChange={(e) => handleInputChange('financialInfo', 'occupation', e.target.value)}
            placeholder="مهنتك الحالية"
          />
        </div>
        <div>
          <Label htmlFor="monthlyIncome">الدخل الشهري *</Label>
          <Select onValueChange={(value) => handleInputChange('financialInfo', 'monthlyIncome', value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الدخل الشهري" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less-500">أقل من $500</SelectItem>
              <SelectItem value="500-1000">$500 - $1,000</SelectItem>
              <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
              <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
              <SelectItem value="more-10000">أكثر من $10,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sourceOfFunds">مصدر الأموال *</Label>
          <Select onValueChange={(value) => handleInputChange('financialInfo', 'sourceOfFunds', value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر مصدر الأموال" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="salary">راتب</SelectItem>
              <SelectItem value="business">أعمال تجارية</SelectItem>
              <SelectItem value="investments">استثمارات</SelectItem>
              <SelectItem value="inheritance">إرث</SelectItem>
              <SelectItem value="other">أخرى</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="expectedVolume">حجم المعاملات المتوقع *</Label>
          <Select onValueChange={(value) => handleInputChange('financialInfo', 'expectedTransactionVolume', value)}>
            <SelectTrigger>
              <SelectValue placeholder="الحجم الشهري المتوقع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less-1000">أقل من $1,000</SelectItem>
              <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
              <SelectItem value="5000-25000">$5,000 - $25,000</SelectItem>
              <SelectItem value="more-25000">أكثر من $25,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderLevelSelection();
      case 2:
        return renderPersonalInfo();
      case 3:
        return renderAddressInfo();
      case 4:
        return renderDocumentUpload();
      case 5:
        return renderFinancialInfo();
      default:
        return renderLevelSelection();
    }
  };

  const handleNext = () => {
    const maxSteps = selectedLevel === 'basic' ? 4 : selectedLevel === 'intermediate' ? 4 : 5;
    if (currentStep < maxSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('KYC Form submitted:', formData);
    // Here you would submit to your backend
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">التحقق من الهوية (KYC)</CardTitle>
              <p className="text-gray-600">تحقق من هويتك لضمان أمان حسابك</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              المستوى: {selectedLevel === 'basic' ? 'أساسي' : selectedLevel === 'intermediate' ? 'متوسط' : 'متقدم'}
            </Badge>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>التقدم</span>
              <span>{Math.round(getProgress())}%</span>
            </div>
            <Progress value={getProgress()} className="w-full" />
          </div>
        </CardHeader>
        <CardContent>
          {renderCurrentStep()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              السابق
            </Button>
            
            {currentStep === (selectedLevel === 'basic' ? 4 : selectedLevel === 'intermediate' ? 4 : 5) ? (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                تقديم طلب التحقق
              </Button>
            ) : (
              <Button onClick={handleNext}>
                التالي
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCVerificationForm;
