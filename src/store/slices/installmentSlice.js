import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchInstallments = createAsyncThunk(
  'installments/fetchInstallments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/installments');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCardInstallments = createAsyncThunk(
  'installments/fetchCardInstallments',
  async (cardId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/installments/card/${cardId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addInstallment = createAsyncThunk(
  'installments/addInstallment',
  async (installmentData, { rejectWithValue }) => {
    try {
      const response = await api.post('/installments', installmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateInstallment = createAsyncThunk(
  'installments/updateInstallment',
  async ({ id, installmentData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/installments/${id}`, installmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteInstallment = createAsyncThunk(
  'installments/deleteInstallment',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/installments/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const installmentSlice = createSlice({
  name: 'installments',
  initialState: {
    items: [],
    cardInstallments: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearInstallments: (state) => {
      state.items = [];
      state.cardInstallments = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all installments
      .addCase(fetchInstallments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstallments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchInstallments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch card installments
      .addCase(fetchCardInstallments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardInstallments.fulfilled, (state, action) => {
        state.loading = false;
        state.cardInstallments[action.meta.arg] = action.payload;
      })
      .addCase(fetchCardInstallments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add installment
      .addCase(addInstallment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addInstallment.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addInstallment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update installment
      .addCase(updateInstallment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInstallment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateInstallment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete installment
      .addCase(deleteInstallment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInstallment.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteInstallment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearInstallments } = installmentSlice.actions;
export default installmentSlice.reducer; 