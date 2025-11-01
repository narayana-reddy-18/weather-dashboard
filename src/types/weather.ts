export interface WeatherData {
  city: string;
  country: string;
  lat: number;
  lon: number;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDeg: number;
  description: string;
  icon: string;
  timestamp: number;
}

export interface ForecastData {
  date: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  pop: number;
}

export interface HourlyData {
  time: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  pop: number;
}

export interface CityData {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}
