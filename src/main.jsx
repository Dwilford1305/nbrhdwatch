import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme'; // Import the theme
import { BoardProvider } from './contexts/BoardContext'; // Import BoardProvider
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import { IncidentProvider } from './contexts/IncidentContext'; // Import IncidentProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* Apply the theme */} 
      <CssBaseline /> {/* Normalize CSS */} 
      <BrowserRouter> {/* Set up router */} 
        <AuthProvider> {/* Wrap with AuthProvider */} 
          <BoardProvider> {/* Wrap App with BoardProvider */}
            <IncidentProvider> {/* Wrap with IncidentProvider */}
              <App />
            </IncidentProvider>
          </BoardProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
