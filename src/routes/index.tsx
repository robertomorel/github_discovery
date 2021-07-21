import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home, Listing } from '../pages';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/listing" exact component={Listing} />
  </Switch>
);

export default Routes;
