
interface NubariumRequest {
  documento: string;
  tipo_documento: string;
}

interface NubariumResponse {
  success: boolean;
  data: any;
  message: string;
}

export const nubariumService = {
  async consultarDocumento(request: NubariumRequest): Promise<NubariumResponse> {
    try {
      const response = await fetch('https://nubarium.p.rapidapi.com/sat/consultar_69b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'nubarium.p.rapidapi.com'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: 'تم الاستعلام بنجاح'
      };
    } catch (error) {
      console.error('Nubarium API Error:', error);
      return {
        success: false,
        data: null,
        message: 'فشل في الاستعلام. يرجى المحاولة مرة أخرى.'
      };
    }
  }
};
