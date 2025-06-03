
export interface UnifiedNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  section: 'atm' | 'swift' | 'customers' | 'kyc' | 'transactions' | 'security' | 'system';
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionUrl?: string;
  relatedId?: string;
  category?: 'atm' | 'swift' | 'customer' | 'kyc' | 'security' | 'system';
}
