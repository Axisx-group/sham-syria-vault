
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface AccountType {
  type: string;
  name: string;
  benefits: string;
}

interface AccountTypeSelectorProps {
  accountTypes: AccountType[];
  selectedType: string;
  onTypeSelect: (type: string) => void;
  title: string;
}

const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({
  accountTypes,
  selectedType,
  onTypeSelect,
  title
}) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">{title}</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {accountTypes.map((type) => (
          <Card 
            key={type.type}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedType === type.type 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : ''
            }`}
            onClick={() => onTypeSelect(type.type)}
          >
            <CardContent className="p-4">
              <h4 className="font-medium mb-1">{type.name}</h4>
              <p className="text-xs text-gray-600">{type.benefits}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccountTypeSelector;
