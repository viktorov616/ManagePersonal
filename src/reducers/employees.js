const defaultProps = {
  closeConfirmVisible: false,
  data: [],
  deleteConfirmVisible: false,
  deleteEmployeeId: '-1',
  editEmployeeId: '-1',
  editEmployeeVisible: false,
  errors: [],
  saveConfirmVisible: false,
};

export default function employees(state = defaultProps, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        data: [...state.data, action.employee],
      };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        data: state.data.filter(employee => employee.id !== action.id),
      };
    case 'EDIT_EMPLOYEE':
      return {
        ...state,
        data: [
          ...state.data.slice(0, action.i),
          action.employee,
          ...state.data.slice(action.i + 1),
        ],
      };
    case 'FETCH_CORPORATE_DATA_SUCCEEDED':
      return {
        ...state,
        data: action.corporateData.employees,
      };
    case 'HIDE_CONFIRM':
      if (action.reducerName !== 'employees') {
        return state;
      }

      return {
        ...state,
        [`${action.confirmName}ConfirmVisible`]: false,
      };
    case 'HIDE_EDIT_FORM':
      if (action.reducerName !== 'employees') {
        return state;
      }

      return {
        ...state,
        editEmployeeVisible: false,
      };
    case 'SET_DELETE_ID':
      if (action.reducerName !== 'employees') {
        return state;
      }

      return {
        ...state,
        deleteEmployeeId: action.id,
      };
    case 'SHOW_CONFIRM':
      if (action.reducerName !== 'employees') {
        return state;
      }

      return {
        ...state,
        [`${action.confirmName}ConfirmVisible`]: true,
      };
    case 'SHOW_EDIT_FORM':
      if (action.reducerName !== 'employees') {
        return state;
      }

      return {
        ...state,
        editEmployeeVisible: true,
        editEmployeeId: action.id,
      };
    default:
      return state;
  }
}
