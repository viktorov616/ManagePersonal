import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/actionCreators';
import Layout from './Layout';

function mapStateToProps({
  departments, employees, home, loginPage, user, form,
}) {
  return {
    departments,
    employees,
    home,
    loginPage,
    user,
    form,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const app = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default app;
