import axios from "axios";

export const FETCH_REPORT_SALARY_SUCCESS = "FETCH_REPORT_SALARY_SUCCESS";
export const FETCH_REPORT_SALARY_FAILURE = "FETCH_REPORT_SALARY_FAILURE";
export const CLEAR_REPORT_SALARY = "CLEAR_REPORT_SALARY";

export const fetchSalaryReportSuccess = (data) => ({
  type: FETCH_REPORT_SALARY_SUCCESS,
  payload: data,
});

export const fetchSalaryReportFailure = (error) => ({
  type: FETCH_REPORT_SALARY_FAILURE,
  payload: error,
});

export const clearSalaryReport = () => ({
  type: CLEAR_REPORT_SALARY,
});

export const fetchSalaryReportByYear =
  (selectedYear, onDataFound) => async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/report/salary/year/${selectedYear}`
      );
      const data = response.data;
      dispatch(fetchSalaryReportSuccess(data));
      onDataFound();
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(
          fetchSalaryReportFailure("An error occurred while loading data.")
        );
      }
    }
  };

export const fetchSalaryReportByMonth =
  (selectedMonth, onDataFound) => async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/report/salary/month/${selectedMonth}`
      );
      const data = response.data;
      dispatch(fetchSalaryReportSuccess(data));
      onDataFound();
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(
          fetchSalaryReportFailure("An error occurred while loading data.")
        );
      }
    }
  };
