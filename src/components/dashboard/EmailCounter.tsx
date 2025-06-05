
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MailOpen, Send, Inbox, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmailStats {
  totalEmails: number;
  unreadEmails: number;
  sentEmails: number;
  inboxEmails: number;
}

const EmailCounter = () => {
  const [emailStats, setEmailStats] = useState<EmailStats>({
    totalEmails: 0,
    unreadEmails: 0,
    sentEmails: 0,
    inboxEmails: 0
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // محاكاة جلب بيانات الإيميل
  const fetchEmailStats = async () => {
    setIsLoading(true);
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // بيانات تجريبية - يمكن استبدالها بـ API حقيقي
      const mockStats: EmailStats = {
        totalEmails: Math.floor(Math.random() * 1000) + 500,
        unreadEmails: Math.floor(Math.random() * 50) + 10,
        sentEmails: Math.floor(Math.random() * 200) + 100,
        inboxEmails: Math.floor(Math.random() * 300) + 150
      };
      
      setEmailStats(mockStats);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('خطأ في جلب إحصائيات الإيميل:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailStats();
    // تحديث تلقائي كل 5 دقائق
    const interval = setInterval(fetchEmailStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatLastUpdated = () => {
    return lastUpdated.toLocaleString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            إحصائيات البريد الإلكتروني
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchEmailStats}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
        </CardHeader>
        <CardContent>
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

          {/* معلومات آخر تحديث */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              آخر تحديث: {formatLastUpdated()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailCounter;
