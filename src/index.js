import App from './App';
import { createTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';

import '@fontsource/roboto';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0B2027'
    },
    secondary: {
      main: '#70A9A1'
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

