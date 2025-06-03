
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle } from 'lucide-react';

interface DocumentUploadFormProps {
  documents: {
    nationalId?: File;
    passport?: File;
    drivingLicense?: File;
    europeanResidence?: File;
  };
  onFileChange: (documentType: 'nationalId' | 'passport' | 'drivingLicense' | 'europeanResidence', file: File | null) => void;
  language: 'ar' | 'en';
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ documents, onFileChange, language }) => {
  const documentTypes = [
    {
      key: 'nationalId' as const,
      label: language === 'ar' ? 'بطاقة الهوية الشخصية' : 'National ID Card',
      required: false
    },
    {
      key: 'passport' as const,
      label: language === 'ar' ? 'جواز السفر' : 'Passport',
      required: false
    },
    {
      key: 'drivingLicense' as const,
      label: language === 'ar' ? 'رخصة القيادة' : 'Driving License',
      required: false
    },
    {
      key: 'europeanResidence' as const,
      label: language === 'ar' ? 'الإقامة الأوروبية' : 'European Residence Permit',
      required: false
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {language === 'ar' ? 'الوثائق المطلوبة للتحقق من الهوية' : 'Required Documents for Identity Verification'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-blue-800 text-sm">
            <strong>{language === 'ar' ? 'ملاحظة:' : 'Note:'}</strong> {language === 'ar' 
              ? 'يرجى رفع واحدة على الأقل من الوثائق التالية لإكمال عملية التحقق من الهوية (KYC)'
              : 'Please upload at least one of the following documents to complete the KYC verification process'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documentTypes.map((docType) => (
            <div key={docType.key}>
              <Label htmlFor={docType.key}>{docType.label}</Label>
              <div className="mt-2 flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="space-y-1 text-center">
                  {documents[docType.key] ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                      <div className="text-sm text-green-600 font-medium">
                        {language === 'ar' ? 'تم الرفع' : 'Uploaded'}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-32">
                        {documents[docType.key]!.name}
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <label htmlFor={docType.key} className="cursor-pointer hover:text-blue-600">
                          <span>{language === 'ar' ? 'انقر لرفع الملف' : 'Click to upload file'}</span>
                          <input
                            id={docType.key}
                            name={docType.key}
                            type="file"
                            className="sr-only"
                            accept="image/*,.pdf"
                            onChange={(e) => onFileChange(docType.key, e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        {language === 'ar' ? 'PDF, JPG, PNG (أقل من 10MB)' : 'PDF, JPG, PNG (less than 10MB)'}
                      </p>
                    </>
                  )}
                </div>
              </div>
              
              {documents[docType.key] && (
                <button
                  type="button"
                  onClick={() => onFileChange(docType.key, null)}
                  className="mt-2 text-xs text-red-600 hover:text-red-800"
                >
                  {language === 'ar' ? 'إزالة الملف' : 'Remove file'}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-yellow-800 text-sm">
            <strong>{language === 'ar' ? 'تنبيه:' : 'Important:'}</strong> {language === 'ar' 
              ? 'تأكد من وضوح الصورة وظهور جميع المعلومات بوضوح. الوثائق غير الواضحة قد تؤدي إلى تأخير في المراجعة'
              : 'Ensure the image is clear and all information is visible. Unclear documents may cause delays in review'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadForm;
