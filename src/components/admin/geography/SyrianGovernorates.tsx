
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Building, Info, CreditCard, TrendingUp } from "lucide-react";
import { useGeography } from "@/hooks/useGeography";
import { useEnhancedGeographyStats } from "@/hooks/useEnhancedGeographyStats";
import { SyrianGovernorate } from "@/types/geography";

const GovernorateCard: React.FC<{ 
  governorate: SyrianGovernorate;
  customerStats?: any;
}> = ({ governorate, customerStats }) => {
  const formatNumber = (num?: number) => {
    if (!num) return 'غير محدد';
    return new Intl.NumberFormat('ar-SA').format(num);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{governorate.name_ar}</CardTitle>
          <Badge variant="outline">{governorate.code}</Badge>
        </div>
        <p className="text-sm text-gray-600">{governorate.name_en}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">المركز الإداري</p>
              <p className="text-sm font-medium">{governorate.capital_ar || 'غير محدد'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">عدد السكان</p>
              <p className="text-sm font-medium">{formatNumber(governorate.population)}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-purple-600" />
          <div>
            <p className="text-xs text-gray-500">المساحة</p>
            <p className="text-sm font-medium">
              {governorate.area_km2 ? `${formatNumber(governorate.area_km2)} كم²` : 'غير محدد'}
            </p>
          </div>
        </div>

        {/* Customer Statistics Section */}
        {customerStats && (
          <div className="border-t pt-4 space-y-3">
            <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              إحصائيات العملاء
            </h4>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">العملاء:</span>
                <Badge variant="secondary">{customerStats.customerCount}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">شخصية:</span>
                <Badge variant="outline">{customerStats.personalAccounts}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">تجارية:</span>
                <Badge variant="outline">{customerStats.businessAccounts}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">البطاقات:</span>
                <Badge variant="outline">{customerStats.debitCards + customerStats.creditCards}</Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-indigo-600" />
              <div className="flex-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">متوسط الرصيد:</span>
                  <span className="font-medium">
                    {customerStats.averageBalance > 0 ? 
                      `${formatNumber(Math.round(customerStats.averageBalance))} ل.س` : 
                      'غير محدد'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {governorate.description_ar && (
          <div className="flex items-start gap-2 border-t pt-4">
            <Info className="h-4 w-4 text-gray-500 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">معلومات إضافية</p>
              <p className="text-sm text-gray-700">{governorate.description_ar}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const SyrianGovernorates: React.FC = () => {
  const { governorates, loading, stats } = useGeography();
  const { analytics, loading: analyticsLoading } = useEnhancedGeographyStats();

  if (loading || analyticsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Create a map of customer stats by location
  const customerStatsByLocation = analytics?.customersByLocation.reduce((acc, stat) => {
    acc[stat.location] = stat;
    return acc;
  }, {} as Record<string, any>) || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">المحافظات السورية</h1>
        <div className="flex items-center gap-4">
          <Badge className="bg-blue-100 text-blue-800">
            {stats?.totalGovernorates || 0} محافظة
          </Badge>
          {analytics && (
            <Badge className="bg-green-100 text-green-800">
              {analytics.totalCustomers} عميل
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats?.totalGovernorates || 0}</p>
                <p className="text-sm text-gray-600">إجمالي المحافظات</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat('ar-SA').format(
                    governorates.reduce((sum, gov) => sum + (gov.population || 0), 0)
                  )}
                </p>
                <p className="text-sm text-gray-600">إجمالي السكان</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat('ar-SA').format(
                    governorates.reduce((sum, gov) => sum + (gov.area_km2 || 0), 0)
                  )}
                </p>
                <p className="text-sm text-gray-600">إجمالي المساحة (كم²)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {analytics?.totalCustomers || 0}
                </p>
                <p className="text-sm text-gray-600">العملاء المسجلين</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-indigo-600" />
              <div>
                <p className="text-2xl font-bold">
                  {analytics?.totalAccounts || 0}
                </p>
                <p className="text-sm text-gray-600">إجمالي الحسابات</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {governorates.map((governorate) => (
          <GovernorateCard 
            key={governorate.id} 
            governorate={governorate}
            customerStats={customerStatsByLocation[governorate.name_ar]}
          />
        ))}
      </div>
    </div>
  );
};

export default SyrianGovernorates;
