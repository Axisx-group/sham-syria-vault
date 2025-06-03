
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SyrianGovernorate, Country, GeographyStats } from "@/types/geography";

export const useGeography = () => {
  const [governorates, setGovernorates] = useState<SyrianGovernorate[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [stats, setStats] = useState<GeographyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchGovernorates = async () => {
    try {
      const { data, error } = await supabase
        .from('syrian_governorates')
        .select('*')
        .order('name_ar');

      if (error) throw error;
      setGovernorates(data || []);
    } catch (error) {
      console.error('خطأ في جلب المحافظات:', error);
      toast({
        title: "خطأ",
        description: "فشل في جلب بيانات المحافظات",
        variant: "destructive"
      });
    }
  };

  const fetchCountries = async () => {
    try {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .order('name_ar');

      if (error) throw error;
      setCountries(data || []);
    } catch (error) {
      console.error('خطأ في جلب الدول:', error);
      toast({
        title: "خطأ",
        description: "فشل في جلب بيانات الدول",
        variant: "destructive"
      });
    }
  };

  const fetchStats = async () => {
    try {
      // جلب إحصائيات المحافظات والدول
      const [governoratesCount, countriesCount] = await Promise.all([
        supabase.from('syrian_governorates').select('id', { count: 'exact' }),
        supabase.from('countries').select('id', { count: 'exact' })
      ]);

      // محاولة جلب توزيع العملاء حسب المحافظة (إذا كان لديهم بيانات الموقع)
      const { data: customersData } = await supabase
        .from('customers')
        .select('location');

      const customersDistribution = customersData?.reduce((acc: any[], customer) => {
        if (customer.location) {
          const existing = acc.find(item => item.governorate === customer.location);
          if (existing) {
            existing.count++;
          } else {
            acc.push({ governorate: customer.location, count: 1 });
          }
        }
        return acc;
      }, []) || [];

      setStats({
        totalGovernorates: governoratesCount.count || 0,
        totalCountries: countriesCount.count || 0,
        customersDistribution
      });
    } catch (error) {
      console.error('خطأ في جلب الإحصائيات:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchGovernorates(),
        fetchCountries(),
        fetchStats()
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    governorates,
    countries,
    stats,
    loading,
    refetchData: () => {
      fetchGovernorates();
      fetchCountries();
      fetchStats();
    }
  };
};
