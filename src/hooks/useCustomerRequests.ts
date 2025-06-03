
import { NewCustomerRequest } from "@/types/customerRequest";

export const useCustomerRequests = () => {
  const newCustomerRequests: NewCustomerRequest[] = [
    {
      id: 'REQ001',
      name: 'أحمد محمد علي',
      email: 'ahmed.ali@email.com',
      phone: '+963 991 234 567',
      accountType: 'شخصي',
      requestDate: '2024-01-20 14:30',
      location: 'دمشق، سوريا',
      status: 'pending',
      documents: ['الهوية الشخصية', 'إثبات العنوان', 'إثبات الدخل'],
      notes: 'طلب فتح حساب جاري شخصي'
    },
    {
      id: 'REQ002',
      name: 'فاطمة حسن محمود',
      email: 'fatima.hassan@email.com',
      phone: '+963 992 345 678',
      accountType: 'تجاري',
      requestDate: '2024-01-20 13:15',
      location: 'حلب، سوريا',
      status: 'pending',
      documents: ['السجل التجاري', 'البطاقة الضريبية', 'عقد التأسيس'],
      notes: 'طلب فتح حساب تجاري لشركة استيراد وتصدير'
    },
    {
      id: 'REQ003',
      name: 'محمد سعد الدين',
      email: 'mohammed.saad@email.com',
      phone: '+963 993 456 789',
      accountType: 'توفير',
      requestDate: '2024-01-20 12:00',
      location: 'حمص، سوريا',
      status: 'pending',
      documents: ['الهوية الشخصية', 'إثبات العنوان'],
      notes: 'طلب فتح حساب توفير'
    }
  ];

  const pendingRequests = newCustomerRequests.filter(req => req.status === 'pending');

  return {
    newCustomerRequests,
    pendingRequests
  };
};
