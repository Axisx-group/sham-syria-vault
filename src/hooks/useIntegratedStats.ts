
import { useState, useEffect } from 'react';

interface IntegratedStats {
  overview: {
    totalCustomers: number;
    totalAccounts: number;
    totalTransactions: number;
    totalBalance: number;
    activeATMs: number;
    pendingSwifts: number;
    pendingKYCs: number;
    criticalAlerts: number;
  };
  growth: {
    customersGrowth: number;
    transactionsGrowth: number;
    balanceGrowth: number;
    atmUptime: number;
  };
  realTime: {
    onlineUsers: number;
    activeTransactions: number;
    systemLoad: number;
    networkStatus: 'online' | 'degraded' | 'offline';
  };
  geographic: {
    topCities: Array<{ name: string; customers: number; transactions: number }>;
    atmDistribution: Array<{ location: string; count: number; status: string }>;
  };
}

export const useIntegratedStats = () => {
  const [stats, setStats] = useState<IntegratedStats>({
    overview: {
      totalCustomers: 15240,
      totalAccounts: 18560,
      totalTransactions: 89230,
      totalBalance: 2450000000,
      activeATMs: 45,
      pendingSwifts: 8,
      pendingKYCs: 12,
      criticalAlerts: 3
    },
    growth: {
      customersGrowth: 12.5,
      transactionsGrowth: 8.3,
      balanceGrowth: 15.2,
      atmUptime: 98.7
    },
    realTime: {
      onlineUsers: 1420,
      activeTransactions: 156,
      systemLoad: 78,
      networkStatus: 'online'
    },
    geographic: {
      topCities: [
        { name: 'دمشق', customers: 8500, transactions: 45230 },
        { name: 'حلب', customers: 4200, transactions: 23100 },
        { name: 'حمص', customers: 1800, transactions: 12400 },
        { name: 'اللاذقية', customers: 1200, transactions: 8500 }
      ],
      atmDistribution: [
        { location: 'دمشق', count: 20, status: 'online' },
        { location: 'حلب', count: 12, status: 'online' },
        { location: 'حمص', count: 8, status: 'online' },
        { location: 'اللاذقية', count: 5, status: 'maintenance' }
      ]
    }
  });

  const [loading, setLoading] = useState(false);

  // محاكاة تحديث البيانات الفورية
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        realTime: {
          ...prev.realTime,
          onlineUsers: prev.realTime.onlineUsers + Math.floor(Math.random() * 10 - 5),
          activeTransactions: Math.floor(Math.random() * 200) + 100,
          systemLoad: Math.floor(Math.random() * 30) + 60
        }
      }));
    }, 30000); // تحديث كل 30 ثانية

    return () => clearInterval(interval);
  }, []);

  const refreshStats = async () => {
    setLoading(true);
    // محاكاة تحديث البيانات
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const getStatsBySectionIds = (sectionIds: string[]) => {
    const sectionStats: any = {};
    
    sectionIds.forEach(section => {
      switch (section) {
        case 'customers':
          sectionStats.customers = {
            total: stats.overview.totalCustomers,
            growth: stats.growth.customersGrowth,
            pending: stats.overview.pendingKYCs
          };
          break;
        case 'atm':
          sectionStats.atm = {
            total: stats.overview.activeATMs,
            uptime: stats.growth.atmUptime,
            alerts: stats.overview.criticalAlerts
          };
          break;
        case 'swift':
          sectionStats.swift = {
            pending: stats.overview.pendingSwifts,
            total: stats.overview.totalTransactions
          };
          break;
        case 'transactions':
          sectionStats.transactions = {
            total: stats.overview.totalTransactions,
            active: stats.realTime.activeTransactions,
            growth: stats.growth.transactionsGrowth
          };
          break;
      }
    });

    return sectionStats;
  };

  return {
    stats,
    loading,
    refreshStats,
    getStatsBySectionIds
  };
};
