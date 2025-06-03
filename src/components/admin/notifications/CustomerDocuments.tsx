
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye } from "lucide-react";

interface DocumentInfo {
  id: string;
  document_type: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
}

interface CustomerDocumentsProps {
  documents: DocumentInfo[];
  loadingDocuments: boolean;
  onDownloadDocument: (doc: DocumentInfo) => void;
}

const CustomerDocuments: React.FC<CustomerDocumentsProps> = ({
  documents,
  loadingDocuments,
  onDownloadDocument
}) => {
  const getDocumentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'national_id': 'بطاقة الهوية الشخصية',
      'passport': 'جواز السفر',
      'driving_license': 'رخصة القيادة',
      'business_license': 'رخصة العمل',
      'commercial_registration': 'السجل التجاري',
      'bank_statement': 'كشف حساب بنكي',
      'salary_certificate': 'شهادة راتب',
      'other': 'مستند آخر'
    };
    return types[type] || type;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" />
          المستندات المرفقة ({documents.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loadingDocuments ? (
          <div className="text-center py-4">
            <p className="text-gray-600">جاري تحميل المستندات...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-4">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">لا توجد مستندات مرفقة بهذا الطلب</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{getDocumentTypeLabel(doc.document_type)}</p>
                      <p className="text-xs text-gray-500 truncate max-w-32">{doc.file_name}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {doc.mime_type?.includes('pdf') ? 'PDF' : 'صورة'}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>الحجم:</span>
                    <span>{formatFileSize(doc.file_size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تاريخ الرفع:</span>
                    <span>{new Date(doc.uploaded_at).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDownloadDocument(doc)}
                    className="flex-1"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    تحميل
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDownloadDocument(doc)}
                    className="flex-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    عرض
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerDocuments;
