import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Alert,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

function SignupPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, currentUser } = useAuth(); // Get signup function and currentUser

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      const from = location.state?.from?.pathname || "/members";
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location.state]);

  const handleSignupClick = () => {
    setError('');
    // Netlify Identity Widget handles the signup form
    signup();
    // Note: Error handling might need adjustment based on how Netlify Identity reports errors.
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up / Sign In
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        <Box sx={{ mt: 1, width: '100%' }}>
          {/* Remove all form fields */}
          <Button
            onClick={handleSignupClick}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Sign Up / Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              {/* Link to login might be redundant */}
              {/* <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link> */}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignupPage;
