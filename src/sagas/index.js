import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import * as api from '../server/api/api';

function* addDepartmentAsync({ department }) {
  try {
    const answer = yield call(api.addDepartment, department);

    yield put({ type: 'ADD_DEPARTMENT_SUCCEEDED', answer });
  } catch (err) {
    yield put({ type: 'ADD_DEPARTMENT_FAILED', errors: err.errors });
  }
}

function* watchAddDepartment() {
  yield takeEvery('ADD_DEPARTMENT', addDepartmentAsync);
}

function* addEmployeeAsync({ employee }) {
  try {
    const answer = yield call(api.addEmployee, employee);

    yield put({ type: 'ADD_EMPLOYEE_SUCCEEDED', answer });
  } catch (err) {
    yield put({ type: 'ADD_EMPLOYEE_FAILED', errors: err.errors });
  }
}

function* watchAddEmployee() {
  yield takeEvery('ADD_EMPLOYEE', addEmployeeAsync);
}

function* deleteDepartmentAsync({ id }) {
  try {
    const answer = yield call(api.deleteDepartment, id);

    yield put({ type: 'DELETE_DEPARTMENT_SUCCEEDED', answer });
  } catch (err) {
    yield put({ type: 'DELETE_DEPARTMENT_FAILED', errors: err.errors });
  }
}

function* watchDeleteDepartment() {
  yield takeEvery('DELETE_DEPARTMENT', deleteDepartmentAsync);
}

function* deleteEmployeeAsync({ id }) {
  try {
    const answer = yield call(api.deleteEmployee, id);

    yield put({ type: 'DELETE_EMPLOYEE_SUCCEEDED', answer });
  } catch (err) {
    yield put({ type: 'DELETE_EMPLOYEE_FAILED', errors: err.errors });
  }
}

function* watchDeleteEmployee() {
  yield takeEvery('DELETE_EMPLOYEE', deleteEmployeeAsync);
}

function* FetchCorporateDataAsync() {
  try {
    const corporateData = yield call(api.fetchCorporateData);

    yield put({ type: 'FETCH_CORPORATE_DATA_SUCCEEDED', corporateData });
  } catch (err) {
    yield put({ type: 'FETCH_CORPORATE_DATA_FAILED', errors: err.errors });
  }
}

function* watchFetchCorporateData() {
  yield takeEvery('FETCH_CORPORATE_DATA', FetchCorporateDataAsync);
}

function* editEmployeeAsync({ employee, i }) {
  try {
    const answer = yield call(api.editEmployee, employee, i);

    yield put({ type: 'EDIT_EMPLOYEE_SUCCEEDED', answer });
  } catch (err) {
    yield put({ type: 'EDIT_EMPLOYEE_FAILED', errors: err.errors });
  }
}

function* watchEditEmployee() {
  yield takeEvery('EDIT_EMPLOYEE', editEmployeeAsync);
}

function* loginAsync({ userData }) {
  try {
    const user = yield call(api.login, userData);

    yield put({ type: 'LOGIN_SUCCEEDED', user });
    yield put(push('/'));
  } catch (err) {
    yield put({ type: 'LOGIN_FAILED', errors: err.errors });
  }
}

function* watchLogin() {
  yield takeEvery('LOGIN', loginAsync);
}

export default function* rootSaga() {
  yield [
    watchAddDepartment(),
    watchAddEmployee(),
    watchDeleteDepartment(),
    watchDeleteEmployee(),
    watchEditEmployee(),
    watchFetchCorporateData(),
    watchLogin(),
  ];
}
