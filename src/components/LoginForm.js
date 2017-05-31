import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-redux-form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Errors from './Errors';
import TextFieldGroup from './TextFieldGroup';

import { validationRequired } from '../utility/validators';

export default function LoginForm({ errors, form, isFetching, onSubmit, removeError }) {
  function handleSubmit(data) {
    onSubmit(data);
  }

  const validators = {
    username: { validationRequired },
    password: { validationRequired },
  };

  const validationMessages = {
    validationRequired: 'Is Required',
  };

  return (
    <Form
      model="form.loginForm"
      onSubmit={handleSubmit}
      validators={validators}
      validateOn="submit"
    >
      <h1>Login</h1>
      <ReactCSSTransitionGroup
        transitionName="animation-fade"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      >
        { (errors.length)
          ? <Errors errors={errors} removeError={removeError} />
          : null }
      </ReactCSSTransitionGroup>
      <TextFieldGroup
        type="text"
        name="username"
        label="Username"
        focus={form.username.focus}
        valid={form.username.valid}
        retouched={form.username.retouched}
        validationMessages={validationMessages}
      />
      <TextFieldGroup
        type="password"
        name="password"
        label="Password"
        focus={form.password.focus}
        valid={form.password.valid}
        retouched={form.password.retouched}
        validationMessages={validationMessages}
      />
      <div className="form-group">
        <button
          className="btn btn-primary btn-lg center-block"
          type="submit"
        >
          { isFetching && <i className="icon-spinner animate-spin" /> } Login
        </button>
      </div>
    </Form>
  );
}

LoginForm.propTypes = {
  errors: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  removeError: PropTypes.func.isRequired,
};
