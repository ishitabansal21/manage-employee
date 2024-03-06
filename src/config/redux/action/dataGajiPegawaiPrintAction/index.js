import axios from "axios";
import {
  GET_DATA_SALARY_SINGLE_EMPLOYEE_SUCCESS,
  GET_DATA_SALARY_SINGLE_EMPLOYEE_FAILURE,
} from "./dataGajiPegawaiPrintActionTypes";

export const viewSalaryDataSingleEmployeeSuccess = (data) => ({
  type: GET_DATA_SALARY_SINGLE_EMPLOYEE_SUCCESS,
  payload: data,
});

export const viewSalaryDataSingleEmployeeFailure = (error) => ({
  type: GET_DATA_SALARY_SINGLE_EMPLOYEE_FAILURE,
  payload: error,
});

export const viewSalarySingleEmployeeByYear =
  (dataYear) => async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/data_gaji/month/${dataYear}`
      );
      const data = response.data;
      dispatch(viewSalaryDataSingleEmployeeSuccess(data));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(
          viewSalaryDataSingleEmployeeFailure(
            "An error occurred while loading data."
          )
        );
      }
    }
  };

export const viewSalarySingleEmployeeByMonth =
  (dataMonth) => async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/data_gaji/month/${dataMonth}`
      );
      const data = response.data;
      dispatch(viewSalaryDataSingleEmployeeSuccess(data));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(
          viewSalaryDataSingleEmployeeFailure(
            "An error occurred while loading data."
          )
        );
      }
    }
  };

export const viewSalarySingleEmployeeByName =
  (employee_name) => async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/data_gaji/name/${employee_name}`
      );
      const data = response.data;
      dispatch(viewSalaryDataSingleEmployeeSuccess(data));
    } catch (error) {
      console.log(error);
      if (employee_name) {
        dispatch(
          viewSalaryDataSingleEmployeeFailure(
            "An error occurred while loading data."
          )
        );
      }
    }
  };
