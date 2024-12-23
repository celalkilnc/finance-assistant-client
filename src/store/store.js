import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import expenseReducer from './slices/expenseSlice';
import billReducer from './slices/billSlice';
import incomeReducer from './slices/incomeSlice';
import cardReducer from './slices/cardSlice';
import installmentReducer from './slices/installmentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    bills: billReducer,
    incomes: incomeReducer,
    cards: cardReducer,
    installments: installmentReducer,
  },
}); 