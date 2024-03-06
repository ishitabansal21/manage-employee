import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../../layout";
import {
  CardOne,
  CardTwo,
  CardThree,
  CardFour,
  ChartOne,
  ChartTwo,
  Breadcrumb,
} from "../../../components";
import axios from "axios";

const DefaultDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [employeeData, setDataEmployee] = useState(null);

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/data_pegawai/name/${user.employee_name}`
        );
        const data = response.data;
        setDataEmployee(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user && user.hak_akses === "pegawai") {
      getEmployeeData();
    }
  }, [user]);

  return (
    <Layout>
      <Breadcrumb pageName="Dashboard" />
      {user && user.hak_akses === "admin" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardOne />
          <CardTwo />
          <CardThree />
          <CardFour />
        </div>
      )}
      {user && user.hak_akses === "admin" && (
        <div className="mt-4 grid grid-cols-12 gap-6 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 sm:col-span-7">
            <ChartOne />
          </div>
          <div className="col-span-12 sm:col-span-5">
            <ChartTwo />
          </div>
        </div>
      )}
      {user && user.hak_akses === "pegawai" && employeeData && (
        <>
          <div className="mt-6">
            <h2 className="px-4 py-2 text-center font-medium text-meta-3 md:text-left">
              Welcome to OrgOpti. Login as an employee.
            </h2>
          </div>
          <div className="px-4 py-2 text-lg dark:border-strokedark md:px-6">
            <h3 className="text-center font-medium text-black dark:text-white md:text-left">
              Employee Data
            </h3>
          </div>
          <div className="mt-2 flex flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:flex-row">
            <div className="flex w-full justify-center px-4 py-4 md:w-1/3 md:justify-start">
              <img
                className="h-80 w-full rounded-xl object-cover md:w-80"
                src={`http://localhost:5000/images/${employeeData.photo}`}
                alt="People"
              />
            </div>
            <div className="px-4 py-4 md:w-2/3 md:px-20 md:py-20">
              <div className="w-full md:text-lg">
                <h2 className="mb-4 block font-medium text-black dark:text-white">
                  <span className="inline-block w-32 md:w-40">Nik</span>
                  <span className="inline-block w-7">:</span>
                  {employeeData.nik}
                </h2>
                <h2 className="mb-4 block font-medium text-black dark:text-white">
                  <span className="inline-block w-32 md:w-40">
                    Employee Name
                  </span>
                  <span className="inline-block w-7">:</span>{" "}
                  <span className="pl-[-10] md:pl-0"></span>
                  {employeeData.employee_name}
                </h2>
                <h2 className="mb-4 block font-medium text-black dark:text-white">
                  <span className="inline-block w-32 md:w-40">
                    Date of entry
                  </span>
                  <span className="inline-block w-7">:</span>
                  {employeeData.tanggal_masuk}
                </h2>
                <h2 className="mb-4 block font-medium text-black dark:text-white">
                  <span className="inline-block w-32 md:w-40">Departments</span>
                  <span className="inline-block w-7">:</span>
                  {employeeData.designation}
                  <span className="pl-[-8] md:pl-0"></span>
                </h2>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default DefaultDashboard;
