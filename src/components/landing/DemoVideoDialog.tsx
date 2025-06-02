
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface DemoVideoDialogProps {
  language: 'ar' | 'en';
}

const DemoVideoDialog: React.FC<DemoVideoDialogProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);

  const translations = {
    ar: {
      watchDemo: "شاهد العرض التوضيحي",
      demoTitle: "العرض التوضيحي للبنك الرقمي",
      demoDescription: "شاهد كيف يمكنك إدارة أموالك بسهولة وأمان"
    },
    en: {
      watchDemo: "Watch Demo",
      demoTitle: "Digital Bank Demo",
      demoDescription: "See how you can manage your money easily and securely"
    }
  };

  const t = translations[language];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="px-8 py-4 text-lg hover:shadow-lg transition-all">
          <Play className="mr-2 h-5 w-5" />
          {t.watchDemo}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t.demoTitle}</DialogTitle>
          <DialogDescription>{t.demoDescription}</DialogDescription>
        </DialogHeader>
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Play className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'سيتم إضافة الفيديو التوضيحي قريباً'
                : 'Demo video will be available soon'
              }
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoVideoDialog;
