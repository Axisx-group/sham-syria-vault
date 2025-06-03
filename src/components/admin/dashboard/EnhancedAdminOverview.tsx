
import React from 'react';
import IntegratedDashboard from '../integrated/IntegratedDashboard';

interface EnhancedAdminOverviewProps {
  onNavigateToSection?: (section: string, subSection?: string) => void;
}

const EnhancedAdminOverview: React.FC<EnhancedAdminOverviewProps> = ({ onNavigateToSection }) => {
  const handleNavigateToSection = (section: string, subSection?: string) => {
    console.log('التنقل إلى القسم:', section, subSection);
    if (onNavigateToSection) {
      onNavigateToSection(section, subSection);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم الإدارية المترابطة</h1>
          <p className="text-gray-600 mt-1">نظرة شاملة ومترابطة على حالة النظام والعمليات</p>
        </div>
      </div>

      <IntegratedDashboard onNavigateToSection={handleNavigateToSection} />
    </div>
  );
};

export default EnhancedAdminOverview;
