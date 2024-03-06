import axios from "axios";
import {
  GET_DATA_CUTTING_SUCCESS,
  GET_DATA_CUTTING_FAILURE,
  CREATE_DATA_CUTTING_SUCCESS,
  CREATE_DATA_CUTTING_FAILURE,
  UPDATE_DATA_CUTTING_SUCCESS,
  UPDATE_DATA_CUTTING_FAILURE,
  DELETE_DATA_CUTTING_SUCCESS,
  DELETE_DATA_CUTTING_FAILURE,
} from "./dataPotonganActionTypes";

const API_URL = "http://localhost:5000";

export const getChunkData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/data_potongan`);
      dispatch({
        type: GET_DATA_CUTTING_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DATA_CUTTING_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createCutData = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/data_potongan`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      dispatch({
        type: CREATE_DATA_CUTTING_SUCCESS,
        payload: response.data,
      });
      navigate("/data-slice");
      return response.data;
    } catch (error) {
      dispatch({
        type: CREATE_DATA_CUTTING_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
};

export const updateCutData = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/data_potongan/${id}`, data);
      dispatch({
        type: UPDATE_DATA_CUTTING_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DATA_CUTTING_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const deleteCutData = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}/data_potongan/${id}`);
      dispatch({
        type: DELETE_DATA_CUTTING_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_DATA_CUTTING_FAILURE,
        payload: error.message,
      });
    }
  };
};
