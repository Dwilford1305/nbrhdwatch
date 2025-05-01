import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress, Box, Typography } from '@mui/material';

const AUTH0_NAMESPACE = 'https://nbrhd-watch.com/roles'; // Ensure this matches AdminPage

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Checking authentication...</Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, passing the intended destination
    // Auth0 will handle redirecting back after login
    loginWithRedirect({
      appState: { returnTo: window.location.pathname },
    });
    // Render loading/message while redirecting
    return (
       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
         <CircularProgress />
         <Typography sx={{ ml: 2 }}>Redirecting to login...</Typography>
       </Box>
    );
  }

  // Check for required role if specified
  const userRoles = user?.[AUTH0_NAMESPACE] || [];
  if (role && !userRoles.includes(role)) {
    // User is authenticated but doesn't have the required role
    // Redirect to a general member page or show an 'Access Denied' message/component
    // For now, redirecting to /members as a fallback
    // Consider creating a dedicated 'Unauthorized' page later
    return <Navigate to="/members" replace />; 
  }

  // User is authenticated and has the required role (or no role was required)
  return children;
};

export default ProtectedRoute;
