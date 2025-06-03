
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UnifiedNotification } from '@/types/notifications';

export const useIntegratedNotifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<UnifiedNotification[]>([]);

  // محاكاة الإشعارات المختلفة من جميع الأقسام
  useEffect(() => {
    const mockNotifications: UnifiedNotification[] = [
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
        relatedId: 'ATM005',
        category: 'atm'
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
        relatedId: 'CUST_001',
        category: 'customer'
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
        relatedId: 'SWIFT_001',
        category: 'swift'
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
        relatedId: 'KYC_001',
        category: 'kyc'
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const addNotification = (notification: Omit<UnifiedNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: UnifiedNotification = {
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
