import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';

import AnimatedPopup from './AnimatedPopup';
import Confirm from './Confirm';
import { editFormTd, editFormFirstTd, editFormTr, editFormInput } from '../styles/index';

export default class EditDepartment extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseConfirmOk = this.handleCloseConfirmOk.bind(this);
    this.handleSaveConfirmOk = this.handleSaveConfirmOk.bind(this);
    this.handleHotkeys = this.handleHotkeys.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleHotkeys);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleHotkeys);
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

  handleClose() {
    const { close, department, form, showCloseConfirm } = this.props;

    if (department === form.department) {
      close();
    } else {
      showCloseConfirm();
    }
  }

  handleCloseConfirmOk() {
    const { close, hideCloseConfirm } = this.props;

    close();
    hideCloseConfirm();
  }

  handleSaveConfirmOk() {
    const { close, form, hideSaveConfirm, id, save } = this.props;

    save(form.department, id);
    close();
    hideSaveConfirm();
  }

  handleSave() {
    const { close, department, form, id, save, showSaveConfirm } = this.props;

    if (department === form.department) {
      save(form.department, id);
      close();
    } else {
      showSaveConfirm();
    }
  }

  render() {
    const {
      closeConfirmVisible, department, hideCloseConfirm, hideSaveConfirm, number,
      pathname, saveConfirmVisible,
    } = this.props;
    const closeConfirm = (closeConfirmVisible && ((pathname === '/departments') || (pathname === '/')))
      ? (<Confirm
        ok={this.handleCloseConfirmOk}
        close={hideCloseConfirm}
        text="Close without saving?"
      />)
      : null;
    const saveConfirm = (saveConfirmVisible && ((pathname === '/departments') || (pathname === '/')))
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
            defaultValue={department}
            style={editFormInput}
            model="form.editDepartmentForm.department"
          />
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

EditDepartment.propTypes = {
  close: PropTypes.func.isRequired,
  closeConfirmVisible: PropTypes.bool.isRequired,
  department: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  hideCloseConfirm: PropTypes.func.isRequired,
  hideSaveConfirm: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  saveConfirmVisible: PropTypes.bool.isRequired,
  showCloseConfirm: PropTypes.func.isRequired,
  showSaveConfirm: PropTypes.func.isRequired,
};
