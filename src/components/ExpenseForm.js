import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from '@mui/material';
import { addExpense, updateExpense } from '../store/slices/expenseSlice';

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Healthcare',
  'Utilities',
  'Other',
];

const ExpenseForm = ({ expense, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    amount: '',
    description: '',
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        date: expense.date.split('T')[0],
        category: expense.category,
        amount: expense.amount,
        description: expense.description,
      });
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (expense) {
      await dispatch(updateExpense({ id: expense.id, expenseData }));
    } else {
      await dispatch(addExpense(expenseData));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>
        {expense ? 'Edit Expense' : 'Add New Expense'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            inputProps={{ step: '0.01', min: '0' }}
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          {expense ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </form>
  );
};

export default ExpenseForm; 