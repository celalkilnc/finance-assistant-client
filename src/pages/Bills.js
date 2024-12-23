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
} from '@mui/icons-material';
import { fetchBills, fetchUnpaidBills, deleteBill } from '../store/slices/billSlice';
import BillForm from '../components/BillForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatCurrency, formatDate } from '../utils/formatters';

const Bills = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { items: bills, unpaidBills, loading, error } = useSelector((state) => state.bills);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(fetchBills());
    dispatch(fetchUnpaidBills());
  }, [dispatch]);

  const handleAddClick = () => {
    setSelectedBill(null);
    setOpenDialog(true);
  };

  const handleEditClick = (bill) => {
    setSelectedBill(bill);
    setOpenDialog(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      await dispatch(deleteBill(id));
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBill(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  const displayBills = tabValue === 0 ? bills : unpaidBills;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Bills
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Bill
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="All Bills" />
        <Tab label="Unpaid Bills" />
      </Tabs>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Due Date</TableCell>
              {!isMobile && <TableCell>Type</TableCell>}
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              {!isMobile && <TableCell>Description</TableCell>}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayBills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>{formatDate(bill.dueDate)}</TableCell>
                {!isMobile && <TableCell>{bill.type}</TableCell>}
                <TableCell>{formatCurrency(bill.amount)}</TableCell>
                <TableCell>
                  <Chip
                    label={bill.isPaid ? 'Paid' : 'Unpaid'}
                    color={bill.isPaid ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                {!isMobile && <TableCell>{bill.description}</TableCell>}
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(bill)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(bill.id)}
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
        <BillForm
          bill={selectedBill}
          onClose={handleCloseDialog}
        />
      </Dialog>
    </Box>
  );
};

export default Bills; 