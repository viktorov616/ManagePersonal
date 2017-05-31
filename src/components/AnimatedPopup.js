import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function AnimatedPopup({ children }) {
  return (
    <ReactCSSTransitionGroup
      transitionName="animation-slide"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      { children }
    </ReactCSSTransitionGroup>
  );
}

AnimatedPopup.propTypes = {
  children: PropTypes.node,
};

AnimatedPopup.defaultProps = {
  children: [],
};
