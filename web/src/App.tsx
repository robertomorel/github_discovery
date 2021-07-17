import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Routes from './routes';
import { actionFetchPropertyList, actionRequestProperty, selectProperty, useActionDispatch } from './store';
import { GET_ALL_PROPERTIES } from './services/apollo';
import { PropertyProps } from './types';
import { MainHeader, Spinner, SpinnerWrapper } from './components';

const App: React.FC = () => {
  const { loading: loadingState, property } = useSelector(selectProperty);
  const dispatch = useActionDispatch();
  /** @todo: improve this logic */
  const { loading, data, networkStatus } = useQuery<{ getProperties: PropertyProps[] }>(
    GET_ALL_PROPERTIES
  );

  // Trying to get Property information from the store first
  //dispatch(actionFetchPropertyList())

  useEffect(() => {
    if(!loading
      && networkStatus === 7 /* Ok */
      && data
      && data.getProperties) {
      dispatch(actionRequestProperty(data.getProperties));
    }
  }, [loading, dispatch]);

  return (
    <>
      {(loadingState || loading) ? (
        <SpinnerWrapper style={{height:'60rem'}}>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <BrowserRouter>
          {/*<MainHeader />*/}
          <Routes />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
