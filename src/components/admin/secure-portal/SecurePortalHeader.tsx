
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Activity, LogOut } from "lucide-react";

interface SecurePortalHeaderProps {
  onSecureLogout: () => Promise<void>;
}

const SecurePortalHeader: React.FC<SecurePortalHeaderProps> = ({ onSecureLogout }) => {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Shield className="h-6 w-6" />
            <div>
              <h1 className="text-lg font-bold">البوابة الآمنة للإدارة الشاملة</h1>
              <p className="text-red-100 text-sm">النظام المتقدم - حماية المستوى الأعلى</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Badge className="bg-red-800 text-red-100">
              <Activity className="h-3 w-3 mr-1" />
              نشط وآمن
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onSecureLogout}
              className="border-red-300 text-red-100 hover:bg-red-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              خروج آمن
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurePortalHeader;
