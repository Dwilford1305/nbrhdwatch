import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme'; // Import the theme
import { BoardProvider } from './contexts/BoardContext'; // Import BoardProvider
import { IncidentProvider } from './contexts/IncidentContext'; // Import IncidentProvider
import { Auth0Provider } from '@auth0/auth0-react'; // Import Auth0Provider

// Get Auth0 credentials from environment variables (Vite specific)
const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

// Ensure credentials are provided
if (!auth0Domain || !auth0ClientId) {
  console.error(
    'Auth0 Domain or Client ID not found. Make sure VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID are set in your .env file.'
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* Apply the theme */}
      <CssBaseline /> {/* Normalize CSS */}
      <BrowserRouter> {/* Set up router */}
        <Auth0Provider
          domain={auth0Domain}
          clientId={auth0ClientId}
          authorizationParams={{
            redirect_uri: window.location.origin // Use current origin for redirect
          }}
        >
          <BoardProvider> {/* Wrap App with BoardProvider */}
            <IncidentProvider> {/* Wrap with IncidentProvider */}
              <App />
            </IncidentProvider>
          </BoardProvider>
        </Auth0Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
