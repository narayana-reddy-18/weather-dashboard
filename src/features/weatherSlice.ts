import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrentWeather, fetchForecast, fetchHourlyForecast } from '../api/weatherAPI';
import { WeatherData, ForecastData, HourlyData } from '../types/weather';

interface WeatherState {
  currentWeather: Record<string, WeatherData>;
  forecasts: Record<string, ForecastData[]>;
  hourlyForecasts: Record<string, HourlyData[]>;
  loading: Record<string, boolean>;
  error: Record<string, string | null>;
}

const initialState: WeatherState = {
  currentWeather: {},
  forecasts: {},
  hourlyForecasts: {},
  loading: {},
  error: {},
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async ({ cityId, lat, lon, unit }: { cityId: string; lat: number; lon: number; unit: 'celsius' | 'fahrenheit' }) => {
    const weather = await fetchCurrentWeather(lat, lon, unit);
    return { cityId, weather };
  }
);

export const fetchForecastData = createAsyncThunk(
  'weather/fetchForecastData',
  async ({ cityId, lat, lon, unit }: { cityId: string; lat: number; lon: number; unit: 'celsius' | 'fahrenheit' }) => {
    const forecast = await fetchForecast(lat, lon, unit);
    return { cityId, forecast };
  }
);

export const fetchHourlyData = createAsyncThunk(
  'weather/fetchHourlyData',
  async ({ cityId, lat, lon, unit }: { cityId: string; lat: number; lon: number; unit: 'celsius' | 'fahrenheit' }) => {
    const hourly = await fetchHourlyForecast(lat, lon, unit);
    return { cityId, hourly };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state, action) => {
        state.loading[action.meta.arg.cityId] = true;
        state.error[action.meta.arg.cityId] = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action: PayloadAction<{ cityId: string; weather: WeatherData }>) => {
        state.loading[action.payload.cityId] = false;
        state.currentWeather[action.payload.cityId] = action.payload.weather;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading[action.meta.arg.cityId] = false;
        state.error[action.meta.arg.cityId] = action.error.message || 'Failed to fetch weather';
      })
      .addCase(fetchForecastData.fulfilled, (state, action: PayloadAction<{ cityId: string; forecast: ForecastData[] }>) => {
        state.forecasts[action.payload.cityId] = action.payload.forecast;
      })
      .addCase(fetchHourlyData.fulfilled, (state, action: PayloadAction<{ cityId: string; hourly: HourlyData[] }>) => {
        state.hourlyForecasts[action.payload.cityId] = action.payload.hourly;
      });
  },
});

export default weatherSlice.reducer;
