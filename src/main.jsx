import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme'; // Import the theme
import { BoardProvider } from './contexts/BoardContext'; // Import BoardProvider
import { IncidentProvider } from './contexts/IncidentContext'; // Import IncidentProvider
import { Auth0Provider } from '@auth0/auth0-react'; // Import Auth0Provider

// Get Auth0 credentials from environment variables (Vite specific)
const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const AUTH0_NAMESPACE = 'https://nbrhd-watch.com/roles'; // Define namespace

// Ensure credentials are provided
if (!auth0Domain || !auth0ClientId) {
  console.error(
    'Auth0 Domain or Client ID not found. Make sure VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID are set in your .env file.'
  );
}

// Define the main component rendering logic
function Main() {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    // Check if Auth0 passed back a specific returnTo path
    const returnTo = appState?.returnTo || '/members';
    
    // Add a state flag if the target is /members, indicating it's immediately after login
    const navigationState = returnTo === '/members' ? { state: { fromLogin: true } } : {};

    navigate(returnTo, { replace: true, ...navigationState });
  };

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}> {/* Apply the theme */}
        <CssBaseline /> {/* Normalize CSS */}
        <Auth0Provider
          domain={auth0Domain}
          clientId={auth0ClientId}
          authorizationParams={{
            redirect_uri: window.location.origin, // Use current origin for redirect
            scope: "openid profile email"
          }}
          onRedirectCallback={onRedirectCallback} // Use the updated callback
        >
          <BoardProvider> {/* Wrap App with BoardProvider */}
            <IncidentProvider> {/* Wrap with IncidentProvider */}
              <App />
            </IncidentProvider>
          </BoardProvider>
        </Auth0Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

// Render the Main component wrapped in BrowserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);
