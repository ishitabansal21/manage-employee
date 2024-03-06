import {
  GET_DATA_CUTTING_SUCCESS,
  GET_DATA_CUTTING_FAILURE,
  CREATE_DATA_CUTTING_SUCCESS,
  CREATE_DATA_CUTTING_FAILURE,
  UPDATE_DATA_CUTTING_SUCCESS,
  UPDATE_DATA_CUTTING_FAILURE,
  DELETE_DATA_CUTTING_SUCCESS,
  DELETE_DATA_CUTTING_FAILURE,
} from "../../action/dataPotonganAction/dataPotonganActionTypes";

const initialState = {
  dataCuts: [],
  message: null,
  error: null,
};

const dataCutsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_CUTTING_SUCCESS:
      return {
        ...state,
        dataCuts: action.payload,
        message: null,
        error: null,
      };
    case GET_DATA_CUTTING_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: "",
      };
    case CREATE_DATA_CUTTING_SUCCESS:
      return {
        ...state,
        message: null,
        error: null,
      };
    case CREATE_DATA_CUTTING_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        message: null,
      };
    case UPDATE_DATA_CUTTING_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };
    case UPDATE_DATA_CUTTING_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    case DELETE_DATA_CUTTING_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };
    case DELETE_DATA_CUTTING_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    default:
      return state;
  }
};

export default dataCutsReducer;
