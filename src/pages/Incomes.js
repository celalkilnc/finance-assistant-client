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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Repeat as RepeatIcon,
} from '@mui/icons-material';
import { fetchIncomes, fetchRecurringIncomes, deleteIncome } from '../store/slices/incomeSlice';
import IncomeForm from '../components/IncomeForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatCurrency, formatDate } from '../utils/formatters';

const Incomes = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { items: incomes, recurringIncomes, loading, error } = useSelector((state) => state.incomes);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(fetchIncomes());
    dispatch(fetchRecurringIncomes());
  }, [dispatch]);

  const handleAddClick = () => {
    setSelectedIncome(null);
    setOpenDialog(true);
  };

  const handleEditClick = (income) => {
    setSelectedIncome(income);
    setOpenDialog(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
      await dispatch(deleteIncome(id));
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedIncome(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  const displayIncomes = tabValue === 0 ? incomes : recurringIncomes;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Incomes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Income
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="All Incomes" />
        <Tab label="Recurring Incomes" />
      </Tabs>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              {!isMobile && <TableCell>Category</TableCell>}
              <TableCell>Amount</TableCell>
              {!isMobile && <TableCell>Description</TableCell>}
              <TableCell>Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayIncomes.map((income) => (
              <TableRow key={income.id}>
                <TableCell>{formatDate(income.date)}</TableCell>
                {!isMobile && <TableCell>{income.category}</TableCell>}
                <TableCell>{formatCurrency(income.amount)}</TableCell>
                {!isMobile && <TableCell>{income.description}</TableCell>}
                <TableCell>
                  {income.isRecurring ? (
                    <Chip
                      icon={<RepeatIcon />}
                      label={income.recurringPeriod}
                      color="primary"
                      size="small"
                    />
                  ) : (
                    <Chip label="One-time" size="small" />
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(income)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(income.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <IncomeForm
          income={selectedIncome}
          onClose={handleCloseDialog}
        />
      </Dialog>
    </Box>
  );
};

export default Incomes; 