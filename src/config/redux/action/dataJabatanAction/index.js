import axios from "axios";
import {
  GET_DATA_DEPARTMENT_SUCCESS,
  GET_DATA_DEPARTMENT_FAILURE,
  CREATE_DATA_DEPARTMENT_SUCCESS,
  CREATE_DATA_DEPARTMENT_FAILURE,
  UPDATE_DATA_DEPARTMENT_SUCCESS,
  UPDATE_DATA_DEPARTMENT_FAILURE,
  DELETE_DATA_DEPARTMENT_SUCCESS,
  DELETE_DATA_DEPARTMENT_FAILURE,
} from "./dataJabatanActionTypes";

const API_URL = "http://localhost:5000";

export const getDataDepartment = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/data_department`);
      dispatch({
        type: GET_DATA_DEPARTMENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DATA_DEPARTMENT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createDataDepartment = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/data_department`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: CREATE_DATA_DEPARTMENT_SUCCESS,
        payload: response.data,
      });
      navigate("/job-data");
      return response.data;
    } catch (error) {
      dispatch({
        type: CREATE_DATA_DEPARTMENT_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
};

export const updateDataJabatan = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${API_URL}/data_department/${id}`,
        data
      );
      dispatch({
        type: UPDATE_DATA_DEPARTMENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DATA_DEPARTMENT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const deleteDataJabatan = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}/data_department/${id}`);
      dispatch({
        type: DELETE_DATA_DEPARTMENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_DATA_DEPARTMENT_FAILURE,
        payload: error.message,
      });
    }
  };
};
