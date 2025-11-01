import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weatherSlice';
import favoritesReducer from '../features/favoritesSlice';
import settingsReducer from '../features/settingsSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
