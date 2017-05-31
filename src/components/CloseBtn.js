import React from 'react';
import PropTypes from 'prop-types';

export default function CloseBtn({ float, onClick, size }) {
  return (
    <button
      type="button"
      style={{ float: `${float}` }}
      className="close"
      aria-label="Close"
      onClick={onClick}
    >
      <span style={{ fontSize: `${size}px` }} aria-hidden="true">&times;</span>
    </button>
  );
}

CloseBtn.propTypes = {
  float: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
};

CloseBtn.defaultProps = {
  float: 'right',
  size: '16px',
};
