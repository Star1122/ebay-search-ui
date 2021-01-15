import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Converter from 'containers/FilterConfigurator';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Converter} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
