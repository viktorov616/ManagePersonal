import React from 'react';
import PropTypes from 'prop-types';

export default function PopupContainer({ children }) {
  const styles = {
    position: 'absolute',
    top: '100px',
    left: '20%',
    width: '60%',
    background: '#fff',
  };

  return (
    <div className="panel panel-default" style={styles}>
      <div className="panel-body">
        { children }
      </div>
    </div>
  );
}

PopupContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
