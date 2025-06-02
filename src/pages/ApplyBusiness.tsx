
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Building2, MapPin, CreditCard, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ApplyBusiness = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Business info
    businessName: '',
    businessType: '',
    businessRegistrationNumber: '',
    businessTaxId: '',
    // Address
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Syria',
    // Preferences
    preferredCurrency: 'SYP',
    initialDeposit: '',
    requestDebitCard: false,
    requestCreditCard: false
  });
  const [documents, setDocuments] = useState<{
    nationalId?: File;
    businessLicense?: File;
    commercialRegistration?: File;
  }>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (documentType: 'nationalId' | 'businessLicense' | 'commercialRegistration', file: File | null) => {
    if (file) {
      setDocuments(prev => ({ ...prev, [documentType]: file }));
    }
  };

  const submitApplication = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "يجب تسجيل الدخول أولاً",
          description: "يرجى تسجيل الدخول لتقديم طلب فتح الحساب",
          variant: "destructive"
        });
        navigate('/dashboard');
        return;
      }

      // Create application
      const { data: application, error: appError } = await supabase
        .from('account_applications')
        .insert({
          user_id: user.id,
          account_type: 'business',
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          business_name: formData.businessName,
          business_type: formData.businessType,
          business_registration_number: formData.businessRegistrationNumber,
          business_tax_id: formData.businessTaxId,
          address_line1: formData.addressLine1,
          address_line2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postalCode,
          country: formData.country,
          preferred_currency: formData.preferredCurrency,
          initial_deposit: formData.initialDeposit ? parseFloat(formData.initialDeposit) : null,
          request_debit_card: formData.requestDebitCard,
          request_credit_card: formData.requestCreditCard
        })
        .select()
        .single();

      if (appError) throw appError;

      // Upload documents
      for (const [docType, file] of Object.entries(documents)) {
        if (file) {
          const fileName = `${user.id}/${application.id}/${docType}_${Date.now()}.${file.name.split('.').pop()}`;
          const { error: uploadError } = await supabase.storage
            .from('application-documents')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          let documentType = 'national_id';
          if (docType === 'businessLicense') documentType = 'business_license';
          if (docType === 'commercialRegistration') documentType = 'commercial_registration';

          const { error: docError } = await supabase
            .from('application_documents')
            .insert({
              application_id: application.id,
              document_type: documentType,
              file_name: file.name,
              file_path: fileName,
              file_size: file.size,
              mime_type: file.type
            });

          if (docError) throw docError;
        }
      }

      toast({
        title: "تم تقديم الطلب بنجاح!",
        description: "سيتم مراجعة طلبكم والرد عليكم في أقرب وقت ممكن"
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "خطأ في تقديم الطلب",
        description: "حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة للصفحة الرئيسية
          </Button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">تقديم طلب فتح حساب تجاري</h1>
          <p className="text-gray-600">املأ النموذج التالي لفتح حسابك التجاري الجديد</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-16 h-1 ${
                    step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 1 && <><User className="h-5 w-5" /> البيانات الشخصية</>}
              {step === 2 && <><Building2 className="h-5 w-5" /> بيانات الشركة</>}
              {step === 3 && <><MapPin className="h-5 w-5" /> بيانات العنوان</>}
              {step === 4 && <><CreditCard className="h-5 w-5" /> تفضيلات الحساب والوثائق</>}
            </CardTitle>
            <CardDescription>
              {step === 1 && "أدخل بياناتك الشخصية كممثل الشركة"}
              {step === 2 && "أدخل تفاصيل شركتك أو مؤسستك"}
              {step === 3 && "أدخل تفاصيل عنوان الشركة"}
              {step === 4 && "اختر تفضيلات حسابك وارفع الوثائق المطلوبة"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">الاسم الأول *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">اسم العائلة *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="businessName">اسم الشركة *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="businessType">نوع النشاط التجاري *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع النشاط" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trading">تجارة</SelectItem>
                      <SelectItem value="manufacturing">تصنيع</SelectItem>
                      <SelectItem value="services">خدمات</SelectItem>
                      <SelectItem value="technology">تكنولوجيا</SelectItem>
                      <SelectItem value="construction">إنشاءات</SelectItem>
                      <SelectItem value="retail">تجارة تجزئة</SelectItem>
                      <SelectItem value="restaurant">مطاعم</SelectItem>
                      <SelectItem value="transport">نقل ومواصلات</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="businessRegistrationNumber">رقم القيد التجاري *</Label>
                    <Input
                      id="businessRegistrationNumber"
                      value={formData.businessRegistrationNumber}
                      onChange={(e) => handleInputChange('businessRegistrationNumber', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessTaxId">الرقم الضريبي</Label>
                    <Input
                      id="businessTaxId"
                      value={formData.businessTaxId}
                      onChange={(e) => handleInputChange('businessTaxId', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="addressLine1">العنوان الأول *</Label>
                  <Input
                    id="addressLine1"
                    value={formData.addressLine1}
                    onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="addressLine2">العنوان الثاني</Label>
                  <Input
                    id="addressLine2"
                    value={formData.addressLine2}
                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="city">المدينة *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">المحافظة</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">الرمز البريدي</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">البلد</Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Syria">سوريا</SelectItem>
                      <SelectItem value="Lebanon">لبنان</SelectItem>
                      <SelectItem value="Jordan">الأردن</SelectItem>
                      <SelectItem value="Palestine">فلسطين</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="preferredCurrency">العملة المفضلة</Label>
                    <Select value={formData.preferredCurrency} onValueChange={(value) => handleInputChange('preferredCurrency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SYP">ليرة سورية (SYP)</SelectItem>
                        <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                        <SelectItem value="EUR">يورو (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="initialDeposit">الإيداع الأولي (اختياري)</Label>
                    <Input
                      id="initialDeposit"
                      type="number"
                      value={formData.initialDeposit}
                      onChange={(e) => handleInputChange('initialDeposit', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="debitCard"
                      checked={formData.requestDebitCard}
                      onCheckedChange={(checked) => handleInputChange('requestDebitCard', checked)}
                    />
                    <Label htmlFor="debitCard">طلب بطاقة خصم</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="creditCard"
                      checked={formData.requestCreditCard}
                      onCheckedChange={(checked) => handleInputChange('requestCreditCard', checked)}
                    />
                    <Label htmlFor="creditCard">طلب بطاقة ائتمان</Label>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">الوثائق المطلوبة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="nationalId">الهوية الشخصية *</Label>
                      <div className="mt-2 flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <label htmlFor="nationalId" className="cursor-pointer">
                              <span>ارفع صورة الهوية</span>
                              <input
                                id="nationalId"
                                name="nationalId"
                                type="file"
                                className="sr-only"
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileChange('nationalId', e.target.files?.[0] || null)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      {documents.nationalId && (
                        <p className="text-sm text-green-600 mt-2">✓ {documents.nationalId.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="businessLicense">رخصة العمل *</Label>
                      <div className="mt-2 flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <label htmlFor="businessLicense" className="cursor-pointer">
                              <span>ارفع رخصة العمل</span>
                              <input
                                id="businessLicense"
                                name="businessLicense"
                                type="file"
                                className="sr-only"
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileChange('businessLicense', e.target.files?.[0] || null)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      {documents.businessLicense && (
                        <p className="text-sm text-green-600 mt-2">✓ {documents.businessLicense.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="commercialRegistration">السجل التجاري *</Label>
                      <div className="mt-2 flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <label htmlFor="commercialRegistration" className="cursor-pointer">
                              <span>ارفع السجل التجاري</span>
                              <input
                                id="commercialRegistration"
                                name="commercialRegistration"
                                type="file"
                                className="sr-only"
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileChange('commercialRegistration', e.target.files?.[0] || null)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      {documents.commercialRegistration && (
                        <p className="text-sm text-green-600 mt-2">✓ {documents.commercialRegistration.name}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                السابق
              </Button>
              
              {step < 4 ? (
                <Button onClick={nextStep}>
                  التالي
                </Button>
              ) : (
                <Button 
                  onClick={submitApplication}
                  disabled={loading || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.businessName || !formData.businessType || !formData.businessRegistrationNumber || !formData.addressLine1 || !formData.city || !documents.nationalId || !documents.businessLicense || !documents.commercialRegistration}
                >
                  {loading ? 'جاري التقديم...' : 'تقديم الطلب'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyBusiness;
