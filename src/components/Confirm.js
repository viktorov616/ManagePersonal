import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CloseBtn from './CloseBtn';

export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.handleHotkeys = this.handleHotkeys.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleHotkeys);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleHotkeys);
  }

  handleHotkeys(e) {
    if (e.keyCode === 13) {
      this.props.ok();
    } else if (e.keyCode === 27) {
      this.props.close();
    }
  }

  render() {
    const { close, ok, text } = this.props;
    const wrapperStyle = {
      position: 'fixed',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
    };
    const confirmStyle = {
      border: '1px solid #000',
      borderRadius: '5px',
      padding: '10px',
      paddingBottom: '20px',
      marginTop: '20%',
      backgroundColor: '#fff',
    };
    const textStyle = {
      marginTop: '30px',
      marginBottom: '25px',
      fontSize: '24px',
    };

    return (
      <div style={wrapperStyle}>
        <div style={confirmStyle} className="col-md-4 col-md-offset-4">
          <CloseBtn onClick={close} />
          <p style={textStyle} className="text-center">{ text }</p>
          <div className="text-center">
            <button
              onClick={ok}
              type="button"
              style={{ marginRight: '10px' }}
              className="btn btn-primary"
            >
              Yes
            </button>
            <button onClick={close} type="button" className="btn btn-primary">No</button>
          </div>
        </div>
      </div>
    );
  }
}

Confirm.propTypes = {
  close: PropTypes.func.isRequired,
  ok: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
