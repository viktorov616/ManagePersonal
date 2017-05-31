import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { combineForms } from 'react-redux-form';

import departments from './departments';
import employees from './employees';
import home from './home';
import loginPage from './loginPage';
import user from './user';

const initialEditDepartmentFormState = {
  department: '',
};

const initialEditEmployeeFormState = {
  id: '',
  firstName: '',
  lastName: '',
  departmentId: '',
};

const initialEmployeeFormState = {
  id: '',
  firstName: '',
  lastName: '',
  departmentId: '',
};

const initialDepartmentFormState = {
  department: '',
};

const initialLoginFormState = {
  username: '',
  password: '',
};

const rootReducer = combineReducers({
  departments,
  employees,
  home,
  loginPage,
  user,
  router,
  form: combineForms({
    editDepartmentForm: initialEditDepartmentFormState,
    editEmployeeForm: initialEditEmployeeFormState,
    employeeForm: initialEmployeeFormState,
    departmentForm: initialDepartmentFormState,
    loginForm: initialLoginFormState,
  }, 'form'),
});

export default rootReducer;
