import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import AppProvider from './hooks';
import App from './App';
import { store } from './store'
import GlobalStyle from './styles/global';

ReactDOM.render(
  <React.StrictMode>
      <GlobalStyle />
      <Provider store={store}>
        <AppProvider>
          <App />
        </AppProvider>
      </Provider>
  </React.StrictMode>,

  document.getElementById('root'),
);
