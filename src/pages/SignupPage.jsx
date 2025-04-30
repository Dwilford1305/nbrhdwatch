import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { Link as RouterLink } from 'react-router-dom';

function SignupPage() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const handleSignup = () => {
    loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });
  };

  if (isLoading) {
    return (
      <Container component="main" maxWidth="xs" sx={{ textAlign: 'center', mt: 8 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading...</Typography>
      </Container>
    );
  }

  if (isAuthenticated) {
    return (
      <Container component="main" maxWidth="xs" sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h6">You are already logged in.</Typography>
        <Button component={RouterLink} to="/members" variant="contained" sx={{ mt: 2 }}>
          Go to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Sign Up
        </Typography>
        <Typography sx={{ mb: 3, textAlign: 'center' }}>
          Click the button below to create an account or sign in.
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Button
            onClick={handleSignup}
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Sign Up / Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignupPage;
