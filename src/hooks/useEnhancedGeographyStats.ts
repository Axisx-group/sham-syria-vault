
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { GeographyAnalytics } from "@/types/geographyAnalytics";
import { fetchCustomersData, fetchAccountsData, fetchCardsData } from "@/services/geographyDataService";
import {
  processCustomersByLocation,
  processAccountTypeDistribution,
  processStatusDistribution,
  processCardTypeDistribution,
  processCurrencyDistribution,
  processGrowthTrends
} from "@/utils/geographyDataProcessors";

export const useEnhancedGeographyStats = () => {
  const [analytics, setAnalytics] = useState<GeographyAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEnhancedStats = async () => {
    try {
      setLoading(true);
      console.log('بدء جلب الإحصائيات المحسّنة...');

      // Fetch all data in parallel
      const [customers, accounts, cards] = await Promise.all([
        fetchCustomersData(),
        fetchAccountsData(),
        fetchCardsData()
      ]);

      // Process the data to create analytics
      const customersByLocation = processCustomersByLocation(customers, accounts, cards);
      const accountTypeDistribution = processAccountTypeDistribution(customers);
      const statusDistribution = processStatusDistribution(customers);
      const cardTypeDistribution = processCardTypeDistribution(cards);
      const currencyDistribution = processCurrencyDistribution(accounts);
      const growthTrends = processGrowthTrends(customers, accounts);

      const analyticsData: GeographyAnalytics = {
        totalCustomers: customers.length,
        totalAccounts: accounts.length,
        totalCards: cards.length,
        accountTypeDistribution,
        statusDistribution,
        cardTypeDistribution,
        currencyDistribution,
        customersByLocation,
        growthTrends
      };

      console.log('تم معالجة البيانات:', analyticsData);
      setAnalytics(analyticsData);

      toast({
        title: "تم تحديث الإحصائيات",
        description: "تم جلب الإحصائيات المحسّنة بنجاح"
      });

    } catch (error) {
      console.error('خطأ في جلب الإحصائيات المحسّنة:', error);
      toast({
        title: "خطأ",
        description: "فشل في جلب الإحصائيات المحسّنة",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnhancedStats();
  }, []);

  return {
    analytics,
    loading,
    refetch: fetchEnhancedStats
  };
};
