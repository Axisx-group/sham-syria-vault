
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface KYCApplicationData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    nationality?: string;
  };
  addressInfo: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
  };
  employmentInfo?: {
    employmentStatus?: string;
    jobTitle?: string;
    employer?: string;
    monthlyIncome?: number;
  };
  businessInfo?: {
    businessName?: string;
    businessType?: string;
    registrationNumber?: string;
    taxId?: string;
  };
}

export const useKYCIntegration = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createKYCApplication = async (
    accountApplicationId: string,
    kycData: KYCApplicationData,
    level: 'basic' | 'intermediate' | 'advanced' = 'basic'
  ) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('المستخدم غير مسجل الدخول');
      }

      const { data: kycApplication, error: kycError } = await supabase
        .from('kyc_applications')
        .insert({
          user_id: user.id,
          account_application_id: accountApplicationId,
          level,
          status: 'pending',
          personal_info: kycData.personalInfo,
          address_info: kycData.addressInfo,
          employment_info: kycData.employmentInfo,
          ...(kycData.businessInfo && { business_info: kycData.businessInfo })
        })
        .select()
        .single();

      if (kycError) throw kycError;

      // إنشاء خطوات التحقق الأولية
      const verificationSteps = [
        {
          kyc_application_id: kycApplication.id,
          step_name: 'التحقق من المعلومات الشخصية',
          step_type: 'personal_verification',
          status: 'pending' as const
        },
        {
          kyc_application_id: kycApplication.id,
          step_name: 'التحقق من العنوان',
          step_type: 'address_verification',
          status: 'pending' as const
        },
        {
          kyc_application_id: kycApplication.id,
          step_name: 'التحقق من الوثائق',
          step_type: 'document_verification',
          status: 'pending' as const
        }
      ];

      if (level === 'intermediate' || level === 'advanced') {
        verificationSteps.push({
          kyc_application_id: kycApplication.id,
          step_name: 'التحقق من الدخل',
          step_type: 'income_verification',
          status: 'pending' as const
        });
      }

      if (level === 'advanced') {
        verificationSteps.push({
          kyc_application_id: kycApplication.id,
          step_name: 'تقييم المخاطر',
          step_type: 'risk_assessment',
          status: 'pending' as const
        });
      }

      const { error: stepsError } = await supabase
        .from('kyc_verification_steps')
        .insert(verificationSteps);

      if (stepsError) throw stepsError;

      // ربط طلب KYC بطلب فتح الحساب
      const { error: updateError } = await supabase
        .from('account_applications')
        .update({ kyc_application_id: kycApplication.id })
        .eq('id', accountApplicationId);

      if (updateError) throw updateError;

      toast({
        title: "تم إنشاء طلب التحقق بنجاح!",
        description: "سيتم مراجعة وثائقك ومعلوماتك قريباً"
      });

      return kycApplication;
    } catch (error) {
      console.error('Error creating KYC application:', error);
      toast({
        title: "خطأ في إنشاء طلب التحقق",
        description: "حدث خطأ أثناء إنشاء طلب التحقق من الهوية",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const uploadKYCDocument = async (
    kycApplicationId: string,
    documentType: string,
    file: File
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('المستخدم غير مسجل الدخول');

      const fileName = `${user.id}/${kycApplicationId}/${documentType}_${Date.now()}.${file.name.split('.').pop()}`;
      
      const { error: uploadError } = await supabase.storage
        .from('kyc-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: docError } = await supabase
        .from('kyc_documents')
        .insert({
          kyc_application_id: kycApplicationId,
          document_type: documentType,
          file_name: file.name,
          file_path: fileName,
          file_size: file.size,
          mime_type: file.type,
          verification_status: 'pending'
        });

      if (docError) throw docError;

      return fileName;
    } catch (error) {
      console.error('Error uploading KYC document:', error);
      throw error;
    }
  };

  return {
    createKYCApplication,
    uploadKYCDocument,
    loading
  };
};
