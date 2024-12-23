import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const expenses = useSelector((state) => state.expenses.items);
  const incomes = useSelector((state) => state.incomes.items);
  const bills = useSelector((state) => state.bills.items);
  const cards = useSelector((state) => state.cards.items);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalIncomes = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const balance = totalIncomes - totalExpenses - totalBills;

  const DashboardCard = ({ title, amount, color }) => (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" color={color}>
        ${amount.toFixed(2)}
      </Typography>
    </Paper>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Balance"
            amount={balance}
            color={balance >= 0 ? 'success.main' : 'error.main'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Income"
            amount={totalIncomes}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Expenses"
            amount={totalExpenses}
            color="error.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Bills"
            amount={totalBills}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Credit Cards ({cards.length})
            </Typography>
            <Grid container spacing={2}>
              {cards.map((card) => (
                <Grid item xs={12} sm={6} md={4} key={card.id}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      bgcolor: 'background.default',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="subtitle1">{card.name}</Typography>
                    <Typography variant="body2">
                      Balance: ${card.balance.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                      Limit: ${card.limit.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 