import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityData } from '../types/weather';

interface FavoritesState {
  cities: CityData[];
}

const loadFavorites = (): CityData[] => {
  const saved = localStorage.getItem('favoriteCities');
  if (saved) {
    return JSON.parse(saved);
  }
  return [
    { id: 'london', name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
    { id: 'new-york', name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
    { id: 'tokyo', name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
  ];
};

const initialState: FavoritesState = {
  cities: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<CityData>) => {
      const exists = state.cities.find(city => city.id === action.payload.id);
      if (!exists) {
        state.cities.push(action.payload);
        localStorage.setItem('favoriteCities', JSON.stringify(state.cities));
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
      localStorage.setItem('favoriteCities', JSON.stringify(state.cities));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
