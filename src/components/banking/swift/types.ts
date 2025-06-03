
export interface SwiftTransferFormData {
  fromAccount: string;
  beneficiaryName: string;
  beneficiaryAddress: string;
  beneficiaryAccount: string;
  swiftCode: string;
  bankName: string;
  bankAddress: string;
  amount: string;
  currency: string;
  purpose: string;
  reference: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
}

export interface SwiftTransferProps {
  language: 'ar' | 'en';
}
