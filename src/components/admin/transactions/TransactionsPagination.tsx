
import React from 'react';
import { Button } from "@/components/ui/button";

const TransactionsPagination = () => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600">
        عرض 1 إلى 5 من أصل 15,847 معاملة
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">السابق</Button>
        <Button variant="outline" size="sm">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">3</Button>
        <Button variant="outline" size="sm">التالي</Button>
      </div>
    </div>
  );
};

export default TransactionsPagination;
