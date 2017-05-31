import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';
import Nav from '../components/Nav';
import Home from './Home';
import LoginPage from './LoginPage';

import navPaths from '../data/navPaths';

export default function Layout(props) {
  const { authorized } = props.user;

  return (
    <div>
      <header>
        <Nav paths={navPaths} activePath={props.location.pathname} />
      </header>
      <main className="col-md-12">
        <Switch>
          <Route path="/login" render={routeProps => <LoginPage {...props} {...routeProps} />} />
          <PrivateRoute path="/" component={Home} parentProps={props} authorized={authorized} />
        </Switch>
      </main>
    </div>
  );
}

Layout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    authorized: PropTypes.bool.isRequired,
  }).isRequired,
};
