import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';

import AnimatedPopup from './AnimatedPopup';
import Confirm from './Confirm';

import { editFormTd, editFormFirstTd, editFormTr, editFormInput } from '../styles/index';

export default class EditEmployee extends Component {
  constructor(props) {
    super(props);
    this.isChanged = this.isChanged.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseConfirmOk = this.handleCloseConfirmOk.bind(this);
    this.handleHotkeys = this.handleHotkeys.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSaveConfirmOk = this.handleSaveConfirmOk.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleHotkeys);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleHotkeys);
  }

  isChanged() {
    const { departmentId, firstName, form, lastName } = this.props;

    return !((firstName === form.firstName)
      && (lastName === form.lastName)
      && (departmentId === form.departmentId));
  }

  handleClose() {
    const { close, showCloseConfirm } = this.props;

    if (!this.isChanged()) {
      close();
    } else {
      showCloseConfirm();
    }
  }

  handleHotkeys(e) {
    const { closeConfirmVisible, saveConfirmVisible } = this.props;

    if (closeConfirmVisible || saveConfirmVisible) {
      return;
    }

    if (e.keyCode === 13) {
      this.handleSave();
    } else if (e.keyCode === 27) {
      this.handleClose();
    }
  }

  handleCloseConfirmOk() {
    const { close, hideCloseConfirm } = this.props;

    close();
    hideCloseConfirm();
  }

  handleSaveConfirmOk() {
    const { close, hideSaveConfirm } = this.props;

    this.saveEmployee();
    close();
    hideSaveConfirm();
  }

  handleSave() {
    const { close, showSaveConfirm } = this.props;

    if (!this.isChanged()) {
      this.saveEmployee();
      close();
    } else {
      showSaveConfirm();
    }
  }

  saveEmployee() {
    const { form, id, save, number } = this.props;
    const employee = {
      id,
      firstName: form.firstName,
      lastName: form.lastName,
      departmentId: form.departmentId,
    };

    save(employee, number);
  }

  render() {
    const {
      closeConfirmVisible, departmentId, departments, firstName, hideCloseConfirm,
      hideSaveConfirm, lastName, number, pathname, saveConfirmVisible,
    } = this.props;
    const closeConfirm = (closeConfirmVisible && (pathname === '/employees'))
      ? (<Confirm
        ok={this.handleCloseConfirmOk}
        close={hideCloseConfirm}
        text="Close without saving?"
      />)
      : null;
    const saveConfirm = (saveConfirmVisible && (pathname === '/employees'))
      ? (<Confirm
        ok={this.handleSaveConfirmOk}
        close={hideSaveConfirm}
        text="Save the changes?"
      />)
      : null;

    return (
      <tr style={editFormTr}>
        <td style={editFormFirstTd}>{ number + 1 }</td>
        <td style={editFormTd}>
          <Control.text
            autoFocus
            defaultValue={firstName}
            style={editFormInput}
            model="form.editEmployeeForm.firstName"
          />
        </td>
        <td style={editFormTd}>
          <Control.text
            defaultValue={lastName}
            style={editFormInput}
            model="form.editEmployeeForm.lastName"
          />
        </td>
        <td style={editFormTd}>
          <Control.select
            defaultValue={departmentId}
            style={{ border: 'none', padding: '8px 5px', width: '100%' }}
            model="form.editEmployeeForm.departmentId"
          >
            <option value="" />
            { Object.keys(departments).map(key => (
              <option key={key} value={key}>{ departments[key] }</option>
            )) }
          </Control.select>
        </td>
        <td className="text-center">
          <button onClick={this.handleSave} type="button" className="btn btn-default btn-xs">
            save
          </button>
        </td>
        <td>
          <button onClick={this.handleClose} type="button" className="btn btn-default btn-xs">
            close
          </button>
          <AnimatedPopup>
            { closeConfirm }
            { saveConfirm }
          </AnimatedPopup>
        </td>
      </tr>
    );
  }
}

EditEmployee.propTypes = {
  departmentId: PropTypes.string,
  departments: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  closeConfirmVisible: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  hideCloseConfirm: PropTypes.func.isRequired,
  hideSaveConfirm: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  saveConfirmVisible: PropTypes.bool.isRequired,
  showCloseConfirm: PropTypes.func.isRequired,
  showSaveConfirm: PropTypes.func.isRequired,
};

EditEmployee.defaultProps = {
  departmentId: null,
};
