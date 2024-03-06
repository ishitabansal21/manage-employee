import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../../components/molecules/NotFound";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import {
  FormAddDataDesignation,
  FormEditDataDesignation,
  FormAddDataAttendance,
  FormEditDataAttendance,
  FormAddEmployeeData,
  FormEditEmployeeData,
  FormAddDataCut,
  FormEditDataCut,
  PrintPdfSalaryReport,
  DetailedSalaryData,
  PrintPdfSalarySlip,
  PrintPdfAbsenceReport,
  PrintPdfDataSalaryEmployee,
} from "../../components";
import {
  EmployeeData,
  DepartmentData,
  AttendanceData,
  SalaryData,
  SalaryReport,
  AbsenceReport,
  SalarySlip,
  ChangePasswordAdmin,
  EmployeeSalaryData,
  ChangeEmployeePassword,
  PieceData,
} from "../../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Route Admin */}
      {/* Master Data Admin */}
      <Route path="/employee-data" element={<EmployeeData />} />
      <Route
        path="/employee-data/form-employee-data/add"
        element={<FormAddEmployeeData />}
      />
      <Route
        path="/employee-data/form-employee-data/edit/:id"
        element={<FormEditEmployeeData />}
      />
      <Route path="/job-data" element={<DepartmentData />} />
      <Route
        path="/job-data/form-job-data/add"
        element={<FormAddDataDesignation />}
      />
      <Route
        path="/job-data/form-job-data/edit/:id"
        element={<FormEditDataDesignation />}
      />

      {/* Admin Transactions*/}
      <Route path="/attendance-data" element={<AttendanceData />} />
      <Route
        path="/attendance-data/form-attendance-data/add"
        element={<FormAddDataAttendance />}
      />
      <Route
        path="/attendance-data/form-attendance-data/edit/:id"
        element={<FormEditDataAttendance />}
      />
      <Route path="/data-slice" element={<PieceData />} />
      <Route
        path="/data-slice/form-data-slice/add"
        element={<FormAddDataCut />}
      />
      <Route
        path="/data-slice/form-data-slice/edit/:id"
        element={<FormEditDataCut />}
      />
      <Route path="/salary-data" element={<SalaryData />} />
      <Route
        path="/salary-data/detail-salary-data/name/:name"
        element={<DetailedSalaryData />}
      />
      <Route
        path="/salary-data/salary-print/salary-slip/name/:name"
        element={<PrintPdfSalarySlip />}
      />

      {/* Laporan Admin */}
      <Route path="/report/salary" element={<SalaryReport />} />
      <Route
        path="/report/salary/print-page"
        element={<PrintPdfSalaryReport />}
      />
      <Route path="/report/attendance" element={<AbsenceReport />} />
      <Route
        path="/report/attendance/print-page"
        element={<PrintPdfAbsenceReport />}
      />
      <Route path="/report/salary-slip" element={<SalarySlip />} />
      <Route
        path="/report/salary-slip/print-page"
        element={<PrintPdfSalarySlip />}
      />

      {/* Admin Settings */}
      <Route path="/change-password" element={<ChangePasswordAdmin />} />

      {/* Employee Route */}
      {/* Employee Salary Data Dashboard */}
      <Route path="/employee-salary-data" element={<EmployeeSalaryData />} />
      <Route
        path="/employee-salary-data/print-page"
        element={<PrintPdfDataSalaryEmployee />}
      />
      <Route
        path="/change-employee-password"
        element={<ChangeEmployeePassword />}
      />

      {/* Route Not Found 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
