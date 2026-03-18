export interface City {
  location: string;
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    weather_code: number;
    is_day: number;
  };
  current_units: {
    relative_humidity_2m: string;
    apparent_temperature: string;
    wind_speed_10m: string;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
}