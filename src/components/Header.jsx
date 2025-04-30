import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom'; // Import useLocation
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Define paths that require the user to be logged in
const loggedInPaths = ['/members', '/settings', '/admin-preview', '/boards']; // Add /boards

function Header() {
  const location = useLocation(); // Get current location
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Determine if the current path is a logged-in path
  const isLoggedInArea = loggedInPaths.some(path => location.pathname.startsWith(path));

  // TODO: Replace isLoggedInArea check with actual authentication state check when implemented

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked");
    handleClose();
    // navigate('/'); // Optional: Redirect to public page after logout
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <SecurityIcon sx={{ mr: 1 }} />
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to={isLoggedInArea ? "/members" : "/"} // Adjust link based on area
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          Neighborhood Watch
        </Typography>
        
        {/* Conditionally render buttons based on logged-in area */}
        {isLoggedInArea ? (
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
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
            <Button component={RouterLink} to="/login" color="inherit">
              Login
            </Button>
            <Button component={RouterLink} to="/signup" color="inherit">
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
