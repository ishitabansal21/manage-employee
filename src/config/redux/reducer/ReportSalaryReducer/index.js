import {
  FETCH_REPORT_SALARY_SUCCESS,
  FETCH_REPORT_SALARY_FAILURE,
  CLEAR_REPORT_SALARY,
} from "../../action/laporanGajiAction";

const initialState = {
  SalaryReportdata: [],
  error: null,
};

const ReportSalaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPORT_SALARY_SUCCESS:
      return {
        ...state,
        SalaryReportdata: action.payload,
        error: null,
      };
    case FETCH_REPORT_SALARY_FAILURE:
      return {
        ...state,
        SalaryReportdata: [],
        error: action.payload,
      };
    case CLEAR_REPORT_SALARY:
      return {
        ...state,
        SalaryReportdata: [],
        error: null,
      };
    default:
      return state;
  }
};

export default ReportSalaryReducer;
