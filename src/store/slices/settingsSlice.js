import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  notifications: true,
  billReminders: true,
  currency: 'USD',
  language: 'en-US',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    toggleBillReminders: (state) => {
      state.billReminders = !state.billReminders;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const {
  toggleTheme,
  toggleNotifications,
  toggleBillReminders,
  setCurrency,
  setLanguage,
} = settingsSlice.actions;

export default settingsSlice.reducer; 