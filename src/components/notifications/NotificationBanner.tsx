
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X, Info, AlertCircle, CheckCircle } from "lucide-react";

interface NotificationBannerProps {
  language: 'ar' | 'en';
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(true);

  const notifications = [
    {
      type: 'info' as const,
      title: language === 'ar' ? 'ميزة جديدة!' : 'New Feature!',
      message: language === 'ar' ? 
        'الآن يمكنك فتح حساب مصرفي رقمي في دقائق' : 
        'Now you can open a digital bank account in minutes',
      action: language === 'ar' ? 'اعرف المزيد' : 'Learn More'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      default: return Info;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="relative z-30">
      {notifications.map((notification, index) => {
        const Icon = getIcon(notification.type);
        const colors = getColors(notification.type);
        
        return (
          <div key={index} className={`${colors} border-b px-4 py-3`}>
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <div>
                  <span className="font-semibold">{notification.title}</span>
                  <span className="ml-2">{notification.message}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-current text-current hover:bg-current hover:text-white"
                >
                  {notification.action}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsVisible(false)}
                  className="text-current hover:bg-current hover:text-white w-8 h-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationBanner;
