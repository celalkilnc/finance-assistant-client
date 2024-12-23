import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchBills = createAsyncThunk(
  'bills/fetchBills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/bills');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUnpaidBills = createAsyncThunk(
  'bills/fetchUnpaidBills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/bills/unpaid');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBill = createAsyncThunk(
  'bills/addBill',
  async (billData, { rejectWithValue }) => {
    try {
      const response = await api.post('/bills', billData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBill = createAsyncThunk(
  'bills/updateBill',
  async ({ id, billData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/bills/${id}`, billData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBill = createAsyncThunk(
  'bills/deleteBill',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/bills/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const billSlice = createSlice({
  name: 'bills',
  initialState: {
    items: [],
    unpaidBills: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBills: (state) => {
      state.items = [];
      state.unpaidBills = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch bills
      .addCase(fetchBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch unpaid bills
      .addCase(fetchUnpaidBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnpaidBills.fulfilled, (state, action) => {
        state.loading = false;
        state.unpaidBills = action.payload;
      })
      .addCase(fetchUnpaidBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add bill
      .addCase(addBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBill.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update bill
      .addCase(updateBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBill.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete bill
      .addCase(deleteBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBill.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBills } = billSlice.actions;
export default billSlice.reducer; 