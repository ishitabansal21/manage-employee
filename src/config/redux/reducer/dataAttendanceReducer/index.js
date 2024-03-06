import {
  GET_DATA_ATTENDANCE_SUCCESS,
  GET_DATA_ATTENDANCE_FAILURE,
  CREATE_DATA_ATTENDANCE_SUCCESS,
  CREATE_DATA_ATTENDANCE_FAILURE,
  UPDATE_DATA_ATTENDANCE_SUCCESS,
  UPDATE_DATA_ATTENDANCE_FAILURE,
  DELETE_DATA_ATTENDANCE_SUCCESS,
  DELETE_DATA_ATTENDANCE_FAILURE,
} from "../../action/dataKehadiranAction/dataKehadiranActionTypes";

const initialState = {
  attendanceData: [],
  loading: true,
  error: null,
  message: "",
};

const dataAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_ATTENDANCE_SUCCESS:
      return {
        ...state,
        attendanceData: action.payload,
        loading: false,
        error: null,
      };
    case GET_DATA_ATTENDANCE_FAILURE:
      return {
        ...state,
        attendanceData: [],
        loading: false,
        error: action.payload,
      };
    case CREATE_DATA_ATTENDANCE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_DATA_ATTENDANCE_FAILURE:
      return {
        ...state,
        message: "",
        loading: false,
        error: action.payload,
      };
    case UPDATE_DATA_ATTENDANCE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_DATA_ATTENDANCE_FAILURE:
      return {
        ...state,
        message: "",
        loading: false,
        error: action.payload,
      };
    case DELETE_DATA_ATTENDANCE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
        error: null,
      };
    case DELETE_DATA_ATTENDANCE_FAILURE:
      return {
        ...state,
        message: "",
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dataAttendanceReducer;
