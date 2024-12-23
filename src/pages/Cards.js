import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Dialog,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CreditCard as CreditCardIcon,
} from '@mui/icons-material';
import { fetchCards, deleteCard } from '../store/slices/cardSlice';
import CardForm from '../components/CardForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatCurrency } from '../utils/formatters';

const Cards = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { items: cards, loading, error } = useSelector((state) => state.cards);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const handleAddClick = () => {
    setSelectedCard(null);
    setOpenDialog(true);
  };

  const handleEditClick = (card) => {
    setSelectedCard(card);
    setOpenDialog(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      await dispatch(deleteCard(id));
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCard(null);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Cards
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Card
        </Button>
      </Box>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CreditCardIcon sx={{ mr: 1 }} />
                  <Typography variant="h6" component="div">
                    {card.name}
                  </Typography>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {card.type}
                </Typography>
                <Typography variant="body2">
                  Card Number: **** **** **** {card.number.slice(-4)}
                </Typography>
                <Typography variant="body2">
                  Expiry Date: {new Date(card.expiryDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Limit: {formatCurrency(card.limit)}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={card.isActive ? 'Active' : 'Inactive'}
                    color={card.isActive ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => handleEditClick(card)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteClick(card.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <CardForm
          card={selectedCard}
          onClose={handleCloseDialog}
        />
      </Dialog>
    </Box>
  );
};

export default Cards; 