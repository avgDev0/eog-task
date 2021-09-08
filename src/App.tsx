import React from 'react';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { WebSocketLink } from '@apollo/client/link/ws';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
  HttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from './components/Wrapper';
import MetricsSection from './components/MetricsSection';
import ChartSection from './components/ChartSection';

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

const wsLink = new WebSocketLink({
  uri: 'ws://react.eogresources.com/graphql',
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: 'https://react.eogresources.com/graphql',
});

const clientLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link: clientLink,
  cache: new InMemoryCache(),
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <CssBaseline />
        <Wrapper>
          <MetricsSection />
          <ChartSection />
          <ToastContainer />
        </Wrapper>
      </ApolloProvider>
    </Provider>
  </MuiThemeProvider>
);

export default App;
