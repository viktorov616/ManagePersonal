import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import AnimatedPopup from '../components/AnimatedPopup';
import EmployeeForm from '../components/EmployeeForm';
import Employees from '../components/Employees';
import Errors from '../components/Errors';
import DepartmentForm from '../components/DepartmentForm';
import Departments from '../components/Departments';
import PopupContainer from '../components/PopupContainer';
import SubNav from '../components/SubNav';

import SubNavPaths from '../data/subNavPaths';

export default class Home extends Component {
  constructor(props) {
    super(props);

    const {
      hideConfirm, hideEditForm, removeError, setDeleteId, showConfirm, showEditForm,
    } = this.props;

    this.removeErrorEmployee = removeError.bind(null, 'employees');
    this.removeErrorDepartment = removeError.bind(null, 'department');
    this.removeErrorHome = removeError.bind(null, 'home');
    this.hideConfirmDepartment = hideConfirm.bind(null, 'departments');
    this.hideConfirmEmployee = hideConfirm.bind(null, 'employees');
    this.hideEditDepartment = hideEditForm.bind(null, 'departments');
    this.hideEditEmployee = hideEditForm.bind(null, 'employees');
    this.setDeleteDepartmentId = setDeleteId.bind(null, 'departments');
    this.setDeleteEmployeeId = setDeleteId.bind(null, 'employees');
    this.showConfirmDepartment = showConfirm.bind(null, 'departments');
    this.showConfirmEmployee = showConfirm.bind(null, 'employees');
    this.showEditEmployee = showEditForm.bind(null, 'employees');
    this.showEditDepartment = showEditForm.bind(null, 'departments');
  }

  componentDidMount() {
    this.props.fetchCorporateData();
  }

  render() {
    const {
      addDepartment, addEmployee, deleteDepartment, deleteEmployee, departments, editDepartment,
      editEmployee, employees, fetchCorporateData, form, home, location,
    } = this.props;
    const {
      closeConfirmVisible: closeConfirmEmployee, deleteConfirmVisible: deleteConfirmEmployee,
      deleteEmployeeId, editEmployeeId, editEmployeeVisible,
      saveConfirmVisible: saveConfirmEmployee,
    } = employees;
    const {
      closeConfirmVisible: closeConfirmDepartment, deleteConfirmVisible: deleteConfirmDepartment,
      deleteDepartmentId, editDepartmentId, editDepartmentVisible,
      saveConfirmVisible: saveConfirmDepartment,
    } = departments;

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="animation-fade"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          { (home.errors.length)
            ? <Errors errors={home.errors} removeError={this.removeErrorHome} />
          : null }
          { (home.fetchingFails)
            ? (<div className="panel text-center">
              <button onClick={fetchCorporateData} className="btn btn-primary">
                { home.isFetching && <i className="icon-spinner animate-spin" /> } Refetch data
              </button>
            </div>)
            : null }
        </ReactCSSTransitionGroup>
        <div className="row">
          <div className="col-md-2">
            <SubNav paths={SubNavPaths} activePath={location.pathname} />
          </div>
          <div className="col-md-10">
            <Route
              path="/:content?"
              render={({ match }) => {
                switch (match.params.content) {
                  case 'employees':
                    return (<Employees
                      closeConfirmVisible={closeConfirmEmployee}
                      deleteConfirmVisible={deleteConfirmEmployee}
                      deleteEmployee={deleteEmployee}
                      deleteId={deleteEmployeeId}
                      departments={departments.data}
                      editEmployee={editEmployee}
                      editForm={form.editEmployeeForm}
                      editFormId={editEmployeeId}
                      editFormVisible={editEmployeeVisible}
                      employees={employees.data}
                      hideConfirm={this.hideConfirmEmployee}
                      hideEditForm={this.hideEditEmployee}
                      pathname={location.pathname}
                      saveConfirmVisible={saveConfirmEmployee}
                      setDeleteId={this.setDeleteEmployeeId}
                      showConfirm={this.showConfirmEmployee}
                      showEditForm={this.showEditEmployee}
                    />);
                  default:
                    return (<Departments
                      closeConfirmVisible={closeConfirmDepartment}
                      deleteConfirmVisible={deleteConfirmDepartment}
                      deleteDepartment={deleteDepartment}
                      deleteId={deleteDepartmentId}
                      departments={departments.data}
                      editDepartment={editDepartment}
                      editForm={form.editDepartmentForm}
                      editFormId={editDepartmentId}
                      editFormVisible={editDepartmentVisible}
                      hideConfirm={this.hideConfirmDepartment}
                      hideEditForm={this.hideEditDepartment}
                      pathname={location.pathname}
                      saveConfirmVisible={saveConfirmDepartment}
                      setDeleteId={this.setDeleteDepartmentId}
                      showConfirm={this.showConfirmDepartment}
                      showEditForm={this.showEditDepartment}
                    />);
                }
              }}
            />
          </div>
        </div>
        <AnimatedPopup>
          <Switch key={location.key} location={location}>
            <Route
              path="/employees/add"
              render={routerProps => (
                <PopupContainer>
                  <EmployeeForm
                    closeForm={() => routerProps.history.push('/employees')}
                    errors={employees.errors}
                    departments={departments.data}
                    form={form.forms.employeeForm}
                    onSubmit={addEmployee}
                    removeError={this.removeErrorEmployee}
                  />
                </PopupContainer>
              )}
            />
            <Route
              path="/departments/add"
              render={routerProps => (
                <PopupContainer>
                  <DepartmentForm
                    closeForm={() => routerProps.history.push('/departments')}
                    errors={departments.errors}
                    form={form.forms.departmentForm}
                    onSubmit={addDepartment}
                    removeError={this.removeErrorDepartment}
                  />
                </PopupContainer>
              )}
            />
          </Switch>
        </AnimatedPopup>
      </div>
    );
  }
}

Home.propTypes = {
  addDepartment: PropTypes.func.isRequired,
  addEmployee: PropTypes.func.isRequired,
  deleteDepartment: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  departments: PropTypes.shape({
    closeConfirmVisible: PropTypes.bool.isRequired,
    deleteConfirmVisible: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    deleteDepartmentId: PropTypes.string.isRequired,
    editDepartmentId: PropTypes.string.isRequired,
    editDepartmentVisible: PropTypes.bool.isRequired,
    errors: PropTypes.array.isRequired,
    saveConfirmVisible: PropTypes.bool.isRequired,
  }).isRequired,
  editDepartment: PropTypes.func.isRequired,
  editEmployee: PropTypes.func.isRequired,
  employees: PropTypes.shape({
    data: PropTypes.array.isRequired,
    deleteEmployeeId: PropTypes.string.isRequired,
    editEmployeeId: PropTypes.string.isRequired,
    editEmployeeVisible: PropTypes.bool.isRequired,
    errors: PropTypes.array.isRequired,
    saveConfirmVisible: PropTypes.bool.isRequired,
  }).isRequired,
  fetchCorporateData: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  hideConfirm: PropTypes.func.isRequired,
  hideEditForm: PropTypes.func.isRequired,
  home: PropTypes.shape({
    errors: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  removeError: PropTypes.func.isRequired,
  setDeleteId: PropTypes.func.isRequired,
  showConfirm: PropTypes.func.isRequired,
  showEditForm: PropTypes.func.isRequired,
};
