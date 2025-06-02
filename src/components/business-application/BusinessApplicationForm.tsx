
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2, MapPin, CreditCard, User } from "lucide-react";
import ProgressSteps from './ProgressSteps';
import PersonalInfoStep from './PersonalInfoStep';
import BusinessInfoStep from './BusinessInfoStep';
import AddressInfoStep from './AddressInfoStep';
import AccountPreferencesStep from './AccountPreferencesStep';
import { useBusinessApplication } from '@/hooks/useBusinessApplication';

interface BusinessApplicationFormProps {
  onBackClick: () => void;
}

const BusinessApplicationForm: React.FC<BusinessApplicationFormProps> = ({ onBackClick }) => {
  const {
    loading,
    step,
    formData,
    documents,
    handleInputChange,
    handleFileChange,
    submitApplication,
    nextStep,
    prevStep,
    isFormValid
  } = useBusinessApplication();

  const getStepTitle = () => {
    switch (step) {
      case 1: return <><User className="h-5 w-5" /> البيانات الشخصية</>;
      case 2: return <><Building2 className="h-5 w-5" /> بيانات الشركة</>;
      case 3: return <><MapPin className="h-5 w-5" /> بيانات العنوان</>;
      case 4: return <><CreditCard className="h-5 w-5" /> تفضيلات الحساب والوثائق</>;
      default: return '';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return "أدخل بياناتك الشخصية كممثل الشركة";
      case 2: return "أدخل تفاصيل شركتك أو مؤسستك";
      case 3: return "أدخل تفاصيل عنوان الشركة";
      case 4: return "اختر تفضيلات حسابك وارفع الوثائق المطلوبة";
      default: return '';
    }
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfoStep formData={formData} onInputChange={handleInputChange} />;
      case 2:
        return <BusinessInfoStep formData={formData} onInputChange={handleInputChange} />;
      case 3:
        return <AddressInfoStep formData={formData} onInputChange={handleInputChange} />;
      case 4:
        return <AccountPreferencesStep 
          formData={formData} 
          documents={documents}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBackClick}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة للصفحة الرئيسية
          </Button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">تقديم طلب فتح حساب تجاري</h1>
          <p className="text-gray-600">املأ النموذج التالي لفتح حسابك التجاري الجديد</p>
        </div>

        <ProgressSteps currentStep={step} totalSteps={4} />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStepTitle()}
            </CardTitle>
            <CardDescription>
              {getStepDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderCurrentStep()}

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
                  disabled={loading || !isFormValid()}
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

export default BusinessApplicationForm;
