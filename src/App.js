import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';

// Pages
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Bills from './pages/Bills';
import Expenses from './pages/Expenses';
import Incomes from './pages/Incomes';
import Cards from './pages/Cards';
import Installments from './pages/Installments';

// Theme
import { lightTheme, darkTheme } from './theme';

function App() {
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/installments" element={<Installments />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
