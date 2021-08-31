import React from 'react';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
// import Header from './components/Header';
import Wrapper from './components/Wrapper';
// import NowWhat from './components/NowWhat';
import MetricsSection from './components/MetricsSection';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <Wrapper>
        <MetricsSection />
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
