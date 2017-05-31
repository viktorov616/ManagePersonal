import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export default function SubNav({ activePath, paths }) {
  function isActive(path, i) {
    return (activePath.indexOf(path) !== -1) || (i === 0 && activePath === '/');
  }

  return (
    <ul className="nav nav-pills nav-stacked">
      { paths.map(({ name, path }, i) => (
        <li key={path} className={classNames({ active: isActive(path, i) })}>
          <NavLink to={path}>{ name }</NavLink>
        </li>
      )) }
    </ul>
  );
}

SubNav.propTypes = {
  activePath: PropTypes.string.isRequired,
  paths: PropTypes.array.isRequired,
};
