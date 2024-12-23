import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { addInstallment, updateInstallment } from '../store/slices/installmentSlice';

const InstallmentForm = ({ installment, onClose }) => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.items);
  const [formData, setFormData] = useState({
    cardId: '',
    description: '',
    totalAmount: '',
    numberOfInstallments: '',
    startDate: '',
    isPaid: false,
  });

  useEffect(() => {
    if (installment) {
      setFormData({
        cardId: installment.cardId,
        description: installment.description,
        totalAmount: installment.totalAmount,
        numberOfInstallments: installment.numberOfInstallments,
        startDate: installment.startDate.split('T')[0],
        isPaid: installment.isPaid,
      });
    }
  }, [installment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const installmentData = {
      ...formData,
      totalAmount: parseFloat(formData.totalAmount),
      numberOfInstallments: parseInt(formData.numberOfInstallments, 10),
    };

    if (installment) {
      await dispatch(updateInstallment({ id: installment.id, installmentData }));
    } else {
      await dispatch(addInstallment(installmentData));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>
        {installment ? 'Edit Installment' : 'Add New Installment'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            select
            label="Card"
            value={formData.cardId}
            onChange={(e) => setFormData({ ...formData, cardId: e.target.value })}
            required
          >
            {cards.map((card) => (
              <MenuItem key={card.id} value={card.id}>
                {card.name} (**** {card.number.slice(-4)})
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <TextField
            label="Total Amount"
            type="number"
            value={formData.totalAmount}
            onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
            required
            inputProps={{ step: '0.01', min: '0' }}
          />
          <TextField
            label="Number of Installments"
            type="number"
            value={formData.numberOfInstallments}
            onChange={(e) => setFormData({ ...formData, numberOfInstallments: e.target.value })}
            required
            inputProps={{ min: '1', max: '48' }}
          />
          <TextField
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            required
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.isPaid}
                onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
              />
            }
            label="Paid"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          {installment ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </form>
  );
};

export default InstallmentForm; 