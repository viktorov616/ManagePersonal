import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorBlock({ id, errorMessage, removeError }) {
  function handleRemoveError() {
    removeError(id);
  }

  return (
    <div className="col-md-12 ">
      <p className="alert alert-danger">
        <button
          onClick={handleRemoveError}
          className="close"
          type="button"
        >
          <span>&times;</span>
        </button>
        { errorMessage }
      </p>
    </div>
  );
}

ErrorBlock.propTypes = {
  id: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  removeError: PropTypes.func.isRequired,
};
