
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useKYCIntegration } from "./useKYCIntegration";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  businessRegistrationNumber: string;
  businessTaxId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Documents {
  nationalId?: File;
  businessLicense?: File;
  commercialRegistration?: File;
}

export const useBusinessApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createKYCApplication, uploadKYCDocument } = useKYCIntegration();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    businessRegistrationNumber: '',
    businessTaxId: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Syria'
  });
  const [documents, setDocuments] = useState<Documents>({});

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

      // Create application with SYP as default currency
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
          preferred_currency: 'SYP'
        })
        .select()
        .single();

      if (appError) throw appError;

      // Create KYC application for business account
      const kycData = {
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        addressInfo: {
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country
        },
        businessInfo: {
          businessName: formData.businessName,
          businessType: formData.businessType,
          registrationNumber: formData.businessRegistrationNumber,
          taxId: formData.businessTaxId
        }
      };

      const kycApplication = await createKYCApplication(
        application.id,
        kycData,
        'intermediate' // Business accounts require intermediate level
      );

      // Upload documents to KYC
      for (const [docType, file] of Object.entries(documents)) {
        if (file) {
          let documentType: string;
          switch (docType) {
            case 'nationalId':
              documentType = 'national_id';
              break;
            case 'businessLicense':
              documentType = 'business_license';
              break;
            case 'commercialRegistration':
              documentType = 'commercial_registration';
              break;
            default:
              documentType = docType;
          }
          
          await uploadKYCDocument(kycApplication.id, documentType, file);
        }
      }

      toast({
        title: "تم تقديم الطلب بنجاح!",
        description: "سيتم مراجعة طلبكم وإجراء التحقق من الهوية للحساب التجاري. قد تستغرق العملية وقتاً أطول للحسابات التجارية."
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

  const isFormValid = () => {
    return formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.phone && 
           formData.businessName && 
           formData.businessType && 
           formData.businessRegistrationNumber && 
           formData.addressLine1 && 
           formData.city && 
           documents.nationalId && 
           documents.businessLicense && 
           documents.commercialRegistration;
  };

  return {
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
  };
};
