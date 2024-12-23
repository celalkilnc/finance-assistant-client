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
  FormControlLabel,
  Switch,
} from '@mui/material';
import { addCard, updateCard } from '../store/slices/cardSlice';

const cardTypes = [
  'Credit Card',
  'Debit Card',
  'Prepaid Card',
];

const CardForm = ({ card, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    number: '',
    expiryDate: '',
    limit: '',
    isActive: true,
  });

  useEffect(() => {
    if (card) {
      setFormData({
        name: card.name,
        type: card.type,
        number: card.number,
        expiryDate: card.expiryDate.split('T')[0],
        limit: card.limit,
        isActive: card.isActive,
      });
    }
  }, [card]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardData = {
      ...formData,
      limit: parseFloat(formData.limit),
    };

    if (card) {
      await dispatch(updateCard({ id: card.id, cardData }));
    } else {
      await dispatch(addCard(cardData));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>
        {card ? 'Edit Card' : 'Add New Card'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Card Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField
            select
            label="Card Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          >
            {cardTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Card Number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            required
            inputProps={{ maxLength: 16 }}
          />
          <TextField
            label="Expiry Date"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Credit Limit"
            type="number"
            value={formData.limit}
            onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
            required
            inputProps={{ step: '0.01', min: '0' }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
            }
            label="Active Card"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          {card ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </form>
  );
};

export default CardForm; 