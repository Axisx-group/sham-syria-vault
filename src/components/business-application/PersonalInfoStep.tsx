
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ formData, onInputChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label htmlFor="firstName">الاسم الأول *</Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) => onInputChange('firstName', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="lastName">اسم العائلة *</Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) => onInputChange('lastName', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">البريد الإلكتروني *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">رقم الهاتف *</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoStep;
