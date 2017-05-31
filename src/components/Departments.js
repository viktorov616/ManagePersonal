import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AnimatedPopup from './AnimatedPopup';
import Confirm from './Confirm';
import Department from './Department';
import EditDepartment from './EditDepartment';

export default function Departments({
  closeConfirmVisible, deleteConfirmVisible, deleteDepartment, deleteId, departments,
  editDepartment, editForm, editFormId, editFormVisible, hideConfirm, hideEditForm,
  pathname, saveConfirmVisible, setDeleteId, showConfirm, showEditForm,
}) {
  function handleDeleteDepartment() {
    deleteDepartment(deleteId);
    hideDeleteConfirm();
  }

  const hideCloseConfirm = hideConfirm.bind(null, 'close');
  const hideDeleteConfirm = hideConfirm.bind(null, 'delete');
  const hideSaveConfirm = hideConfirm.bind(null, 'save');
  const showCloseConfirm = showConfirm.bind(null, 'close');
  const showDeleteConfirm = showConfirm.bind(null, 'delete');
  const showSaveConfirm = showConfirm.bind(null, 'save');
  const deleteConfirm = (deleteConfirmVisible && ((pathname === '/departments') || (pathname === '/')))
    ? (<Confirm
      ok={handleDeleteDepartment}
      close={hideDeleteConfirm}
      text="Delete the department?"
    />)
    : null;

  return (
    <div>
      <div className="panel text-center">
        <Link role="button" className="btn btn-primary" to="/departments/add">
          Add new department
        </Link>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          { Object.values(departments).map((department, i) => {
            const key = Object.keys(departments)[i];

            if (editFormVisible && (key === editFormId)) {
              return (<EditDepartment
                key={key}
                id={key}
                close={hideEditForm}
                closeConfirmVisible={closeConfirmVisible}
                deleteDepartment={deleteDepartment}
                department={department}
                form={editForm}
                hideCloseConfirm={hideCloseConfirm}
                hideSaveConfirm={hideSaveConfirm}
                save={editDepartment}
                saveConfirmVisible={saveConfirmVisible}
                showCloseConfirm={showCloseConfirm}
                showSaveConfirm={showSaveConfirm}
                number={i}
                pathname={pathname}
              />);
            }
            return (<Department
              key={key}
              id={key}
              deleteDepartment={showDeleteConfirm}
              department={department}
              number={i}
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

Departments.propTypes = {
  closeConfirmVisible: PropTypes.bool.isRequired,
  deleteConfirmVisible: PropTypes.bool.isRequired,
  deleteDepartment: PropTypes.func.isRequired,
  deleteId: PropTypes.string.isRequired,
  departments: PropTypes.object.isRequired,
  editDepartment: PropTypes.func.isRequired,
  editForm: PropTypes.object.isRequired,
  editFormId: PropTypes.string.isRequired,
  editFormVisible: PropTypes.bool.isRequired,
  hideConfirm: PropTypes.func.isRequired,
  hideEditForm: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  saveConfirmVisible: PropTypes.bool.isRequired,
  setDeleteId: PropTypes.func.isRequired,
  showConfirm: PropTypes.func.isRequired,
  showEditForm: PropTypes.func.isRequired,
};
