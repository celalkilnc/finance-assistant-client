import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/settingsSlice';

const Settings = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Paper elevation={3} sx={{ mt: 2 }}>
        <List>
          <ListItem>
            <ListItemText
              primary="Dark Mode"
              secondary="Toggle between light and dark theme"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={isDarkMode}
                onChange={handleThemeToggle}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Notifications"
              secondary="Enable or disable notifications"
            />
            <ListItemSecondaryAction>
              <Switch edge="end" defaultChecked />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Bill Reminders"
              secondary="Get reminded before bills are due"
            />
            <ListItemSecondaryAction>
              <Switch edge="end" defaultChecked />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Currency"
              secondary="USD - United States Dollar"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Language"
              secondary="English (US)"
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default Settings; 