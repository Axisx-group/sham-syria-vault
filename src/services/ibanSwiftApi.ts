
interface IbanSwiftRequest {
  country_code?: string;
  bank_code?: string;
  account_code?: string;
  swift_code?: string;
  iban_code?: string;
}

interface IbanSwiftResponse {
  success: boolean;
  data: any;
  message: string;
}

export const ibanSwiftService = {
  // Generate SWIFT Code
  async generateSwiftCode(request: { country_code: string; bank_code: string }): Promise<IbanSwiftResponse> {
    try {
      const response = await fetch(`https://iban-and-swift-details.p.rapidapi.com/api/v1/swift/generate?country_code=${request.country_code}&bank_code=${request.bank_code}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'iban-and-swift-details.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: 'تم إنشاء رمز السويفت بنجاح'
      };
    } catch (error) {
      console.error('Generate SWIFT Code Error:', error);
      return {
        success: false,
        data: null,
        message: 'فشل في إنشاء رمز السويفت'
      };
    }
  },

  // Validate SWIFT Code
  async validateSwiftCode(request: { swift_code: string }): Promise<IbanSwiftResponse> {
    try {
      const response = await fetch(`https://iban-and-swift-details.p.rapidapi.com/api/v1/swift/validate?swift_code=${request.swift_code}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'iban-and-swift-details.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: 'تم التحقق من رمز السويفت بنجاح'
      };
    } catch (error) {
      console.error('Validate SWIFT Code Error:', error);
      return {
        success: false,
        data: null,
        message: 'فشل في التحقق من رمز السويفت'
      };
    }
  },

  // Extract SWIFT Information
  async extractSwiftInfo(request: { swift_code: string }): Promise<IbanSwiftResponse> {
    try {
      const response = await fetch(`https://iban-and-swift-details.p.rapidapi.com/api/v1/swift?swift_code=${request.swift_code}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'iban-and-swift-details.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: 'تم استخراج معلومات السويفت بنجاح'
      };
    } catch (error) {
      console.error('Extract SWIFT Info Error:', error);
      return {
        success: false,
        data: null,
        message: 'فشل في استخراج معلومات السويفت'
      };
    }
  },

  // Generate IBAN Code
  async generateIbanCode(request: { country_code: string; bank_code: string; account_code: string }): Promise<IbanSwiftResponse> {
    try {
      const response = await fetch(`https://iban-and-swift-details.p.rapidapi.com/api/v1/iban/generate?country_code=${request.country_code}&bank_code=${request.bank_code}&account_code=${request.account_code}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'iban-and-swift-details.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: 'تم إنشاء رمز الآيبان بنجاح'
      };
    } catch (error) {
      console.error('Generate IBAN Code Error:', error);
      return {
        success: false,
        data: null,
        message: 'فشل في إنشاء رمز الآيبان'
      };
    }
  },

  // Validate IBAN Code
  async validateIbanCode(request: { iban_code: string }): Promise<IbanSwiftResponse> {
    try {
      const response = await fetch(`https://iban-and-swift-details.p.rapidapi.com/api/v1/iban/validate?iban_code=${request.iban_code}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'iban-and-swift-details.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: 'تم التحقق من رمز الآيبان بنجاح'
      };
    } catch (error) {
      console.error('Validate IBAN Code Error:', error);
      return {
        success: false,
        data: null,
        message: 'فشل في التحقق من رمز الآيبان'
      };
    }
  },

  // Extract IBAN Information
  async extractIbanInfo(request: { iban_code: string }): Promise<IbanSwiftResponse> {
    try {
      const response = await fetch(`https://iban-and-swift-details.p.rapidapi.com/api/v1/iban?iban_code=${request.iban_code}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'iban-and-swift-details.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: 'تم استخراج معلومات الآيبان بنجاح'
      };
    } catch (error) {
      console.error('Extract IBAN Info Error:', error);
      return {
        success: false,
        data: null,
        message: 'فشل في استخراج معلومات الآيبان'
      };
    }
  }
};
