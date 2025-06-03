
import { 
  Monitor,
  Activity,
  Users,
  Database,
  Settings,
  Shield
} from "lucide-react";

export const sidebarItems = [
  { id: 'overview', label: 'نظرة عامة شاملة', icon: Monitor },
  { id: 'system-status', label: 'مراقبة النظام', icon: Activity },
  { 
    id: 'customers', 
    label: 'إدارة العملاء المتقدمة', 
    icon: Users,
    children: [
      { id: 'customers', label: 'قاعدة بيانات العملاء', icon: Users },
      { id: 'customer-control', label: 'التحكم المتقدم', icon: Shield }
    ]
  },
  { 
    id: 'accounts', 
    label: 'النظام المصرفي', 
    icon: Database,
    children: [
      { id: 'accounts', label: 'إدارة الحسابات', icon: Database },
      { id: 'cards', label: 'نظام البطاقات', icon: Shield }
    ]
  },
  { id: 'transactions', label: 'مراقبة المعاملات', icon: Activity },
  { id: 'swift', label: 'تحويلات SWIFT الدولية', icon: Shield, badge: 2 },
  { id: 'atm', label: 'شبكة الصرافات الآلية', icon: Monitor, badge: 3 },
  { id: 'kyc', label: 'نظام التحقق المتقدم', icon: Shield, badge: 3 },
  { id: 'app-control', label: 'التطبيق المحمول', icon: Monitor, badge: 2 },
  { id: 'messaging', label: 'نظام المراسلة المؤسسي', icon: Shield, badge: 5 },
  { id: 'moderation', label: 'الأمان والإشراف', icon: Shield },
  { id: 'page-management', label: 'إدارة المحتوى', icon: Settings },
  { id: 'analytics', label: 'التحليلات الذكية', icon: Activity },
  { id: 'role-management', label: 'إدارة الصلاحيات', icon: Settings },
  { id: 'reports', label: 'التقارير التنفيذية', icon: Activity }
];
