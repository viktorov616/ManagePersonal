import React from 'react';
import PropTypes from 'prop-types';
import { Errors, Control } from 'react-redux-form';
import classNames from 'classnames';

export default function TextFieldGroup({
  focus, label, name, type, valid, retouched, validationMessages,
}) {
  return (<div className={classNames('form-group', { 'has-error': !valid && !retouched && !focus })}>
    <label htmlFor={name} className="control-label">{ label }</label>
    <Control model={`.${name}`} type={type} name={name} className="form-control" />
    <Errors
      model={`.${name}`}
      messages={validationMessages}
      show={field => !field.retouched && !field.focus}
      wrapper={args => <div className="help-block">{ args.children }</div>}
    />
  </div>);
}

TextFieldGroup.propTypes = {
  focus: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
  retouched: PropTypes.bool.isRequired,
  validationMessages: PropTypes.object.isRequired,
};
