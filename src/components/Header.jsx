import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, ListItemIcon, Avatar } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Import admin icon
import { useAuth0 } from "@auth0/auth0-react";

// Define roles and helper function (can be moved to a shared utils file later)
const AUTH0_NAMESPACE = 'https://nbrhd-watch.com/roles';
const ADMIN_ROLE = 'Admin';
const READ_ONLY_ADMIN_ROLE = 'ReadOnlyAdmin';

const hasRole = (user, role) => {
  return user?.[AUTH0_NAMESPACE]?.includes(role);
};

function Header() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    loginWithRedirect, 
    logout 
  } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleSignup = () => {
    loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    handleClose();
  };

  // Determine if user is any kind of admin
  const isAdmin = isAuthenticated && (hasRole(user, ADMIN_ROLE) || hasRole(user, READ_ONLY_ADMIN_ROLE));

  if (isLoading) {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <SecurityIcon sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>Neighborhood Watch</Typography>
                <Typography>Loading...</Typography>
            </Toolbar>
        </AppBar>
    );
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <SecurityIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to={isAuthenticated ? "/members" : "/"}
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          Neighborhood Watch
        </Typography>

        {isAuthenticated ? (
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{ p: 0 }} // Remove padding if using Avatar
            >
              {user?.picture ? (
                <Avatar 
                  alt={user.name || user.nickname || 'User'} 
                  src={user.picture} 
                  sx={{ width: 32, height: 32 }} 
                  referrerPolicy="no-referrer" // Add referrerPolicy
                />
              ) : (
                <AccountCircle sx={{ width: 32, height: 32 }} />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* Conditionally render Admin Dashboard link */}
              {isAdmin && (
                <MenuItem component={RouterLink} to="/admin" onClick={handleClose}>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Admin Dashboard
                </MenuItem>
              )}
              <MenuItem component={RouterLink} to="/settings" onClick={handleClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button onClick={handleLogin} color="inherit">
              Login
            </Button>
            <Button onClick={handleSignup} color="inherit">
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
