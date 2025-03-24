// src/theme.js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2151F5',
    },
    secondary: {
      main: '#5E6585',
      icon:'#4caf50'
    },
    background: {
      default: '#000000',
      paper: '#1e1e1e',
    },
  },
});

export default darkTheme;