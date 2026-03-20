export type GeoApi = {
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  country?: string;
  country_code?: string;
  feature_code: string;
};

export type CitySuggestions = {
  cityName: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
};