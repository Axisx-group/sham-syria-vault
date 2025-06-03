
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { NewCustomerRequest } from "@/types/customerRequest";

interface DocumentInfo {
  id: string;
  document_type: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
}

export const useCustomerDetailModal = (request: NewCustomerRequest) => {
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoadingDocuments(true);
        
        const { data: appDocuments, error: appDocsError } = await supabase
          .from('application_documents')
          .select('*')
          .eq('application_id', request.id);

        if (appDocsError) {
          console.error('خطأ في جلب مستندات الطلب:', appDocsError);
        }

        const { data: application } = await supabase
          .from('account_applications')
          .select('kyc_application_id')
          .eq('application_token', request.id)
          .single();

        let kycDocuments: any[] = [];
        if (application?.kyc_application_id) {
          const { data: kycDocs, error: kycDocsError } = await supabase
            .from('kyc_documents')
            .select('*')
            .eq('kyc_application_id', application.kyc_application_id);

          if (kycDocsError) {
            console.error('خطأ في جلب مستندات KYC:', kycDocsError);
          } else {
            kycDocuments = kycDocs || [];
          }
        }

        const allDocuments = [
          ...(appDocuments || []),
          ...kycDocuments.map(doc => ({
            ...doc,
            application_id: request.id
          }))
        ];

        setDocuments(allDocuments);
        console.log('المستندات المجلبة:', allDocuments);
      } catch (error) {
        console.error('خطأ في جلب المستندات:', error);
        toast({
          title: "خطأ",
          description: "فشل في جلب المستندات المرفقة",
          variant: "destructive"
        });
      } finally {
        setLoadingDocuments(false);
      }
    };

    fetchDocuments();
  }, [request.id, toast]);

  const handleDownloadDocument = async (doc: DocumentInfo) => {
    try {
      const { data, error } = await supabase.storage
        .from('kyc-documents')
        .download(doc.file_path);

      if (error) {
        console.error('خطأ في تحميل المستند:', error);
        toast({
          title: "خطأ",
          description: "فشل في تحميل المستند",
          variant: "destructive"
        });
        return;
      }

      const url = URL.createObjectURL(data);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = doc.file_name;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "تم التحميل",
        description: `تم تحميل ${doc.file_name} بنجاح`
      });
    } catch (error) {
      console.error('خطأ في تحميل المستند:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل المستند",
        variant: "destructive"
      });
    }
  };

  return {
    documents,
    loadingDocuments,
    processing,
    setProcessing,
    handleDownloadDocument
  };
};
