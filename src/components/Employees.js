import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AnimatedPopup from './AnimatedPopup';
import EditEmployee from './EditEmployee';
import Employee from './Employee';
import Confirm from './Confirm';

export default function Employees({
  closeConfirmVisible, deleteConfirmVisible, deleteEmployee, deleteId, departments,
  editEmployee, editForm, editFormId, editFormVisible, employees, hideConfirm, hideEditForm,
  setDeleteId, pathname, saveConfirmVisible, showConfirm, showEditForm,
}) {
  function handleDeleteEmployee() {
    deleteEmployee(deleteId);
    hideDeleteConfirm();
  }

  const hideCloseConfirm = hideConfirm.bind(null, 'close');
  const hideDeleteConfirm = hideConfirm.bind(null, 'delete');
  const hideSaveConfirm = hideConfirm.bind(null, 'save');
  const showCloseConfirm = showConfirm.bind(null, 'close');
  const showDeleteConfirm = showConfirm.bind(null, 'delete');
  const showSaveConfirm = showConfirm.bind(null, 'save');
  const deleteConfirm = (deleteConfirmVisible && (pathname === '/employees'))
    ? (<Confirm
      ok={handleDeleteEmployee}
      close={hideDeleteConfirm}
      text="Delete the employee?"
    />)
    : null;
  return (
    <div>
      <div className="panel text-center">
        <Link role="button" className="btn btn-primary" to="/employees/add">
          Add new employee
        </Link>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>№</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          { employees.map(({ id, firstName, lastName, departmentId }, i) => {
            if (editFormVisible && id === editFormId) {
              return (<EditEmployee
                key={id}
                id={id}
                close={hideEditForm}
                closeConfirmVisible={closeConfirmVisible}
                departmentId={departmentId}
                departments={departments}
                deleteEmployee={showConfirm}
                firstName={firstName}
                form={editForm}
                hideCloseConfirm={hideCloseConfirm}
                hideSaveConfirm={hideSaveConfirm}
                lastName={lastName}
                number={i}
                save={editEmployee}
                saveConfirmVisible={saveConfirmVisible}
                showCloseConfirm={showCloseConfirm}
                showSaveConfirm={showSaveConfirm}
                pathname={pathname}
              />);
            }
            return (<Employee
              key={id}
              id={id}
              deleteEmployee={showDeleteConfirm}
              department={departments[departmentId]}
              firstName={firstName}
              lastName={lastName}
              number={i + 1}
              setDeleteId={setDeleteId}
              showEditForm={showEditForm}
            />);
          }) }
        </tbody>
      </table>
      <AnimatedPopup>
        { deleteConfirm }
      </AnimatedPopup>
    </div>
  );
}

Employees.propTypes = {
  closeConfirmVisible: PropTypes.bool.isRequired,
  deleteConfirmVisible: PropTypes.bool.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  deleteId: PropTypes.string.isRequired,
  departments: PropTypes.object.isRequired,
  editEmployee: PropTypes.func.isRequired,
  editForm: PropTypes.object.isRequired,
  editFormId: PropTypes.string.isRequired,
  editFormVisible: PropTypes.bool.isRequired,
  employees: PropTypes.array.isRequired,
  hideConfirm: PropTypes.func.isRequired,
  hideEditForm: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  setDeleteId: PropTypes.func.isRequired,
  saveConfirmVisible: PropTypes.bool.isRequired,
  showConfirm: PropTypes.func.isRequired,
  showEditForm: PropTypes.func.isRequired,
};
