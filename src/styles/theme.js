import { createTheme } from '@material-ui/core';

const theme = createTheme({
  typography: {
    fontSize: 20,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#0B2027',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#17B890',
      contrastText: '#F1F1F1',
    },
    text: {
      disabled: '#ffffffb1',
    },
    transitions: {
      duration: {
        standard: 500,
      },
    },
  },
});

export default theme;
