
import React from 'react';
import { CheckCircle, XCircle, Clock } from "lucide-react";
import type { SystemCheck } from "@/types/systemStatus";

interface SystemStatusSummaryProps {
  checks: SystemCheck[];
  isChecking: boolean;
}

const SystemStatusSummary = ({ checks, isChecking }: SystemStatusSummaryProps) => {
  const allSuccessful = checks.every(check => check.status === 'success');
  const hasErrors = checks.some(check => check.status === 'error');

  if (isChecking) {
    return null;
  }

  return (
    <div className="mt-6 p-4 rounded-lg border">
      {allSuccessful ? (
        <div className="flex items-center gap-2 text-green-700">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">جميع الأنظمة تعمل بنجاح!</span>
        </div>
      ) : hasErrors ? (
        <div className="flex items-center gap-2 text-red-700">
          <XCircle className="h-5 w-5" />
          <span className="font-medium">تم اكتشاف مشاكل في النظام</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-yellow-700">
          <Clock className="h-5 w-5" />
          <span className="font-medium">جاري فحص النظام...</span>
        </div>
      )}
    </div>
  );
};

export default SystemStatusSummary;
