import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions, Form } from 'react-redux-form';
import shortid from 'shortid';

import CloseBtn from './CloseBtn';
import Errors from './Errors';
import TextFieldGroup from './TextFieldGroup';

import { validationRequired } from '../utility/validators';

class DepartmentForm extends Component {
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
    const department = { [shortid.generate()]: data.department };

    onSubmit(department);
    dispatch(actions.reset('form.departmentForm'));
  }

  render() {
    const { closeForm, errors, form, removeError } = this.props;
    const validators = {
      department: { validationRequired },
    };

    const validationMessages = {
      validationRequired: 'Is Required',
    };

    return (
      <Form
        model="form.departmentForm"
        onSubmit={this.handleSubmit}
        validators={validators}
        validateOn="submit"
      >
        <div className="col-md-12">
          <h1 className="pull-left">Add new department</h1>
          <CloseBtn onClick={closeForm} size="40" />
        </div>
        { (errors.length)
          ? <Errors errors={errors} removeError={removeError} />
          : null }
        <TextFieldGroup
          autofocus
          type="text"
          name="department"
          label="Department"
          focus={form.department.focus}
          valid={form.department.valid}
          retouched={form.department.retouched}
          validationMessages={validationMessages}
        />
        <div className="form-group">
          <button
            className="btn btn-primary btn-lg center-block"
            type="submit"
          >
            Add department
          </button>
        </div>
      </Form>
    );
  }
}

DepartmentForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  removeError: PropTypes.func.isRequired,
};

export default connect()(DepartmentForm);
