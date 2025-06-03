
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface IntegratedNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'atm' | 'swift' | 'customer' | 'kyc';
  section: 'atm' | 'swift' | 'customers' | 'kyc' | 'transactions' | 'security' | 'system';
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionUrl?: string;
  relatedId?: string;
}

export const useIntegratedNotifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<IntegratedNotification[]>([]);

  // محاكاة الإشعارات المختلفة من جميع الأقسام
  useEffect(() => {
    const mockNotifications: IntegratedNotification[] = [
      {
        id: '1',
        title: 'تنبيه أمني - جهاز ATM',
        message: 'جهاز ATM005 في مطار دمشق يواجه مشكلة أمنية',
        type: 'error',
        section: 'atm',
        timestamp: new Date(Date.now() - 5 * 60000),
        read: false,
        priority: 'critical',
        actionUrl: '/admin?tab=atm&device=ATM005',
        relatedId: 'ATM005'
      },
      {
        id: '2',
        title: 'طلب عميل جديد',
        message: 'طلب فتح حساب جديد من أحمد محمد',
        type: 'info',
        section: 'customers',
        timestamp: new Date(Date.now() - 15 * 60000),
        read: false,
        priority: 'medium',
        actionUrl: '/admin?tab=customer-approvals',
        relatedId: 'CUST_001'
      },
      {
        id: '3',
        title: 'تحويل SWIFT معلق',
        message: 'تحويل دولي بقيمة $50,000 يحتاج موافقة',
        type: 'warning',
        section: 'swift',
        timestamp: new Date(Date.now() - 30 * 60000),
        read: false,
        priority: 'high',
        actionUrl: '/admin?tab=swift&transfer=SWIFT_001',
        relatedId: 'SWIFT_001'
      },
      {
        id: '4',
        title: 'KYC مكتمل',
        message: 'تم اكتمال التحقق من هوية العميل سارة أحمد',
        type: 'success',
        section: 'kyc',
        timestamp: new Date(Date.now() - 45 * 60000),
        read: true,
        priority: 'low',
        actionUrl: '/admin?tab=kyc&application=KYC_001',
        relatedId: 'KYC_001'
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const addNotification = (notification: Omit<IntegratedNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: IntegratedNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // عرض التوست للإشعارات المهمة
    if (notification.priority === 'critical' || notification.priority === 'high') {
      toast({
        title: notification.title,
        description: notification.message,
        variant: notification.type === 'error' ? 'destructive' : 'default'
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getUnreadCount = () => notifications.filter(n => !n.read).length;

  const getNotificationsBySection = (section: string) => 
    notifications.filter(n => n.section === section);

  const getCriticalNotifications = () => 
    notifications.filter(n => n.priority === 'critical' && !n.read);

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    getUnreadCount,
    getNotificationsBySection,
    getCriticalNotifications
  };
};
