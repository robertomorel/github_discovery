import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux'

import AppProvider from './hooks';
import api from './services/api';
import App from './App';
import { store } from './store'
import GlobalStyle from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={api}>
      <GlobalStyle />
      <Provider store={store}>
        <AppProvider>
          <App />
        </AppProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,

  document.getElementById('root'),
);
