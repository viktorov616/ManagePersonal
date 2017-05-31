import React from 'react';
import PropTypes from 'prop-types';

import CloseBtn from './CloseBtn';

export default function Department({
  deleteDepartment, department, id, number, setDeleteId, showEditForm,
}) {
  function handleDeleteDepartment() {
    setDeleteId(id);
    deleteDepartment();
  }
  const handleShowEditForm = showEditForm.bind(null, id);

  return (
    <tr key={id} className="panel panel-default">
      <td>{ number + 1 }</td>
      <td>{ department }</td>
      <td className="text-center">
        <button onClick={handleShowEditForm} type="button" className="btn btn-default btn-xs">
          edit
        </button>
      </td>
      <td><CloseBtn onClick={handleDeleteDepartment} size="20" /></td>
    </tr>
  );
}

Department.propTypes = {
  deleteDepartment: PropTypes.func.isRequired,
  department: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  setDeleteId: PropTypes.func.isRequired,
  showEditForm: PropTypes.func.isRequired,
};
