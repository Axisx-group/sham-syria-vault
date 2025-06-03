
export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency: string;
  note?: string;
}

export interface SwiftTransferRequest {
  fromAccount: string;
  beneficiaryName: string;
  beneficiaryAddress?: string;
  beneficiaryAccount: string;
  swiftCode: string;
  bankName?: string;
  bankAddress?: string;
  amount: number;
  currency: string;
  purpose: string;
  reference?: string;
}

export interface BillPaymentRequest {
  billType: string;
  billNumber: string;
  amount: number;
  fromAccount: string;
  currency: string;
}

export interface MobileTopupRequest {
  phoneNumber: string;
  operator: string;
  amount: number;
  fromAccount: string;
}

export interface CurrencyExchangeRequest {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  fromAccount: string;
  toAccount: string;
}
