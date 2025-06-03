
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

      // Fetch customers with their geographic data
      const { data: customers, error: customersError } = await supabase
        .from('customers')
        .select('*');

      if (customersError) throw customersError;

      // Fetch accounts data
      const { data: accounts, error: accountsError } = await supabase
        .from('bank_accounts')
        .select('*');

      if (accountsError) throw accountsError;

      // Fetch cards data
      const { data: cards, error: cardsError } = await supabase
        .from('bank_cards')
        .select('*');

      if (cardsError) throw cardsError;

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

      setAnalytics(analyticsData);
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
  return {
    personal: customers.filter(c => c.account_type === 'personal').length,
    business: customers.filter(c => c.account_type === 'business').length
  };
};

const processStatusDistribution = (customers: any[]) => {
  return {
    active: customers.filter(c => c.status === 'active').length,
    suspended: customers.filter(c => c.status === 'suspended').length,
    closed: customers.filter(c => c.status === 'closed').length
  };
};

const processCardTypeDistribution = (cards: any[]) => {
  return {
    debit: cards.filter(c => c.card_type === 'debit').length,
    credit: cards.filter(c => c.card_type === 'credit').length
  };
};

const processCurrencyDistribution = (accounts: any[]) => {
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
