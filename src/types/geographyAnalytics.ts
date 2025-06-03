
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
