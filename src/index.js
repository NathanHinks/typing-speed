import App from './components/App';
import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';

import theme from './styles/theme';
import './styles/index.css';
import '@fontsource/roboto';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
