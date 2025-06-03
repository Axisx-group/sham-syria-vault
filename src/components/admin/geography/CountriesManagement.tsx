
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, MapPin, DollarSign, Clock, Search } from "lucide-react";
import { useGeography } from "@/hooks/useGeography";
import { Country } from "@/types/geography";

const CountryCard: React.FC<{ country: Country }> = ({ country }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{country.name_ar}</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">{country.iso_code_2}</Badge>
            <Badge variant="secondary">{country.iso_code_3}</Badge>
          </div>
        </div>
        <p className="text-sm text-gray-600">{country.name_en}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">العاصمة</p>
              <p className="text-sm font-medium">{country.capital_ar || 'غير محدد'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">القارة</p>
              <p className="text-sm font-medium">{country.continent_ar || 'غير محدد'}</p>
            </div>
          </div>
        </div>
        
        {country.currency_name_ar && (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-purple-600" />
            <div>
              <p className="text-xs text-gray-500">العملة</p>
              <p className="text-sm font-medium">
                {country.currency_name_ar} ({country.currency_code})
              </p>
            </div>
          </div>
        )}

        {country.timezone && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-600" />
            <div>
              <p className="text-xs text-gray-500">المنطقة الزمنية</p>
              <p className="text-sm font-medium">{country.timezone}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const CountriesManagement: React.FC = () => {
  const { countries, loading, stats } = useGeography();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('');

  const continents = Array.from(new Set(countries.map(c => c.continent_ar).filter(Boolean)));

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name_ar.includes(searchTerm) || 
                         country.name_en.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = !selectedContinent || country.continent_ar === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">إدارة الدول</h1>
        <Badge className="bg-green-100 text-green-800">
          {stats?.totalCountries || 0} دولة
        </Badge>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="البحث عن دولة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedContinent} onValueChange={setSelectedContinent}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="اختر القارة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">جميع القارات</SelectItem>
            {continents.map((continent) => (
              <SelectItem key={continent} value={continent || ''}>
                {continent}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{filteredCountries.length}</p>
                <p className="text-sm text-gray-600">الدول المعروضة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{continents.length}</p>
                <p className="text-sm text-gray-600">القارات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Array.from(new Set(countries.map(c => c.currency_code).filter(Boolean))).length}
                </p>
                <p className="text-sm text-gray-600">العملات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Array.from(new Set(countries.map(c => c.timezone).filter(Boolean))).length}
                </p>
                <p className="text-sm text-gray-600">المناطق الزمنية</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries.map((country) => (
          <CountryCard key={country.id} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountriesManagement;
