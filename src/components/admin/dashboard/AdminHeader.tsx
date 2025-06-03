
import React from 'react';
import IntegratedHeader from '../integrated/IntegratedHeader';
import { useToast } from '@/hooks/use-toast';

interface AdminHeaderProps {
  currentSection?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ currentSection = 'overview' }) => {
  const { toast } = useToast();

  const handleExportData = () => {
    console.log('تصدير البيانات الشاملة');
    toast({
      title: "جاري التصدير",
      description: "سيتم تصدير جميع البيانات المترابطة قريباً",
    });
  };

  const handleRefreshData = () => {
    console.log('تحديث البيانات');
    toast({
      title: "تم التحديث",
      description: "تم تحديث جميع البيانات بنجاح",
    });
  };

  return (
    <IntegratedHeader
      currentSection={currentSection}
      onExportData={handleExportData}
      onRefreshData={handleRefreshData}
    />
  );
};

export default AdminHeader;
