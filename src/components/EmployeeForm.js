import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions, Form } from 'react-redux-form';
import shortid from 'shortid';


import CloseBtn from './CloseBtn';
import Errors from './Errors';
import SelectFieldGroup from './SelectFieldGroup';
import TextFieldGroup from './TextFieldGroup';

import { validationRequired } from '../utility/validators';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.handleHotkeys = this.handleHotkeys.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleHotkeys);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleHotkeys);
  }

  handleHotkeys(e) {
    if (e.keyCode === 27) {
      this.props.closeForm();
    }
  }

  handleSubmit(data) {
    const { dispatch, onSubmit } = this.props;
    const employee = { ...data, id: shortid.generate() };

    onSubmit(employee);
    dispatch(actions.reset('form.employeeForm'));
  }

  render() {
    const { closeForm, departments, errors, form, removeError } = this.props;
    const validators = {
      firstName: { validationRequired },
      lastName: { validationRequired },
    };

    const validationMessages = {
      validationRequired: 'Is Required',
    };

    return (
      <Form
        model="form.employeeForm"
        onSubmit={this.handleSubmit}
        validators={validators}
        validateOn="submit"
      >
        <div className="col-md-12">
          <h1 className="pull-left">Add new employee</h1>
          <CloseBtn onClick={closeForm} size="40" />
        </div>
        { (errors.length)
          ? <Errors errors={errors} removeError={removeError} />
          : null }
        <TextFieldGroup
          autofocus
          type="text"
          name="firstName"
          label="First Name"
          focus={form.firstName.focus}
          valid={form.firstName.valid}
          retouched={form.firstName.retouched}
          validationMessages={validationMessages}
        />
        <TextFieldGroup
          type="text"
          name="lastName"
          label="Last Name"
          focus={form.lastName.focus}
          valid={form.lastName.valid}
          retouched={form.lastName.retouched}
          validationMessages={validationMessages}
        />
        <SelectFieldGroup
          name="departmentId"
          label="Department"
          options={departments}
          focus={form.departmentId.focus}
          valid={form.departmentId.valid}
          retouched={form.departmentId.retouched}
          validationMessages={validationMessages}
        />
        <div className="form-group">
          <button
            className="btn btn-primary btn-lg center-block"
            type="submit"
          >
            Add employee
          </button>
        </div>
      </Form>
    );
  }
}

EmployeeForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
  departments: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  removeError: PropTypes.func.isRequired,
};

export default connect()(EmployeeForm);
