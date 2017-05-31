import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export default function Nav({ activePath, paths }) {
  function isActive(path) {
    return (path === activePath)
      || (path === '/' && !paths.map(link => link.path).slice(1).some((item => item === activePath)));
  }
  return (
    <nav className="navbar navbar-default">
      <ul className="nav navbar-nav">
        { paths.map(({ name, path }) => (
          <li key={path} className={classNames({ active: isActive(path) })} >
            <NavLink
              exact
              to={path}
              className="navbar-link"
            >
              { name }
            </NavLink>
          </li>)) }
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  activePath: PropTypes.string.isRequired,
  paths: PropTypes.array.isRequired,
};
