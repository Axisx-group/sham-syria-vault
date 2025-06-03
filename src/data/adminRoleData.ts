
import type { AdminUser, Role, Permission } from "@/types/adminRole";

export const adminUsers: AdminUser[] = [
  {
    id: 'ADMIN001',
    name: 'أحمد المدير العام',
    email: 'ahmed.manager@bank.sy',
    role: 'مدير عام',
    permissions: ['جميع الصلاحيات'],
    status: 'نشط',
    lastLogin: '2024-01-20 14:30',
    avatar: 'أ',
    department: 'الإدارة العليا',
    joinDate: '2022-01-15',
    actionsThisMonth: 145
  },
  {
    id: 'ADMIN002', 
    name: 'سارة مديرة العملاء',
    email: 'sara.customers@bank.sy',
    role: 'مدير عملاء',
    permissions: ['إدارة العملاء', 'عرض التقارير', 'المراسلة'],
    status: 'نشط',
    lastLogin: '2024-01-20 13:45',
    avatar: 'س',
    department: 'خدمة العملاء',
    joinDate: '2022-03-20',
    actionsThisMonth: 89
  },
  {
    id: 'ADMIN003',
    name: 'محمد مشرف الأمان',
    email: 'mohammed.security@bank.sy',
    role: 'مشرف أمان',
    permissions: ['الحظر والإشراف', 'عرض التقارير الأمنية', 'إدارة المخاطر'],
    status: 'نشط',
    lastLogin: '2024-01-20 12:20',
    avatar: 'م',
    department: 'الأمان والمخاطر',
    joinDate: '2022-05-10',
    actionsThisMonth: 67
  }
];

export const roles: Role[] = [
  {
    id: 'ROLE001',
    name: 'مدير عام',
    description: 'صلاحيات كاملة لجميع أقسام النظام',
    permissions: [
      'إدارة العملاء',
      'إدارة الحسابات',
      'إدارة البطاقات',
      'الحظر والإشراف',
      'نظام المراسلة',
      'إدارة الصفحات',
      'التحليلات المتقدمة',
      'إدارة الأدوار',
      'إعدادات النظام',
      'النسخ الاحتياطي'
    ],
    usersCount: 1,
    level: 'عالي',
    color: 'bg-red-100 text-red-800'
  },
  {
    id: 'ROLE002',
    name: 'مدير عملاء',
    description: 'إدارة شؤون العملاء والحسابات',
    permissions: [
      'إدارة العملاء',
      'إدارة الحسابات',
      'إدارة البطاقات',
      'نظام المراسلة',
      'عرض التقارير',
      'التحليلات الأساسية'
    ],
    usersCount: 3,
    level: 'متوسط',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'ROLE003',
    name: 'مشرف أمان',
    description: 'مراقبة الأمان والحظر والإشراف',
    permissions: [
      'الحظر والإشراف',
      'عرض بيانات العملاء',
      'التقارير الأمنية',
      'إدارة المخاطر',
      'نظام المراسلة الأمني'
    ],
    usersCount: 2,
    level: 'متوسط',
    color: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 'ROLE004',
    name: 'محرر محتوى',
    description: 'إدارة محتوى الموقع والصفحات',
    permissions: [
      'إدارة الصفحات',
      'إدارة المحتوى',
      'رفع الوسائط',
      'تحرير القوالب'
    ],
    usersCount: 1,
    level: 'منخفض',
    color: 'bg-green-100 text-green-800'
  }
];

export const allPermissions: Permission[] = [
  { id: 'customers', name: 'إدارة العملاء', category: 'العملاء' },
  { id: 'accounts', name: 'إدارة الحسابات', category: 'العملاء' },
  { id: 'cards', name: 'إدارة البطاقات', category: 'العملاء' },
  { id: 'moderation', name: 'الحظر والإشراف', category: 'الأمان' },
  { id: 'security_reports', name: 'التقارير الأمنية', category: 'الأمان' },
  { id: 'risk_management', name: 'إدارة المخاطر', category: 'الأمان' },
  { id: 'messaging', name: 'نظام المراسلة', category: 'التواصل' },
  { id: 'notifications', name: 'إدارة الإشعارات', category: 'التواصل' },
  { id: 'page_management', name: 'إدارة الصفحات', category: 'المحتوى' },
  { id: 'content_editing', name: 'تحرير المحتوى', category: 'المحتوى' },
  { id: 'media_library', name: 'مكتبة الوسائط', category: 'المحتوى' },
  { id: 'analytics', name: 'التحليلات المتقدمة', category: 'التقارير' },
  { id: 'basic_reports', name: 'التقارير الأساسية', category: 'التقارير' },
  { id: 'role_management', name: 'إدارة الأدوار', category: 'النظام' },
  { id: 'system_settings', name: 'إعدادات النظام', category: 'النظام' },
  { id: 'backup', name: 'النسخ الاحتياطي', category: 'النظام' }
];
