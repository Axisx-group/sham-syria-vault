
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Search, FileText, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { nubariumService } from "@/services/nubariumApi";

const NubariumConsultation = () => {
  const [documento, setDocumento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleConsulta = async () => {
    if (!documento || !tipoDocumento) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await nubariumService.consultarDocumento({
        documento,
        tipo_documento: tipoDocumento
      });

      if (response.success) {
        setResult(response.data);
        toast({
          title: "نجح الاستعلام",
          description: response.message,
        });
      } else {
        setError(response.message);
        toast({
          title: "فشل الاستعلام",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع');
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الاستعلام",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDocumento('');
    setTipoDocumento('');
    setResult(null);
    setError('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">استعلام المستندات</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            خدمة الاستعلام عن المستندات والوثائق الرسمية باستخدام تقنية NUbarium المتقدمة
          </p>
        </div>

        {/* Consultation Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-blue-600" />
              <span>نموذج الاستعلام</span>
            </CardTitle>
            <CardDescription>
              أدخل بيانات المستند للاستعلام عن المعلومات
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="documento">رقم المستند</Label>
                <Input
                  id="documento"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder="أدخل رقم المستند"
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tipo-documento">نوع المستند</Label>
                <Select value={tipoDocumento} onValueChange={setTipoDocumento}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المستند" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cedula">بطاقة الهوية</SelectItem>
                    <SelectItem value="pasaporte">جواز السفر</SelectItem>
                    <SelectItem value="nit">رقم التعريف الضريبي</SelectItem>
                    <SelectItem value="rut">رقم السجل الموحد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-4 justify-end">
              <Button variant="outline" onClick={handleReset}>
                إعادة تعيين
              </Button>
              <Button 
                onClick={handleConsulta} 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    جاري الاستعلام...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    استعلام
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>نتائج الاستعلام</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Information Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">معلومات مهمة</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <ul className="space-y-2 text-sm">
              <li>• تأكد من صحة رقم المستند قبل الاستعلام</li>
              <li>• الخدمة متاحة 24/7 للاستعلامات</li>
              <li>• جميع البيانات محمية ومشفرة</li>
              <li>• النتائج فورية ودقيقة</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NubariumConsultation;
