
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import IbanSwiftServices from '@/components/services/IbanSwiftServices';

const IbanSwiftServicesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>العودة للرئيسية</span>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">خدمات IBAN والسويفت</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <IbanSwiftServices />
      </main>
    </div>
  );
};

export default IbanSwiftServicesPage;
