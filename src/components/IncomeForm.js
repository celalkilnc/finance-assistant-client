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
  Switch,
  FormControlLabel,
} from '@mui/material';
import { addIncome, updateIncome } from '../store/slices/incomeSlice';

const categories = [
  'Salary',
  'Freelance',
  'Investment',
  'Rental',
  'Other',
];

const IncomeForm = ({ income, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    amount: '',
    description: '',
    isRecurring: false,
    recurringPeriod: 'Monthly',
  });

  useEffect(() => {
    if (income) {
      setFormData({
        date: income.date.split('T')[0],
        category: income.category,
        amount: income.amount,
        description: income.description,
        isRecurring: income.isRecurring,
        recurringPeriod: income.recurringPeriod || 'Monthly',
      });
    }
  }, [income]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const incomeData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (income) {
      await dispatch(updateIncome({ id: income.id, incomeData }));
    } else {
      await dispatch(addIncome(incomeData));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>
        {income ? 'Edit Income' : 'Add New Income'}
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
          <FormControlLabel
            control={
              <Switch
                checked={formData.isRecurring}
                onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
              />
            }
            label="Recurring Income"
          />
          {formData.isRecurring && (
            <TextField
              select
              label="Recurring Period"
              value={formData.recurringPeriod}
              onChange={(e) => setFormData({ ...formData, recurringPeriod: e.target.value })}
            >
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Quarterly">Quarterly</MenuItem>
              <MenuItem value="Yearly">Yearly</MenuItem>
            </TextField>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          {income ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </form>
  );
};

export default IncomeForm; 