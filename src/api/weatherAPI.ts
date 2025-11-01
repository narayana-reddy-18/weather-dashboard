import axios from 'axios';
import { WeatherData, ForecastData, HourlyData, CityData } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 60000;

const getCachedData = <T>(key: string): T | null => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  return null;
};

const setCachedData = (key: string, data: unknown): void => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const fetchCurrentWeather = async (
  lat: number,
  lon: number,
  unit: 'celsius' | 'fahrenheit'
): Promise<WeatherData> => {
  const units = unit === 'celsius' ? 'metric' : 'imperial';
  const cacheKey = `weather-${lat}-${lon}-${units}`;

  const cached = getCachedData<WeatherData>(cacheKey);
  if (cached) return cached;

  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      units,
      appid: API_KEY,
    },
  });

  const data: WeatherData = {
    city: response.data.name,
    country: response.data.sys.country,
    lat: response.data.coord.lat,
    lon: response.data.coord.lon,
    temp: Math.round(response.data.main.temp),
    feelsLike: Math.round(response.data.main.feels_like),
    tempMin: Math.round(response.data.main.temp_min),
    tempMax: Math.round(response.data.main.temp_max),
    humidity: response.data.main.humidity,
    pressure: response.data.main.pressure,
    windSpeed: Math.round(response.data.wind.speed),
    windDeg: response.data.wind.deg,
    description: response.data.weather[0].description,
    icon: response.data.weather[0].icon,
    timestamp: Date.now(),
  };

  setCachedData(cacheKey, data);
  return data;
};

export const fetchForecast = async (
  lat: number,
  lon: number,
  unit: 'celsius' | 'fahrenheit'
): Promise<ForecastData[]> => {
  const units = unit === 'celsius' ? 'metric' : 'imperial';
  const cacheKey = `forecast-${lat}-${lon}-${units}`;

  const cached = getCachedData<ForecastData[]>(cacheKey);
  if (cached) return cached;

  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      units,
      appid: API_KEY,
    },
  });

  const dailyData: Record<string, ForecastData> = {};

  response.data.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();

    if (!dailyData[date]) {
      dailyData[date] = {
        date,
        temp: Math.round(item.main.temp),
        tempMin: Math.round(item.main.temp_min),
        tempMax: Math.round(item.main.temp_max),
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        pop: Math.round(item.pop * 100),
      };
    } else {
      dailyData[date].tempMin = Math.min(dailyData[date].tempMin, Math.round(item.main.temp_min));
      dailyData[date].tempMax = Math.max(dailyData[date].tempMax, Math.round(item.main.temp_max));
    }
  });

  const forecast = Object.values(dailyData).slice(0, 7);
  setCachedData(cacheKey, forecast);
  return forecast;
};

export const fetchHourlyForecast = async (
  lat: number,
  lon: number,
  unit: 'celsius' | 'fahrenheit'
): Promise<HourlyData[]> => {
  const units = unit === 'celsius' ? 'metric' : 'imperial';
  const cacheKey = `hourly-${lat}-${lon}-${units}`;

  const cached = getCachedData<HourlyData[]>(cacheKey);
  if (cached) return cached;

  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      units,
      appid: API_KEY,
    },
  });

  const hourly: HourlyData[] = response.data.list.slice(0, 8).map((item: any) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
    temp: Math.round(item.main.temp),
    humidity: item.main.humidity,
    windSpeed: Math.round(item.wind.speed),
    description: item.weather[0].description,
    icon: item.weather[0].icon,
    pop: Math.round(item.pop * 100),
  }));

  setCachedData(cacheKey, hourly);
  return hourly;
};

export const searchCities = async (query: string): Promise<CityData[]> => {
  if (!query || query.length < 2) return [];

  const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
    params: {
      q: query,
      limit: 5,
      appid: API_KEY,
    },
  });

  return response.data.map((item: any) => ({
    id: `${item.name.toLowerCase().replace(/\s+/g, '-')}-${item.country.toLowerCase()}`,
    name: item.name,
    country: item.country,
    lat: item.lat,
    lon: item.lon,
  }));
};
