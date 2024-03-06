import axios from "axios";

export const FETCH_SLIP_SALARY_SUCCESS = "FETCH_SLIP_SALARY_SUCCESS";
export const FETCH_SLIP_SALARY_FAILURE = "FETCH_SLIP_SALARY_FAILURE";
export const CLEAR_SALARY_SLIPS = "CLEAR_SALARY_SLIPS";

export const fetchSalarySlipSuccess = (data) => ({
    type: FETCH_SLIP_SALARY_SUCCESS,
    payload: data,
});

export const fetchSalarySlipFailure = (error) => ({
    type: FETCH_SLIP_SALARY_FAILURE,
    payload: error,
});

export const clearSalarySlip = () => ({
    type: CLEAR_SALARY_SLIPS,
});

export const fetchSalarySlipByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/laporan/slip_gaji/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchSalarySlipSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSalarySlipFailure("An error occurred while loading data."));
        }
    }
};

export const fetchSalarySlipByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/laporan/slip_gaji/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchSalarySlipSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSalarySlipFailure("An error occurred while loading data."));
        }
    }
};

export const fetchSalarySlipByName = (selectedName, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/laporan/slip_gaji/name/${selectedName}`
        );
        const data = response.data;
        dispatch(fetchSalarySlipSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSalarySlipFailure("An error occurred while loading data."));
        }
    }
};
