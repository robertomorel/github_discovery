import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import { selectProfile } from './store';
import { Spinner, SpinnerWrapper } from './components';

const App: React.FC = () => {
  const { loading } = useSelector(selectProfile);

  return (
    <>
      {(loading) ? (
        <SpinnerWrapper style={{height:'60rem'}}>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
