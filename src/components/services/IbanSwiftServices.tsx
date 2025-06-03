
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Search, FileText, CheckCircle, CreditCard, Globe } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ibanSwiftService } from "@/services/ibanSwiftApi";

const IbanSwiftServices = () => {
  const [activeTab, setActiveTab] = useState('swift-generate');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  // SWIFT form states
  const [swiftCode, setSwiftCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [bankCode, setBankCode] = useState('');

  // IBAN form states
  const [ibanCode, setIbanCode] = useState('');
  const [accountCode, setAccountCode] = useState('');

  const countries = [
    { code: 'FR', name: 'فرنسا' },
    { code: 'DE', name: 'ألمانيا' },
    { code: 'GB', name: 'بريطانيا' },
    { code: 'US', name: 'الولايات المتحدة' },
    { code: 'AE', name: 'الإمارات' },
    { code: 'SA', name: 'السعودية' },
    { code: 'SY', name: 'سوريا' }
  ];

  const handleOperation = async (operation: string) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      let response;
      
      switch (operation) {
        case 'swift-generate':
          if (!countryCode || !bankCode) {
            setError('يرجى ملء جميع الحقول المطلوبة');
            return;
          }
          response = await ibanSwiftService.generateSwiftCode({ country_code: countryCode, bank_code: bankCode });
          break;
          
        case 'swift-validate':
          if (!swiftCode) {
            setError('يرجى إدخال رمز السويفت');
            return;
          }
          response = await ibanSwiftService.validateSwiftCode({ swift_code: swiftCode });
          break;
          
        case 'swift-extract':
          if (!swiftCode) {
            setError('يرجى إدخال رمز السويفت');
            return;
          }
          response = await ibanSwiftService.extractSwiftInfo({ swift_code: swiftCode });
          break;
          
        case 'iban-generate':
          if (!countryCode || !bankCode || !accountCode) {
            setError('يرجى ملء جميع الحقول المطلوبة');
            return;
          }
          response = await ibanSwiftService.generateIbanCode({ 
            country_code: countryCode, 
            bank_code: bankCode, 
            account_code: accountCode 
          });
          break;
          
        case 'iban-validate':
          if (!ibanCode) {
            setError('يرجى إدخال رمز الآيبان');
            return;
          }
          response = await ibanSwiftService.validateIbanCode({ iban_code: ibanCode });
          break;
          
        case 'iban-extract':
          if (!ibanCode) {
            setError('يرجى إدخال رمز الآيبان');
            return;
          }
          response = await ibanSwiftService.extractIbanInfo({ iban_code: ibanCode });
          break;
          
        default:
          setError('عملية غير مدعومة');
          return;
      }

      if (response.success) {
        setResult(response.data);
        toast({
          title: "نجحت العملية",
          description: response.message,
        });
      } else {
        setError(response.message);
        toast({
          title: "فشلت العملية",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع');
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء العملية",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSwiftCode('');
    setIbanCode('');
    setCountryCode('');
    setBankCode('');
    setAccountCode('');
    setResult(null);
    setError('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <CreditCard className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">خدمات IBAN والسويفت</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            خدمات شاملة للتحقق من وإنشاء واستخراج معلومات رموز IBAN والسويفت للبنوك العالمية
          </p>
        </div>

        {/* Services Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="swift-generate">إنشاء سويفت</TabsTrigger>
            <TabsTrigger value="swift-validate">التحقق من سويفت</TabsTrigger>
            <TabsTrigger value="swift-extract">استخراج معلومات سويفت</TabsTrigger>
            <TabsTrigger value="iban-generate">إنشاء آيبان</TabsTrigger>
            <TabsTrigger value="iban-validate">التحقق من آيبان</TabsTrigger>
            <TabsTrigger value="iban-extract">استخراج معلومات آيبان</TabsTrigger>
          </TabsList>

          {/* SWIFT Generate */}
          <TabsContent value="swift-generate">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <span>إنشاء رمز السويفت</span>
                </CardTitle>
                <CardDescription>أدخل رمز البلد ورمز البنك لإنشاء رمز سويفت جديد</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country-select">رمز البلد</Label>
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر البلد" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.code} - {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank-code">رمز البنك</Label>
                    <Input
                      id="bank-code"
                      value={bankCode}
                      onChange={(e) => setBankCode(e.target.value)}
                      placeholder="أدخل رمز البنك"
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="flex space-x-4 justify-end">
                  <Button variant="outline" onClick={handleReset}>إعادة تعيين</Button>
                  <Button 
                    onClick={() => handleOperation('swift-generate')} 
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? 'جاري الإنشاء...' : 'إنشاء رمز السويفت'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SWIFT Validate */}
          <TabsContent value="swift-validate">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>التحقق من رمز السويفت</span>
                </CardTitle>
                <CardDescription>أدخل رمز السويفت للتحقق من صحته</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="swift-code-validate">رمز السويفت</Label>
                  <Input
                    id="swift-code-validate"
                    value={swiftCode}
                    onChange={(e) => setSwiftCode(e.target.value.toUpperCase())}
                    placeholder="أدخل رمز السويفت (مثال: BNPAFRPPIFN)"
                    className="text-right"
                  />
                </div>
                <div className="flex space-x-4 justify-end">
                  <Button variant="outline" onClick={handleReset}>إعادة تعيين</Button>
                  <Button 
                    onClick={() => handleOperation('swift-validate')} 
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {loading ? 'جاري التحقق...' : 'التحقق من الرمز'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SWIFT Extract */}
          <TabsContent value="swift-extract">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-purple-600" />
                  <span>استخراج معلومات السويفت</span>
                </CardTitle>
                <CardDescription>أدخل رمز السويفت لاستخراج المعلومات التفصيلية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="swift-code-extract">رمز السويفت</Label>
                  <Input
                    id="swift-code-extract"
                    value={swiftCode}
                    onChange={(e) => setSwiftCode(e.target.value.toUpperCase())}
                    placeholder="أدخل رمز السويفت (مثال: BNPAFRPPIFN)"
                    className="text-right"
                  />
                </div>
                <div className="flex space-x-4 justify-end">
                  <Button variant="outline" onClick={handleReset}>إعادة تعيين</Button>
                  <Button 
                    onClick={() => handleOperation('swift-extract')} 
                    disabled={loading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {loading ? 'جاري الاستخراج...' : 'استخراج المعلومات'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IBAN Generate */}
          <TabsContent value="iban-generate">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                  <span>إنشاء رمز الآيبان</span>
                </CardTitle>
                <CardDescription>أدخل البيانات المطلوبة لإنشاء رمز آيبان جديد</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>رمز البلد</Label>
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر البلد" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.code} - {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank-code-iban">رمز البنك</Label>
                    <Input
                      id="bank-code-iban"
                      value={bankCode}
                      onChange={(e) => setBankCode(e.target.value)}
                      placeholder="رمز البنك"
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-code">رمز الحساب</Label>
                    <Input
                      id="account-code"
                      value={accountCode}
                      onChange={(e) => setAccountCode(e.target.value)}
                      placeholder="رمز الحساب"
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="flex space-x-4 justify-end">
                  <Button variant="outline" onClick={handleReset}>إعادة تعيين</Button>
                  <Button 
                    onClick={() => handleOperation('iban-generate')} 
                    disabled={loading}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    {loading ? 'جاري الإنشاء...' : 'إنشاء رمز الآيبان'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IBAN Validate */}
          <TabsContent value="iban-validate">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-teal-600" />
                  <span>التحقق من رمز الآيبان</span>
                </CardTitle>
                <CardDescription>أدخل رمز الآيبان للتحقق من صحته</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="iban-code-validate">رمز الآيبان</Label>
                  <Input
                    id="iban-code-validate"
                    value={ibanCode}
                    onChange={(e) => setIbanCode(e.target.value.toUpperCase())}
                    placeholder="أدخل رمز الآيبان (مثال: GB33BUKB20201555555555)"
                    className="text-right"
                  />
                </div>
                <div className="flex space-x-4 justify-end">
                  <Button variant="outline" onClick={handleReset}>إعادة تعيين</Button>
                  <Button 
                    onClick={() => handleOperation('iban-validate')} 
                    disabled={loading}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    {loading ? 'جاري التحقق...' : 'التحقق من الرمز'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IBAN Extract */}
          <TabsContent value="iban-extract">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <span>استخراج معلومات الآيبان</span>
                </CardTitle>
                <CardDescription>أدخل رمز الآيبان لاستخراج المعلومات التفصيلية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="iban-code-extract">رمز الآيبان</Label>
                  <Input
                    id="iban-code-extract"
                    value={ibanCode}
                    onChange={(e) => setIbanCode(e.target.value.toUpperCase())}
                    placeholder="أدخل رمز الآيبان (مثال: GB33BUKB20201555555555)"
                    className="text-right"
                  />
                </div>
                <div className="flex space-x-4 justify-end">
                  <Button variant="outline" onClick={handleReset}>إعادة تعيين</Button>
                  <Button 
                    onClick={() => handleOperation('iban-extract')} 
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    {loading ? 'جاري الاستخراج...' : 'استخراج المعلومات'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results Display */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>نتائج العملية</span>
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
              <li>• رموز السويفت تتكون من 8 أو 11 حرف وتحدد البنوك عالمياً</li>
              <li>• رموز الآيبان تختلف في الطول حسب البلد وتستخدم للتحويلات الدولية</li>
              <li>• جميع البيانات محمية ومشفرة وفقاً لمعايير الأمان العالمية</li>
              <li>• النتائج فورية ودقيقة ومحدثة من قواعد البيانات العالمية</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IbanSwiftServices;
