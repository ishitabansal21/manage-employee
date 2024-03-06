import {
  FETCH_SLIP_SALARY_SUCCESS,
  FETCH_SLIP_SALARY_FAILURE,
  CLEAR_SALARY_SLIPS,
} from "../../action/slipGajiAction";

const initialState = {
  SalarySlipdata: [],
  error: null,
};

const slipSalaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SLIP_SALARY_SUCCESS:
      return {
        ...state,
        SalarySlipdata: action.payload,
        error: null,
      };
    case FETCH_SLIP_SALARY_FAILURE:
      return {
        ...state,
        SalarySlipdata: [],
        error: action.payload,
      };
    case CLEAR_SALARY_SLIPS:
      return {
        ...state,
        SalarySlipdata: [],
        error: null,
      };
    default:
      return state;
  }
};

export default slipSalaryReducer;
