import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

function Header() {
  const location = useLocation();
  const navigate = useNavigate(); // Add useNavigate
  const { currentUser, logout, login, signup } = useAuth(); // Get currentUser and auth functions
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/'); // Redirect to public page after logout
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <SecurityIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to={currentUser ? "/members" : "/"} // Adjust link based on currentUser
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          Neighborhood Watch
        </Typography>

        {/* Conditionally render buttons based on currentUser */}
        {currentUser ? (
          <Box>
            <Typography variant="body1" component="span" sx={{ mr: 2 }}>
              Hi, {currentUser.username}
            </Typography>
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
              {/* Optionally show Admin link based on role */}
              {currentUser.role === 'Admin' && (
                <MenuItem component={RouterLink} to="/admin-preview" onClick={handleClose}>
                  {/* Add an appropriate icon if desired */}
                  Admin Panel
                </MenuItem>
              )}
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
            {/* Use the login/signup functions from context */}
            <Button onClick={() => login()} color="inherit">
              Login
            </Button>
            <Button onClick={() => signup()} color="inherit">
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
