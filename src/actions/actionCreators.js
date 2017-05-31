export function addDepartment(department) {
  return {
    type: 'ADD_DEPARTMENT',
    department,
  };
}

export function addEmployee(employee) {
  return {
    type: 'ADD_EMPLOYEE',
    employee,
  };
}

export function deleteDepartment(id) {
  return {
    type: 'DELETE_DEPARTMENT',
    id,
  };
}

export function deleteEmployee(id) {
  return {
    type: 'DELETE_EMPLOYEE',
    id,
  };
}

export function editDepartment(department, id) {
  return {
    type: 'EDIT_DEPARTMENT',
    department,
    id,
  };
}

export function editEmployee(employee, i) {
  return {
    type: 'EDIT_EMPLOYEE',
    employee,
    i,
  };
}

export function fetchCorporateData() {
  return {
    type: 'FETCH_CORPORATE_DATA',
  };
}

export function hideConfirm(reducerName, confirmName = '') {
  return {
    type: 'HIDE_CONFIRM',
    reducerName,
    confirmName,
  };
}

export function hideEditForm(reducerName) {
  return {
    type: 'HIDE_EDIT_FORM',
    reducerName,
  };
}

export function login(userData) {
  return {
    type: 'LOGIN',
    userData,
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function removeError(reducerName, id) {
  return {
    type: 'REMOVE_ERROR',
    reducerName,
    id,
  };
}

export function setDeleteId(reducerName, id) {
  return {
    type: 'SET_DELETE_ID',
    reducerName,
    id,
  };
}

export function showConfirm(reducerName, confirmName = '') {
  return {
    type: 'SHOW_CONFIRM',
    reducerName,
    confirmName,
  };
}

export function showEditForm(reducerName, id) {
  return {
    type: 'SHOW_EDIT_FORM',
    reducerName,
    id,
  };
}
