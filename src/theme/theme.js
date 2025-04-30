import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500], // Primary blue color
    },
    secondary: {
      main: blue[800], // Darker blue for secondary elements
    },
    // You can customize other colors like error, warning, info, success
    // background: { default: '#f0f4f8' }, // Example light blue background
  },
  // You can also customize typography, spacing, breakpoints, etc.
  // typography: {
  //   fontFamily: 'Roboto, Arial, sans-serif',
  // },
});

export default theme;
