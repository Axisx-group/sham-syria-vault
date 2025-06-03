
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Globe } from "lucide-react";
import SyrianGovernorates from './SyrianGovernorates';
import CountriesManagement from './CountriesManagement';

const GeographyManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">الإدارة الجغرافية</h1>
        <p className="text-gray-600">إدارة المحافظات السورية ودول العالم</p>
      </div>
      
      <Tabs defaultValue="governorates" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="governorates" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            المحافظات السورية
          </TabsTrigger>
          <TabsTrigger value="countries" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            دول العالم
          </TabsTrigger>
        </TabsList>

        <TabsContent value="governorates">
          <SyrianGovernorates />
        </TabsContent>

        <TabsContent value="countries">
          <CountriesManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeographyManagement;
