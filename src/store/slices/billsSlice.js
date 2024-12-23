import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.items.push({
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });
    },
    updateBill: (state, action) => {
      const index = state.items.findIndex((bill) => bill.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteBill: (state, action) => {
      state.items = state.items.filter((bill) => bill.id !== action.payload);
    },
    setBills: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addBill,
  updateBill,
  deleteBill,
  setBills,
  setLoading,
  setError,
} = billsSlice.actions;

export default billsSlice.reducer; 