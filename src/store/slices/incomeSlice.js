import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchIncomes = createAsyncThunk(
  'incomes/fetchIncomes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/incomes');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRecurringIncomes = createAsyncThunk(
  'incomes/fetchRecurringIncomes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/incomes/recurring');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addIncome = createAsyncThunk(
  'incomes/addIncome',
  async (incomeData, { rejectWithValue }) => {
    try {
      const response = await api.post('/incomes', incomeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateIncome = createAsyncThunk(
  'incomes/updateIncome',
  async ({ id, incomeData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/incomes/${id}`, incomeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteIncome = createAsyncThunk(
  'incomes/deleteIncome',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/incomes/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const incomeSlice = createSlice({
  name: 'incomes',
  initialState: {
    items: [],
    recurringIncomes: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearIncomes: (state) => {
      state.items = [];
      state.recurringIncomes = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch incomes
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch recurring incomes
      .addCase(fetchRecurringIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecurringIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.recurringIncomes = action.payload;
      })
      .addCase(fetchRecurringIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add income
      .addCase(addIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update income
      .addCase(updateIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete income
      .addCase(deleteIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearIncomes } = incomeSlice.actions;
export default incomeSlice.reducer; 