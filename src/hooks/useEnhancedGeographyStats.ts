
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CustomerGeographyStats {
  location: string;
  customerCount: number;
  personalAccounts: number;
  businessAccounts: number;
  activeAccounts: number;
  suspendedAccounts: number;
  closedAccounts: number;
  debitCards: number;
  creditCards: number;
  averageBalance: number;
  monthlyGrowth: number;
}

export interface GeographyAnalytics {
  totalCustomers: number;
  totalAccounts: number;
  totalCards: number;
  accountTypeDistribution: {
    personal: number;
    business: number;
  };
  statusDistribution: {
    active: number;
    suspended: number;
    closed: number;
  };
  cardTypeDistribution: {
    debit: number;
    credit: number;
  };
  currencyDistribution: {
    currency: string;
    count: number;
  }[];
  customersByLocation: CustomerGeographyStats[];
  growthTrends: {
    month: string;
    newCustomers: number;
    newAccounts: number;
  }[];
}

export const useEnhancedGeographyStats = () => {
  const [analytics, setAnalytics] = useState<GeographyAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEnhancedStats = async () => {
    try {
      setLoading(true);
      console.log('بدء جلب الإحصائيات المحسّنة...');

      // Fetch customers with their geographic data
      const { data: customers, error: customersError } = await supabase
        .from('customers')
        .select('*');

      if (customersError) {
        console.error('خطأ في جلب العملاء:', customersError);
        throw customersError;
      }

      console.log('تم جلب العملاء:', customers?.length || 0);

      // Fetch accounts data
      const { data: accounts, error: accountsError } = await supabase
        .from('bank_accounts')
        .select('*');

      if (accountsError) {
        console.error('خطأ في جلب الحسابات:', accountsError);
        throw accountsError;
      }

      console.log('تم جلب الحسابات:', accounts?.length || 0);

      // Fetch cards data
      const { data: cards, error: cardsError } = await supabase
        .from('bank_cards')
        .select('*');

      if (cardsError) {
        console.error('خطأ في جلب البطاقات:', cardsError);
        throw cardsError;
      }

      console.log('تم جلب البطاقات:', cards?.length || 0);

      // Process the data to create analytics
      const customersByLocation = processCustomersByLocation(customers || [], accounts || [], cards || []);
      const accountTypeDistribution = processAccountTypeDistribution(customers || []);
      const statusDistribution = processStatusDistribution(customers || []);
      const cardTypeDistribution = processCardTypeDistribution(cards || []);
      const currencyDistribution = processCurrencyDistribution(accounts || []);
      const growthTrends = processGrowthTrends(customers || [], accounts || []);

      const analyticsData: GeographyAnalytics = {
        totalCustomers: customers?.length || 0,
        totalAccounts: accounts?.length || 0,
        totalCards: cards?.length || 0,
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

// Helper functions for data processing
const processCustomersByLocation = (customers: any[], accounts: any[], cards: any[]): CustomerGeographyStats[] => {
  const locationMap = new Map<string, CustomerGeographyStats>();

  // إنشاء بيانات وهمية إذا لم تكن هناك بيانات حقيقية
  if (customers.length === 0) {
    const mockLocations = [
      { name: 'دمشق', customers: 234 },
      { name: 'حلب', customers: 187 },
      { name: 'حمص', customers: 145 },
      { name: 'اللاذقية', customers: 98 },
      { name: 'حماة', customers: 76 },
      { name: 'دير الزور', customers: 54 },
      { name: 'درعا', customers: 43 },
      { name: 'السويداء', customers: 32 },
      { name: 'طرطوس', customers: 28 },
      { name: 'الرقة', customers: 21 }
    ];

    return mockLocations.map(location => ({
      location: location.name,
      customerCount: location.customers,
      personalAccounts: Math.floor(location.customers * 0.7),
      businessAccounts: Math.floor(location.customers * 0.3),
      activeAccounts: Math.floor(location.customers * 0.85),
      suspendedAccounts: Math.floor(location.customers * 0.1),
      closedAccounts: Math.floor(location.customers * 0.05),
      debitCards: Math.floor(location.customers * 0.9),
      creditCards: Math.floor(location.customers * 0.4),
      averageBalance: Math.floor(Math.random() * 100000) + 50000,
      monthlyGrowth: Math.floor(Math.random() * 20) - 5
    }));
  }

  customers.forEach(customer => {
    const location = customer.location || 'غير محدد';
    const customerAccounts = accounts.filter(acc => acc.customer_id === customer.id);
    const customerCards = cards.filter(card => card.customer_id === customer.id);

    if (!locationMap.has(location)) {
      locationMap.set(location, {
        location,
        customerCount: 0,
        personalAccounts: 0,
        businessAccounts: 0,
        activeAccounts: 0,
        suspendedAccounts: 0,
        closedAccounts: 0,
        debitCards: 0,
        creditCards: 0,
        averageBalance: 0,
        monthlyGrowth: 0
      });
    }

    const stats = locationMap.get(location)!;
    stats.customerCount++;

    if (customer.account_type === 'personal') stats.personalAccounts++;
    if (customer.account_type === 'business') stats.businessAccounts++;
    if (customer.status === 'active') stats.activeAccounts++;
    if (customer.status === 'suspended') stats.suspendedAccounts++;
    if (customer.status === 'closed') stats.closedAccounts++;

    customerCards.forEach(card => {
      if (card.card_type === 'debit') stats.debitCards++;
      if (card.card_type === 'credit') stats.creditCards++;
    });

    const totalBalance = customerAccounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    stats.averageBalance = totalBalance / Math.max(customerAccounts.length, 1);
  });

  return Array.from(locationMap.values());
};

const processAccountTypeDistribution = (customers: any[]) => {
  if (customers.length === 0) {
    return {
      personal: 872,
      business: 375
    };
  }
  
  return {
    personal: customers.filter(c => c.account_type === 'personal').length,
    business: customers.filter(c => c.account_type === 'business').length
  };
};

const processStatusDistribution = (customers: any[]) => {
  if (customers.length === 0) {
    return {
      active: 1089,
      suspended: 89,
      closed: 47
    };
  }
  
  return {
    active: customers.filter(c => c.status === 'active').length,
    suspended: customers.filter(c => c.status === 'suspended').length,
    closed: customers.filter(c => c.status === 'closed').length
  };
};

const processCardTypeDistribution = (cards: any[]) => {
  if (cards.length === 0) {
    return {
      debit: 1456,
      credit: 523
    };
  }
  
  return {
    debit: cards.filter(c => c.card_type === 'debit').length,
    credit: cards.filter(c => c.card_type === 'credit').length
  };
};

const processCurrencyDistribution = (accounts: any[]) => {
  if (accounts.length === 0) {
    return [
      { currency: 'SYP', count: 856 },
      { currency: 'USD', count: 234 },
      { currency: 'EUR', count: 123 },
      { currency: 'TRY', count: 87 }
    ];
  }
  
  const currencyMap = new Map<string, number>();
  accounts.forEach(account => {
    const currency = account.currency || 'SYP';
    currencyMap.set(currency, (currencyMap.get(currency) || 0) + 1);
  });
  
  return Array.from(currencyMap.entries()).map(([currency, count]) => ({
    currency,
    count
  }));
};

const processGrowthTrends = (customers: any[], accounts: any[]) => {
  if (customers.length === 0 && accounts.length === 0) {
    return [
      { month: '2024-01', newCustomers: 45, newAccounts: 67 },
      { month: '2024-02', newCustomers: 52, newAccounts: 78 },
      { month: '2024-03', newCustomers: 67, newAccounts: 89 },
      { month: '2024-04', newCustomers: 78, newAccounts: 98 },
      { month: '2024-05', newCustomers: 89, newAccounts: 112 },
      { month: '2024-06', newCustomers: 98, newAccounts: 125 }
    ];
  }
  
  const monthlyData = new Map<string, { newCustomers: number; newAccounts: number }>();
  
  customers.forEach(customer => {
    const month = new Date(customer.created_at).toISOString().substring(0, 7);
    if (!monthlyData.has(month)) {
      monthlyData.set(month, { newCustomers: 0, newAccounts: 0 });
    }
    monthlyData.get(month)!.newCustomers++;
  });

  accounts.forEach(account => {
    const month = new Date(account.created_at).toISOString().substring(0, 7);
    if (!monthlyData.has(month)) {
      monthlyData.set(month, { newCustomers: 0, newAccounts: 0 });
    }
    monthlyData.get(month)!.newAccounts++;
  });

  return Array.from(monthlyData.entries())
    .map(([month, data]) => ({
      month,
      newCustomers: data.newCustomers,
      newAccounts: data.newAccounts
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
};
