import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useKYCIntegration } from "@/hooks/useKYCIntegration";
import { AccountCategory } from "@/types/account";
import { getAccountDialogTranslations } from "@/utils/accountDialogTranslations";
import AccountCategorySelector from "./AccountCategorySelector";
import PersonalInfoForm from "./PersonalInfoForm";
import AddressInfoForm from "./AddressInfoForm";
import DocumentUploadForm from "./DocumentUploadForm";
import StepIndicator from "./StepIndicator";

interface NewAccountDialogProps {
  language: 'ar' | 'en';
}

const NewAccountDialog: React.FC<NewAccountDialogProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<AccountCategory | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { createKYCApplication, uploadKYCDocument } = useKYCIntegration();

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: 'Syrian'
  });

  const [addressInfo, setAddressInfo] = useState({
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
    drivingLicense?: File;
    europeanResidence?: File;
  }>({});

  const t = getAccountDialogTranslations(language);

  const stepTitles = [
    language === 'ar' ? 'نوع الحساب' : 'Account Type',
    language === 'ar' ? 'المعلومات الشخصية' : 'Personal Info',
    language === 'ar' ? 'معلومات العنوان' : 'Address Info',
    language === 'ar' ? 'الوثائق المطلوبة' : 'Documents'
  ];

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressInfoChange = (field: string, value: string) => {
    setAddressInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (documentType: 'nationalId' | 'passport' | 'drivingLicense' | 'europeanResidence', file: File | null) => {
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: language === 'ar' ? 'خطأ' : 'Error',
          description: language === 'ar' ? 'حجم الملف كبير جداً (الحد الأقصى 10MB)' : 'File size too large (max 10MB)',
          variant: 'destructive'
        });
        return;
      }
      setDocuments(prev => ({ ...prev, [documentType]: file }));
    } else {
      setDocuments(prev => {
        const updated = { ...prev };
        delete updated[documentType];
        return updated;
      });
    }
  };

  const handleCategorySelect = (category: AccountCategory) => {
    setSelectedCategory(category);
    setCurrentStep(2);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return selectedCategory !== null;
      case 2:
        return personalInfo.firstName && personalInfo.lastName && personalInfo.email && 
               personalInfo.phone && personalInfo.dateOfBirth && personalInfo.nationality;
      case 3:
        return addressInfo.addressLine1 && addressInfo.city && addressInfo.country;
      case 4:
        return Object.keys(documents).length > 0;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !isStepValid()) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'يرجى إكمال جميع الحقول المطلوبة' : 'Please complete all required fields',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      // إنشاء طلب الحساب بدون الحاجة لتسجيل الدخول
      const { data: application, error: appError } = await supabase
        .from('account_applications')
        .insert({
          user_id: null, // لا نحتاج user_id الآن
          account_type: 'personal',
          first_name: personalInfo.firstName,
          last_name: personalInfo.lastName,
          email: personalInfo.email,
          phone: personalInfo.phone,
          date_of_birth: personalInfo.dateOfBirth,
          nationality: personalInfo.nationality,
          address_line1: addressInfo.addressLine1,
          address_line2: addressInfo.addressLine2,
          city: addressInfo.city,
          state: addressInfo.state,
          postal_code: addressInfo.postalCode,
          country: addressInfo.country,
          preferred_currency: 'SYP',
          status: 'pending'
        })
        .select()
        .single();

      if (appError) throw appError;

      // حفظ بيانات العميل في جدول pending_customers
      const { error: pendingError } = await supabase
        .from('pending_customers')
        .insert({
          application_token: application.application_token,
          first_name: personalInfo.firstName,
          last_name: personalInfo.lastName,
          email: personalInfo.email,
          phone: personalInfo.phone
        });

      if (pendingError) throw pendingError;

      // إرسال الإيميلات
      try {
        await supabase.functions.invoke('send-application-emails', {
          body: {
            applicationToken: application.application_token,
            customerName: `${personalInfo.firstName} ${personalInfo.lastName}`,
            customerEmail: personalInfo.email,
            accountType: selectedCategory.name
          }
        });
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // لا نوقف العملية إذا فشل الإيميل
      }

      toast({
        title: language === 'ar' ? 'تم تقديم الطلب بنجاح!' : 'Application submitted successfully!',
        description: language === 'ar' 
          ? `رقم الطلب: ${application.application_token}\nسيتم إرسال إيميل تأكيد قريباً`
          : `Application ID: ${application.application_token}\nConfirmation email will be sent soon`,
      });

      // إعادة توجيه إلى صفحة حالة الطلب
      window.location.href = `/application-status?token=${application.application_token}`;

    } catch (error) {
      console.error('Error creating account application:', error);
      toast({
        title: language === 'ar' ? 'خطأ في تقديم الطلب' : 'Error submitting application',
        description: language === 'ar' ? 'حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى' : 'An error occurred while submitting the application. Please try again',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset form when dialog closes
      setCurrentStep(1);
      setSelectedCategory(null);
      setPersonalInfo({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        nationality: 'Syrian'
      });
      setAddressInfo({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Syria'
      });
      setDocuments({});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <PlusCircle className="h-5 w-5 mr-2" />
          {t.openNewAccount}
        </Button>
      </DialogTrigger>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <DialogHeader>
          <DialogTitle className="text-xl">
            {language === 'ar' ? 'فتح حساب جديد' : 'Open New Account'}
          </DialogTitle>
          <DialogDescription>
            {language === 'ar' 
              ? 'املأ النموذج التالي لفتح حسابك الجديد. سيتم مراجعة طلبكم والتواصل معكم قريباً'
              : 'Fill out the form below to open your new account. Your application will be reviewed and we will contact you soon'
            }
          </DialogDescription>
        </DialogHeader>

        <StepIndicator 
          currentStep={currentStep}
          totalSteps={4}
          stepTitles={stepTitles}
          language={language}
        />

        <div className="py-4">
          {currentStep === 1 && (
            <AccountCategorySelector 
              onCategorySelect={handleCategorySelect}
              language={language}
            />
          )}

          {currentStep === 2 && (
            <PersonalInfoForm
              formData={personalInfo}
              onInputChange={handlePersonalInfoChange}
              language={language}
            />
          )}

          {currentStep === 3 && (
            <AddressInfoForm
              formData={addressInfo}
              onInputChange={handleAddressInfoChange}
              language={language}
            />
          )}

          {currentStep === 4 && (
            <DocumentUploadForm
              documents={documents}
              onFileChange={handleFileChange}
              language={language}
            />
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                {language === 'ar' ? 'السابق' : 'Previous'}
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleDialogClose(false)}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            
            {currentStep < 4 ? (
              <Button 
                onClick={handleNext} 
                disabled={!isStepValid()}
              >
                {language === 'ar' ? 'التالي' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={!isStepValid() || loading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-800"
              >
                {loading 
                  ? (language === 'ar' ? 'جاري التقديم...' : 'Submitting...') 
                  : (language === 'ar' ? 'تقديم الطلب' : 'Submit Application')
                }
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountDialog;
