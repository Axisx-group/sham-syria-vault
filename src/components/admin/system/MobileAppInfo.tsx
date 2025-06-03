
import React from 'react';

const MobileAppInfo = () => {
  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
      <h4 className="font-medium text-blue-900 mb-2">معلومات التطبيق المحمول:</h4>
      <div className="text-sm text-blue-800 space-y-1">
        <p>• للتشغيل على الهاتف: استخدم الأمر <code>npx cap sync</code></p>
        <p>• للأندرويد: <code>npx cap run android</code></p>
        <p>• للآيفون: <code>npx cap run ios</code></p>
        <p>• URL الحالي: {window.location.origin}</p>
      </div>
    </div>
  );
};

export default MobileAppInfo;
