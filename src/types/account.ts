
import { LucideIcon } from 'lucide-react';

export interface Currency {
  code: string;
  name: string;
  icon: LucideIcon;
  minDeposit: number;
  countryCode: string;
}

export interface AccountCategory {
  id: string;
  type: 'personal' | 'business';
  name: string;
  description: string;
  benefits: string[];
  minDeposit: number;
  currency: string;
  color: string;
  bgColor: string;
  popular?: boolean;
}
