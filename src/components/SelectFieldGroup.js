import React from 'react';
import PropTypes from 'prop-types';
import { Errors, Control } from 'react-redux-form';
import classNames from 'classnames';

export default function SelectFieldGroup({
  focus, label, name, options, retouched, valid, validationMessages,
}) {
  return (
    <div className={classNames('form-group', { 'has-error': !valid && !retouched && !focus })}>
      <label htmlFor={name} className="control-label">{ label }</label>
      <Control.select model={`.${name}`} name={name} className="form-control">
        <option value="" />
        { Object.keys(options).map(key => (
          <option key={key} value={key}>{ options[key] }</option>
        )) }
      </Control.select>
      <Errors
        model={`.${name}`}
        messages={validationMessages}
        show={field => !field.retouched && !field.focus}
        wrapper={args => <div className="help-block">{ args.children }</div>}
      />
    </div>
  );
}

SelectFieldGroup.propTypes = {
  focus: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  valid: PropTypes.bool.isRequired,
  retouched: PropTypes.bool.isRequired,
  validationMessages: PropTypes.object.isRequired,
};
