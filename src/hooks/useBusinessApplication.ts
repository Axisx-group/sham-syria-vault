
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  preferredCurrency: string;
  initialDeposit: string;
  requestDebitCard: boolean;
  requestCreditCard: boolean;
}

interface Documents {
  nationalId?: File;
  businessLicense?: File;
  commercialRegistration?: File;
}

export const useBusinessApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    country: 'Syria',
    preferredCurrency: 'SYP',
    initialDeposit: '',
    requestDebitCard: false,
    requestCreditCard: false
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

          // Map document types correctly
          let documentType: 'national_id' | 'business_license' | 'commercial_registration' = 'national_id';
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
