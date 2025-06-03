
import React from 'react';
import { Calendar, Clock } from "lucide-react";

interface TransactionTimestampProps {
  timestamp: string;
}

const TransactionTimestamp = ({ timestamp }: TransactionTimestampProps) => {
  return (
    <div className="text-sm text-gray-600">
      <div className="flex items-center gap-1 mb-1">
        <Calendar className="h-3 w-3" />
        <span>{timestamp.split(' ')[0]}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        <span>{timestamp.split(' ')[1]}</span>
      </div>
    </div>
  );
};

export default TransactionTimestamp;
