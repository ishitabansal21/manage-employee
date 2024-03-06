import {
  GET_DATA_DEPARTMENT_SUCCESS,
  GET_DATA_DEPARTMENT_FAILURE,
  CREATE_DATA_DEPARTMENT_SUCCESS,
  CREATE_DATA_DEPARTMENT_FAILURE,
  UPDATE_DATA_DEPARTMENT_SUCCESS,
  UPDATE_DATA_DEPARTMENT_FAILURE,
  DELETE_DATA_DEPARTMENT_SUCCESS,
  DELETE_DATA_DEPARTMENT_FAILURE,
} from "../../action/dataJabatanAction/dataJabatanActionTypes";

const initialState = {
  departmentData: [],
  message: null,
  error: null,
};

const dataDepartmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departmentData: action.payload,
        message: null,
        error: null,
      };
    case GET_DATA_DEPARTMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: "",
      };
    case CREATE_DATA_DEPARTMENT_SUCCESS:
      return {
        ...state,
        message: null,
        error: null,
      };
    case CREATE_DATA_DEPARTMENT_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        message: null,
      };
    case UPDATE_DATA_DEPARTMENT_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };
    case UPDATE_DATA_DEPARTMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    case DELETE_DATA_DEPARTMENT_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };
    case DELETE_DATA_DEPARTMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    default:
      return state;
  }
};

export default dataDepartmentReducer;
