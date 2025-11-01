import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  unit: 'celsius' | 'fahrenheit';
}

const loadSettings = (): SettingsState => {
  const saved = localStorage.getItem('weatherSettings');
  if (saved) {
    return JSON.parse(saved);
  }
  return { unit: 'celsius' };
};

const initialState: SettingsState = loadSettings();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === 'celsius' ? 'fahrenheit' : 'celsius';
      localStorage.setItem('weatherSettings', JSON.stringify(state));
    },
    setUnit: (state, action: PayloadAction<'celsius' | 'fahrenheit'>) => {
      state.unit = action.payload;
      localStorage.setItem('weatherSettings', JSON.stringify(state));
    },
  },
});

export const { toggleUnit, setUnit } = settingsSlice.actions;
export default settingsSlice.reducer;
