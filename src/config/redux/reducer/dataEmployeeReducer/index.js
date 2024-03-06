import {
  GET_DATA_EMPLOYEE_SUCCESS,
  GET_DATA_EMPLOYEE_FAILURE,
  EMPLOYEE_IMAGE_SUCCESS,
  EMPLOYEE_IMAGE_FAILURE,
  GET_DATA_EMPLOYEE_BY_ID_SUCCESS,
  GET_DATA_EMPLOYEE_BY_ID_FAILURE,
  GET_DATA_EMPLOYEE_BY_NIK_SUCCESS,
  GET_DATA_EMPLOYEE_BY_NIK_FAILURE,
  GET_DATA_EMPLOYEE_BY_NAME_SUCCESS,
  GET_DATA_EMPLOYEE_BY_NAME_FAILURE,
  CREATE_DATA_EMPLOYEE_REQUEST,
  CREATE_DATA_EMPLOYEE_SUCCESS,
  CREATE_DATA_EMPLOYEE_FAILURE,
  UPDATE_DATA_EMPLOYEE_SUCCESS,
  UPDATE_DATA_EMPLOYEE_FAILURE,
  DELETE_DATA_EMPLOYEE_SUCCESS,
  DELETE_DATA_EMPLOYEE_FAILURE,
} from "../../action/dataPegawaiAction/dataPegawaiActionTypes";

const initialState = {
  employeeData: [],
  employeeImage: [],
  message: null,
  error: null,
};

const dataEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employeeData: action.payload,
        message: null,
        error: null,
      };
    case GET_DATA_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: "",
      };
    case EMPLOYEE_IMAGE_SUCCESS:
      return {
        ...state,
        employeeImage: action.payload,
        message: null,
        error: null,
      };
    case EMPLOYEE_IMAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: "",
      };
    case GET_DATA_EMPLOYEE_BY_ID_SUCCESS:
      return {
        ...state,
        employeeData: action.payload,
        message: null,
        error: null,
      };
    case GET_DATA_EMPLOYEE_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    case GET_DATA_EMPLOYEE_BY_NIK_SUCCESS:
      return {
        ...state,
        employeeData: action.payload,
        message: null,
        error: null,
      };
    case GET_DATA_EMPLOYEE_BY_NIK_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    case GET_DATA_EMPLOYEE_BY_NAME_SUCCESS:
      return {
        ...state,
        employeeData: action.payload,
        message: null,
        error: null,
      };
    case GET_DATA_EMPLOYEE_BY_NAME_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    case CREATE_DATA_EMPLOYEE_REQUEST:
      return {
        ...state,
        error: null,
        message: null,
      };
    case CREATE_DATA_EMPLOYEE_SUCCESS:
      return {
        ...state,
        error: null,
        message: null,
      };
    case CREATE_DATA_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        message: null,
      };
    case UPDATE_DATA_EMPLOYEE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        error: null,
      };
    case UPDATE_DATA_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        message: null,
      };
    case DELETE_DATA_EMPLOYEE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        error: null,
      };
    case DELETE_DATA_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        message: null,
      };
    default:
      return state;
  }
};

export default dataEmployeeReducer;
