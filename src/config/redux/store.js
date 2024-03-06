import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import dataSalaryEmployeePrintReducer from "./reducer/dataSalaryEmployeePrintReducer";
import dataEmployeeReducer from "./reducer/dataEmployeeReducer";
import dataDepartmentReducer from "./reducer/dataDepartmentReducer";
import dataKehadiranReucer from "./reducer/dataAttendanceReducer";
import dataCutsReducer from "./reducer/dataCutsReducer";
import dataSalaryReducer from "./reducer/dataSalaryReducer";
import AbsenceReducerReport from "./reducer/AbsenceReducerReport";
import ReportSalaryReducer from "./reducer/ReportSalaryReducer";
import slipSalaryReducer from "./reducer/slipSalaryReducer";
import changePasswordReducer from "./reducer/changePasswordReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dataSalaryEmployeePrint: dataSalaryEmployeePrintReducer,
    employeeData: dataEmployeeReducer,
    departmentData: dataDepartmentReducer,
    attendanceData: dataKehadiranReucer,
    dataCuts: dataCutsReducer,
    salaryData: dataSalaryReducer,
    absenceReport: AbsenceReducerReport,
    salaryReport: ReportSalaryReducer,
    salarySlip: slipSalaryReducer,
    changePassword: changePasswordReducer,
  },
});

export default store;
