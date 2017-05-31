import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ authorized, parentProps, component: Component, ...rest }) {
  return (<Route
    {...rest}
    render={routeProps => (
      (authorized)
        ? (<Component {...parentProps} {...routeProps} />)
        : (<Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />)
    )}
  />);
}

PrivateRoute.propTypes = {
  authorized: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  parentProps: PropTypes.shape({
    location: PropTypes.object.isRequired,
  }).isRequired,

};
