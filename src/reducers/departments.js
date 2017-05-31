const defaultProps = {
  data: {},
  deleteConfirmVisible: false,
  deleteDepartmentId: '-1',
  closeConfirmVisible: false,
  editDepartmentId: '-1',
  editDepartmentVisible: false,
  errors: [],
  saveConfirmVisible: false,
};

export default function departments(state = defaultProps, action) {
  switch (action.type) {
    case 'ADD_DEPARTMENT':
      return {
        ...state,
        data: { ...state.data, ...action.department },
      };
    case 'DELETE_DEPARTMENT': {
      const newData = { ...state.data };
      delete newData[action.id];

      return {
        ...state,
        data: newData,
      };
    }
    case 'EDIT_DEPARTMENT': {
      const newData = { ...state.data };
      newData[action.id] = action.department;

      return {
        ...state,
        data: newData,
      };
    }
    case 'FETCH_CORPORATE_DATA_SUCCEEDED':
      return {
        ...state,
        data: action.corporateData.departments,
      };
    case 'HIDE_CONFIRM':
      if (action.reducerName !== 'departments') {
        return state;
      }

      return {
        ...state,
        [`${action.confirmName}ConfirmVisible`]: false,
      };
    case 'HIDE_EDIT_FORM':
      if (action.reducerName !== 'departments') {
        return state;
      }

      return {
        ...state,
        editDepartmentVisible: false,
      };
    case 'SET_DELETE_ID':
      if (action.reducerName !== 'departments') {
        return state;
      }

      return {
        ...state,
        deleteDepartmentId: action.id,
      };
    case 'SHOW_CONFIRM':
      if (action.reducerName !== 'departments') {
        return state;
      }

      return {
        ...state,
        [`${action.confirmName}ConfirmVisible`]: true,
      };
    case 'SHOW_EDIT_FORM':
      if (action.reducerName !== 'departments') {
        return state;
      }

      return {
        ...state,
        editDepartmentVisible: true,
        editDepartmentId: action.id,
      };
    default:
      return state;
  }
}
