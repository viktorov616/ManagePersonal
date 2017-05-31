import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from '../components/LoginForm';

export default function Login({ form, login, loginPage, logout, removeError, user }) {
  const handleRemoveError = removeError.bind(null, 'loginPage');
  const loginInfoStyle = {
    position: 'absolute',
    left: '20px',
    top: '0',
    width: '200px',
  };

  return (
    <div className="row" style={{ position: 'relative' }}>
      <div className="col-md-6 col-md-offset-3">
        { (user.authorized)
          ? (<div>
            <p className="text-center lead">
              You already login as <strong>{ user.username }</strong>
            </p>
            <button
              className="btn btn-primary btn-lg center-block"
              onClick={logout}
            >
              Logout
            </button>
          </div>)
          : <LoginForm
            errors={loginPage.errors}
            form={form.forms.loginForm}
            isFetching={loginPage.isFetching}
            onSubmit={login}
            removeError={handleRemoveError}
          />
        }
      </div>
      { (!user.authorized)
        ? <div className="alert alert-info" style={loginInfoStyle}>
          <p>Login: <strong>admin</strong></p>
          <p>Password: <strong>admin</strong></p>
        </div>
        : null
      }
    </div>
  );
}

Login.propTypes = {
  form: PropTypes.shape({
    forms: PropTypes.object.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
  loginPage: PropTypes.shape({
    errors: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  removeError: PropTypes.func.isRequired,
  user: PropTypes.shape({
    authorized: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
