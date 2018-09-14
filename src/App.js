import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" component={Orders} />
            <Route path="/burger" component={BurgerBuilder} />
            <Redirect from="/" to="/burger" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
