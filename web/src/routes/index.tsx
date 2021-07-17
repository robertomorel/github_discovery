import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home, Listing, Detail } from '../pages';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/listing" exact component={Listing} />
    <Route path="/detail/:propertyId" exact component={Detail} />
  </Switch>
);

export default Routes;
