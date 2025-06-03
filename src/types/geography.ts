
export interface SyrianGovernorate {
  id: string;
  name_ar: string;
  name_en: string;
  code: string;
  population?: number;
  area_km2?: number;
  capital_ar?: string;
  capital_en?: string;
  description_ar?: string;
  description_en?: string;
  created_at: string;
  updated_at: string;
}

export interface Country {
  id: string;
  name_ar: string;
  name_en: string;
  iso_code_2: string;
  iso_code_3: string;
  capital_ar?: string;
  capital_en?: string;
  currency_code?: string;
  currency_name_ar?: string;
  currency_name_en?: string;
  timezone?: string;
  continent_ar?: string;
  continent_en?: string;
  created_at: string;
  updated_at: string;
}

export interface GeographicRegion {
  id: string;
  name_ar: string;
  name_en: string;
  region_type: 'governorate' | 'country' | 'continent';
  parent_region_id?: string;
  governorate_id?: string;
  country_id?: string;
  created_at: string;
  updated_at: string;
}

export interface GeographyStats {
  totalGovernorates: number;
  totalCountries: number;
  customersDistribution: {
    governorate: string;
    count: number;
  }[];
}
