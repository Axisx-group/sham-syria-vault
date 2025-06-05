
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MailOpen, Send, Inbox, RefreshCw, TestTube, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmailStats } from "@/hooks/useEmailStats";
import { useToast } from "@/hooks/use-toast";

const EmailCounter = () => {
  const { 
    emailStats, 
    isLoading, 
    error, 
    refetch, 
    sendTestEmail, 
    simulateNewEmail, 
    markEmailsAsRead 
  } = useEmailStats();
  
  const { toast } = useToast();

  const formatLastUpdated = () => {
    return emailStats.lastUpdated.toLocaleString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleTestEmail = async () => {
    try {
      await sendTestEmail();
      toast({
        title: "تم إرسال الإيميل التجريبي",
        description: "تم إرسال إيميل تجريبي بنجاح وتحديث الإحصائيات",
      });
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "فشل في إرسال الإيميل التجريبي",
        variant: "destructive",
      });
    }
  };

  const handleSimulateNewEmail = () => {
    simulateNewEmail();
    toast({
      title: "إيميل جديد",
      description: "تم محاكاة وصول إيميل جديد",
    });
  };

  const handleMarkAsRead = () => {
    if (emailStats.unreadEmails > 0) {
      markEmailsAsRead(Math.min(5, emailStats.unreadEmails));
      toast({
        title: "تم وضع علامة كمقروء",
        description: "تم وضع علامة على الإيميلات كمقروءة",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            إحصائيات البريد الإلكتروني
            <span className="text-sm font-normal text-gray-600">
              (Info@souripay.com)
            </span>
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestEmail}
              disabled={isLoading}
            >
              <TestTube className="h-4 w-4 mr-2" />
              إرسال تجريبي
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              تحديث
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* إجمالي الإيميلات */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-blue-900">
                  إجمالي الإيميلات
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {emailStats.totalEmails.toLocaleString('ar-EG')}
                </p>
              </div>
            </div>

            {/* إيميلات غير مقروءة */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-red-50 rounded-lg">
              <div className="flex-shrink-0">
                <MailOpen className="h-8 w-8 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-red-900">
                  غير مقروءة
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {emailStats.unreadEmails.toLocaleString('ar-EG')}
                </p>
              </div>
            </div>

            {/* إيميلات مرسلة */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-green-50 rounded-lg">
              <div className="flex-shrink-0">
                <Send className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-900">
                  مرسلة
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {emailStats.sentEmails.toLocaleString('ar-EG')}
                </p>
              </div>
            </div>

            {/* صندوق الوارد */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-purple-50 rounded-lg">
              <div className="flex-shrink-0">
                <Inbox className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-purple-900">
                  صندوق الوارد
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {emailStats.inboxEmails.toLocaleString('ar-EG')}
                </p>
              </div>
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="mt-4 flex gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSimulateNewEmail}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              محاكاة إيميل جديد
            </Button>
            
            {emailStats.unreadEmails > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAsRead}
                className="flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                وضع علامة كمقروء
              </Button>
            )}
          </div>

          {/* معلومات آخر تحديث */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>آخر تحديث: {formatLastUpdated()}</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {isLoading ? 'جاري التحديث...' : 'متصل'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailCounter;
