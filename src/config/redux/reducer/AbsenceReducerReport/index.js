import {
  FETCH_REPORT_ABSENCE_SUCCESS,
  FETCH_REPORT_ABSENCE_FAILURE,
  CLEAR_REPORT_ABSENCE,
} from "../../action/laporanAbsensiAction";

const initialState = {
  absenceReportdata: [],
  error: null,
};

const AbsenceReducerReport = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPORT_ABSENCE_SUCCESS:
      return {
        ...state,
        absenceReportdata: action.payload,
        error: null,
      };
    case FETCH_REPORT_ABSENCE_FAILURE:
      return {
        ...state,
        absenceReportdata: [],
        error: action.payload,
      };
    case CLEAR_REPORT_ABSENCE:
      return {
        ...state,
        absenceReportdata: [],
        error: null,
      };
    default:
      return state;
  }
};

export default AbsenceReducerReport;
