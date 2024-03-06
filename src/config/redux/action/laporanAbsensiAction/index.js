import axios from "axios";

export const FETCH_REPORT_ABSENCE_SUCCESS = "FETCH_REPORT_ABSENCE_SUCCESS";
export const FETCH_REPORT_ABSENCE_FAILURE = "FETCH_REPORT_ABSENCE_FAILURE";
export const CLEAR_REPORT_ABSENCE = "CLEAR_REPORT_ABSENCE";

export const fetchAbsenceReportSuccess = (data) => ({
  type: FETCH_REPORT_ABSENCE_SUCCESS,
  payload: data,
});

export const fetchAbsenceReportFailure = (error) => ({
  type: FETCH_REPORT_ABSENCE_FAILURE,
  payload: error,
});

export const clearAbsenceReport = () => ({
  type: CLEAR_REPORT_ABSENCE,
});

export const fetchAbsenceReportByYear =
  (selectedYear, onDataFound) => async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/report/attendance/year/${selectedYear}`
      );
      const data = response.data;
      dispatch(fetchAbsenceReportSuccess(data));
      onDataFound();
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(
          fetchAbsenceReportFailure("An error occurred while loading data.")
        );
      }
    }
  };

export const fetchAbsenceReportByMonth =
  (selectedMonth, onDataFound) => async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/report/attendance/month/${selectedMonth}`
      );
      const data = response.data;
      dispatch(fetchAbsenceReportSuccess(data));
      onDataFound();
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(
          fetchAbsenceReportFailure("An error occurred while loading data.")
        );
      }
    }
  };
