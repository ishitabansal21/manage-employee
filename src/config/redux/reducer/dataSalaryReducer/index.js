import {
  GET_DATA_SALARY_SUCCESS,
  GET_DATA_SALARY_FAILURE,
  DELETE_DATA_SALARY_SUCCESS,
  DELETE_DATA_SALARY_FAILURE,
} from "../../action/dataGajiAction/dataGajiActionTypes";

const initialState = {
  salaryData: [],
  message: null,
  error: null,
};

const dataSalaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_SALARY_SUCCESS:
      return {
        ...state,
        salaryData: action.payload,
        message: null,
        error: null,
      };
    case GET_DATA_SALARY_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: "",
      };
    case DELETE_DATA_SALARY_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };
    case DELETE_DATA_SALARY_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    default:
      return state;
  }
};

export default dataSalaryReducer;
