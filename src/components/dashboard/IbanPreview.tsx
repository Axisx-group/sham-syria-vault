
import React from 'react';
import { Label } from "@/components/ui/label";
import { generateIBAN } from "@/utils/ibanGenerator";

interface IbanPreviewProps {
  countryCode: string;
  title: string;
}

const IbanPreview: React.FC<IbanPreviewProps> = ({ countryCode, title }) => {
  return (
    <div className="space-y-2">
      <Label className="text-base font-semibold">{title}</Label>
      <div className="p-3 bg-gray-50 rounded-lg border">
        <p className="font-mono text-sm text-gray-700">{generateIBAN(countryCode)}</p>
      </div>
    </div>
  );
};

export default IbanPreview;
