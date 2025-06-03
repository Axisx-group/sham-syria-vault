
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface TransactionTypeIconProps {
  type: string;
}

const TransactionTypeIcon = ({ type }: TransactionTypeIconProps) => {
  const getTypeIcon = (type: string) => {
    if (type.includes('صادر') || type.includes('سحب') || type.includes('دفع')) {
      return <ArrowUpRight className="h-4 w-4 text-red-600" />;
    } else {
      return <ArrowDownRight className="h-4 w-4 text-green-600" />;
    }
  };

  return getTypeIcon(type);
};

export default TransactionTypeIcon;
