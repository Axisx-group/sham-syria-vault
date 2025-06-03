import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, User, MapPin, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useKYCIntegration } from "@/hooks/useKYCIntegration";

const ApplyPersonal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createKYCApplication, uploadKYCDocument } = useKYCIntegration();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: 'Syrian',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Syria'
  });
  const [documents, setDocuments] = useState<{
    nationalId?: File;
    passport?: File;
  }>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (documentType: 'nationalId' | 'passport', file: File | null) => {
    if (file) {
      setDocuments(prev => ({ ...prev, [documentType]: file }));
    }
  };

  const submitApplication = async () => {
    setLoading(true);
    try {
      // Check if user is authenticated
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

      // Create application with SYP as default currency
      const { data: application, error: appError } = await supabase
        .from('account_applications')
        .insert({
          user_id: user.id,
          account_type: 'personal',
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth,
          nationality: formData.nationality,
          address_line1: formData.addressLine1,
          address_line2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postalCode,
          country: formData.country,
          preferred_currency: 'SYP'
        })
        .select()
        .single();

      if (appError) throw appError;

      // Create KYC application
      const kycData = {
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          nationality: formData.nationality
        },
        addressInfo: {
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country
        }
      };

      const kycApplication = await createKYCApplication(
        application.id,
        kycData,
        'basic' // Start with basic level for personal accounts
      );

      // Upload documents to KYC
      for (const [docType, file] of Object.entries(documents)) {
        if (file) {
          await uploadKYCDocument(
            kycApplication.id,
            docType === 'nationalId' ? 'national_id' : 'passport',
            file
          );
        }
      }

      toast({
        title: "تم تقديم الطلب بنجاح!",
        description: "سيتم مراجعة طلبكم وإجراء التحقق من الهوية. ستتلقون إشعاراً عند اكتمال المراجعة."
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
    if (step < 3) setStep(step + 1);
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
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">تقديم طلب فتح حساب شخصي</h1>
          <p className="text-gray-600">املأ النموذج التالي لفتح حسابك الشخصي الجديد (العملة الافتراضية: الليرة السورية)</p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>ملاحظة:</strong> سيتم إنشاء طلب للتحقق من الهوية (KYC) تلقائياً مع طلب فتح الحساب لضمان أمان حسابك.
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
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
              {step === 2 && <><MapPin className="h-5 w-5" /> بيانات العنوان</>}
              {step === 3 && <><FileText className="h-5 w-5" /> الوثائق المطلوبة للتحقق من الهوية</>}
            </CardTitle>
            <CardDescription>
              {step === 1 && "أدخل بياناتك الشخصية الأساسية"}
              {step === 2 && "أدخل تفاصيل عنوان إقامتك"}
              {step === 3 && "ارفع الوثائق المطلوبة لفتح الحساب والتحقق من الهوية"}
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
                <div>
                  <Label htmlFor="dateOfBirth">تاريخ الميلاد</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">الجنسية</Label>
                  <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Syrian">سوري</SelectItem>
                      <SelectItem value="Lebanese">لبناني</SelectItem>
                      <SelectItem value="Jordanian">أردني</SelectItem>
                      <SelectItem value="Palestinian">فلسطيني</SelectItem>
                      <SelectItem value="Other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
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

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">الوثائق المطلوبة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Label htmlFor="passport">جواز السفر (اختياري)</Label>
                      <div className="mt-2 flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <label htmlFor="passport" className="cursor-pointer">
                              <span>ارفع صورة جواز السفر</span>
                              <input
                                id="passport"
                                name="passport"
                                type="file"
                                className="sr-only"
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileChange('passport', e.target.files?.[0] || null)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      {documents.passport && (
                        <p className="text-sm text-green-600 mt-2">✓ {documents.passport.name}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
              >
                السابق
              </Button>
              
              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)}>
                  التالي
                </Button>
              ) : (
                <Button 
                  onClick={submitApplication}
                  disabled={loading || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.addressLine1 || !formData.city || !documents.nationalId}
                >
                  {loading ? 'جاري التقديم...' : 'تقديم الطلب مع التحقق من الهوية'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyPersonal;
