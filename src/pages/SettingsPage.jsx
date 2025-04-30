import React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, ListItemIcon, Divider, Switch, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import GroupIcon from '@mui/icons-material/Group'; // Import GroupIcon

function SettingsPage() {
  // TODO: Fetch user settings and handle updates

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      {/* Profile Settings */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile Information" secondary="Manage your name, username, and contact details" />
            <Button variant="outlined" size="small">Edit Profile</Button>
          </ListItem>
        </List>
      </Paper>

      {/* Notification Settings */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Email Notifications" secondary="Receive alerts and updates via email" />
            <Switch defaultChecked /> {/* TODO: Bind to actual setting */}
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Push Notifications" secondary="Receive alerts directly on your device (if app installed)" />
            <Switch disabled /> {/* TODO: Implement push notifications */}
          </ListItem>
           <Divider component="li" />
           <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="New Post Notifications" secondary="Get notified about new posts in followed boards" />
            <Switch defaultChecked /> {/* TODO: Bind to actual setting */}
          </ListItem>
        </List>
      </Paper>

      {/* Privacy & Security Settings */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary="Change Password" secondary="Update your account password" />
            <Button variant="outlined" size="small">Change</Button>
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Two-Factor Authentication" secondary="Add an extra layer of security to your account" />
            <Button variant="outlined" size="small" disabled>Enable (Coming Soon)</Button>
          </ListItem>
           <Divider component="li" />
           <ListItem>
            <ListItemIcon>
              <GroupIcon /> {/* Assuming GroupIcon is imported or available */}
            </ListItemIcon>
            <ListItemText primary="Directory Visibility" secondary="Control who can see you in the member directory" />
             <Switch defaultChecked /> {/* TODO: Bind to actual setting */}
          </ListItem>
        </List>
      </Paper>

       {/* TODO: Add other settings sections like Data Management, etc. */}

    </Container>
  );
}

export default SettingsPage;
