import React from 'react';
import PropTypes from 'prop-types';

import CloseBtn from './CloseBtn';

export default function Employee({
  deleteEmployee, department, firstName, id, lastName, number, setDeleteId, showEditForm,
}) {
  function handleDeleteEmployee() {
    setDeleteId(id);
    deleteEmployee();
  }

  const handleShowEditForm = showEditForm.bind(null, id);

  return (
    <tr>
      <td style={{ width: '5%' }}>{ number }</td>
      <td style={{ width: '15%' }}>{ firstName }</td>
      <td style={{ width: '15%' }}>{ lastName }</td>
      <td style={{ width: '45%' }}>{ department }</td>
      <td style={{ width: '10%' }} className="text-center">
        <button onClick={handleShowEditForm} type="button" className="btn btn-default btn-xs">
          edit
        </button>
      </td>
      <td style={{ width: '10%' }} className="text-center">
        <CloseBtn onClick={handleDeleteEmployee} size="20" float="none" />
      </td>
    </tr>
  );
}

Employee.propTypes = {
  deleteEmployee: PropTypes.func.isRequired,
  department: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  setDeleteId: PropTypes.func.isRequired,
  showEditForm: PropTypes.func.isRequired,
};

Employee.defaultProps = {
  department: 'None',
};
