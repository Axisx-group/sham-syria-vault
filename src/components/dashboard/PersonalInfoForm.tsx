
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from 'lucide-react';

interface PersonalInfoFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
  };
  onInputChange: (field: string, value: string) => void;
  language: 'ar' | 'en';
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ formData, onInputChange, language }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">{language === 'ar' ? 'الاسم الأول *' : 'First Name *'}</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => onInputChange('firstName', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">{language === 'ar' ? 'اسم العائلة *' : 'Last Name *'}</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => onInputChange('lastName', e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">{language === 'ar' ? 'البريد الإلكتروني *' : 'Email *'}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">{language === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder={language === 'ar' ? '+963...' : '+963...'}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateOfBirth">{language === 'ar' ? 'تاريخ الميلاد *' : 'Date of Birth *'}</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => onInputChange('dateOfBirth', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="nationality">{language === 'ar' ? 'الجنسية *' : 'Nationality *'}</Label>
            <Select value={formData.nationality} onValueChange={(value) => onInputChange('nationality', value)}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'ar' ? 'اختر الجنسية' : 'Select nationality'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Syrian">{language === 'ar' ? 'سوري' : 'Syrian'}</SelectItem>
                <SelectItem value="Lebanese">{language === 'ar' ? 'لبناني' : 'Lebanese'}</SelectItem>
                <SelectItem value="Jordanian">{language === 'ar' ? 'أردني' : 'Jordanian'}</SelectItem>
                <SelectItem value="Palestinian">{language === 'ar' ? 'فلسطيني' : 'Palestinian'}</SelectItem>
                <SelectItem value="Iraqi">{language === 'ar' ? 'عراقي' : 'Iraqi'}</SelectItem>
                <SelectItem value="Egyptian">{language === 'ar' ? 'مصري' : 'Egyptian'}</SelectItem>
                <SelectItem value="Other">{language === 'ar' ? 'أخرى' : 'Other'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
