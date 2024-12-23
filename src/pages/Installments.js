import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { fetchInstallments, fetchCardInstallments, deleteInstallment } from '../store/slices/installmentSlice';
import { fetchCards } from '../store/slices/cardSlice';
import InstallmentForm from '../components/InstallmentForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatCurrency, formatDate } from '../utils/formatters';

const Installments = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { items: installments, cardInstallments, loading, error } = useSelector((state) => state.installments);
  const cards = useSelector((state) => state.cards.items);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState(null);
  const [selectedCard, setSelectedCard] = useState('all');

  useEffect(() => {
    dispatch(fetchInstallments());
    dispatch(fetchCards());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCard !== 'all') {
      dispatch(fetchCardInstallments(selectedCard));
    }
  }, [dispatch, selectedCard]);

  const handleAddClick = () => {
    setSelectedInstallment(null);
    setOpenDialog(true);
  };

  const handleEditClick = (installment) => {
    setSelectedInstallment(installment);
    setOpenDialog(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this installment?')) {
      await dispatch(deleteInstallment(id));
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedInstallment(null);
  };

  const handleCardChange = (event) => {
    setSelectedCard(event.target.value);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  const displayInstallments = selectedCard === 'all' ? installments : (cardInstallments[selectedCard] || []);

  const calculateMonthlyPayment = (totalAmount, numberOfInstallments) => {
    return totalAmount / numberOfInstallments;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Installments
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Installment
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Filter by Card</InputLabel>
          <Select
            value={selectedCard}
            label="Filter by Card"
            onChange={handleCardChange}
          >
            <MenuItem value="all">All Cards</MenuItem>
            {cards.map((card) => (
              <MenuItem key={card.id} value={card.id}>
                {card.name} (**** {card.number.slice(-4)})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Card</TableCell>
              <TableCell>Description</TableCell>
              {!isMobile && <TableCell>Start Date</TableCell>}
              <TableCell>Total Amount</TableCell>
              {!isMobile && <TableCell>Monthly Payment</TableCell>}
              <TableCell>Installments</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayInstallments.map((installment) => {
              const card = cards.find(c => c.id === installment.cardId);
              const monthlyPayment = calculateMonthlyPayment(
                installment.totalAmount,
                installment.numberOfInstallments
              );

              return (
                <TableRow key={installment.id}>
                  <TableCell>
                    {card ? `${card.name} (**** ${card.number.slice(-4)})` : 'Unknown Card'}
                  </TableCell>
                  <TableCell>{installment.description}</TableCell>
                  {!isMobile && <TableCell>{formatDate(installment.startDate)}</TableCell>}
                  <TableCell>{formatCurrency(installment.totalAmount)}</TableCell>
                  {!isMobile && <TableCell>{formatCurrency(monthlyPayment)}</TableCell>}
                  <TableCell>{installment.numberOfInstallments}</TableCell>
                  <TableCell>
                    <Chip
                      label={installment.isPaid ? 'Paid' : 'Active'}
                      color={installment.isPaid ? 'success' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(installment)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(installment.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <InstallmentForm
          installment={selectedInstallment}
          onClose={handleCloseDialog}
        />
      </Dialog>
    </Box>
  );
};

export default Installments; 