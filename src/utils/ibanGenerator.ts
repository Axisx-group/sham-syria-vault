
export const generateIBAN = (countryCode: string): string => {
  const bankCode = '0001'; // Bank Aljazira code
  const branchCode = '001';
  const accountNumber = Math.random().toString().substr(2, 12);
  const checkDigits = '00'; // Simplified for demo
  return `${countryCode}${checkDigits}${bankCode}${branchCode}${accountNumber}`;
};
