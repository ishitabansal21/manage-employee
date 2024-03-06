import axios from "axios";
import {
  GET_DATA_ATTENDANCE_SUCCESS,
  GET_DATA_ATTENDANCE_FAILURE,
  CREATE_DATA_ATTENDANCE_SUCCESS,
  CREATE_DATA_ATTENDANCE_FAILURE,
  UPDATE_DATA_ATTENDANCE_SUCCESS,
  UPDATE_DATA_ATTENDANCE_FAILURE,
  DELETE_DATA_ATTENDANCE_SUCCESS,
  DELETE_DATA_ATTENDANCE_FAILURE,
} from "./dataKehadiranActionTypes";

export const getAttendanceData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:5000/data_kehadiran");
      const attendanceData = response.data;
      dispatch({
        type: GET_DATA_ATTENDANCE_SUCCESS,
        payload: attendanceData,
      });
    } catch (error) {
      dispatch({
        type: GET_DATA_ATTENDANCE_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createDataKehadiran =
  (employeeData, attendanceData, navigate) => async (dispatch) => {
    try {
      for (let i = 0; i < employeeData.length; i++) {
        const isNameExists = attendanceData.some(
          (attendence) =>
            attendence.employee_name === employeeData[i].employee_name
        );

        if (!isNameExists) {
          const response = await axios.post(
            "http://localhost:5000/data_kehadiran",
            {
              nik: employeeData[i].nik,
              employee_name: employeeData[i].employee_name,
              desigantion_name: employeeData[i].designation,
              jenis_kelamin: employeeData[i].jenis_kelamin,
              hadir: hadir[i] || 0,
              sakit: sakit[i] || 0,
              alpha: alpha[i] || 0,
            }
          );

          dispatch({
            type: CREATE_DATA_ATTENDANCE_SUCCESS,
            payload: response.data,
          });

          navigate("/attendance-data");
          return response.data;
        }
      }
    } catch (error) {
      dispatch({
        type: CREATE_DATA_ATTENDANCE_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };

export const updateAttendanceData = (id, attendanceData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/data_kehadiran/${id}`,
        attendanceData
      );
      if (response.status === 200) {
        dispatch({
          type: UPDATE_DATA_ATTENDANCE_SUCCESS,
          payload: "Attendance data updated successfully",
        });
        dispatch(getAttendanceData());
      } else {
        dispatch({
          type: UPDATE_DATA_ATTENDANCE_FAILURE,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_DATA_ATTENDANCE_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const deleteAttendanceData = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/data_kehadiran/${id}`
      );
      if (response.status === 200) {
        dispatch({
          type: DELETE_DATA_ATTENDANCE_SUCCESS,
          payload: "Data deletion successful",
        });
        dispatch(getAttendanceData());
      } else {
        dispatch({
          type: DELETE_DATA_ATTENDANCE_FAILURE,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: DELETE_DATA_ATTENDANCE_FAILURE,
        payload: error.message,
      });
    }
  };
};
