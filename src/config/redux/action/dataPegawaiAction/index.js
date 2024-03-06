import axios from "axios";
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
} from "./dataPegawaiActionTypes";

const API_URL = "http://localhost:5000";

export const getEmployeeData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/data_pegawai`);
      dispatch({
        type: GET_DATA_EMPLOYEE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DATA_EMPLOYEE_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const employeeImage = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/images`);
      dispatch({
        type: EMPLOYEE_IMAGE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: EMPLOYEE_IMAGE_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getEmployeeDataById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/data_pegawai/id/${id}`);
      dispatch({
        type: GET_DATA_EMPLOYEE_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DATA_EMPLOYEE_BY_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getEmployeeDataByNik = (nik) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/data_pegawai/nik/${nik}`);
      dispatch({
        type: GET_DATA_EMPLOYEE_BY_NIK_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DATA_EMPLOYEE_BY_NIK_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getEmployeeDataByName = (employee_name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}/data_pegawai/name/${employee_name}`
      );
      dispatch({
        type: GET_DATA_EMPLOYEE_BY_NAME_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DATA_EMPLOYEE_BY_NAME_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createEmployeeData = (formData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_DATA_EMPLOYEE_REQUEST });

    try {
      const response = await axios.post(`${API_URL}/data_pegawai`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      dispatch({
        type: CREATE_DATA_EMPLOYEE_SUCCESS,
        payload: response.data,
      });
      navigate("/employee-data");
      return response.data;
    } catch (error) {
      dispatch({
        type: CREATE_DATA_EMPLOYEE_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
};

export const updateEmployeeData = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/data_pegawai/${id}`, data);
      dispatch({
        type: UPDATE_DATA_EMPLOYEE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DATA_EMPLOYEE_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const deleteEmployeeData = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}/data_pegawai/${id}`);
      dispatch({
        type: DELETE_DATA_EMPLOYEE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_DATA_EMPLOYEE_FAILURE,
        payload: error.message,
      });
    }
  };
};
