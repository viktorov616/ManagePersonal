import React from 'react';
import PropTypes from 'prop-types';

import ErrorBlock from './ErrorBlock';

export default function Errors({ errors, removeError }) {
  return (
    <div className="row">
      { errors.map(error => <ErrorBlock
        key={error.id}
        errorMessage={error.message}
        id={error.id}
        removeError={removeError}
      />) }
    </div>
  );
}

Errors.propTypes = {
  errors: PropTypes.array.isRequired,
  removeError: PropTypes.func.isRequired,
};
