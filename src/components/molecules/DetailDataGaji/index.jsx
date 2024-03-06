import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getMe } from "../../../config/redux/action";
import Layout from "../../../layout";
import { Breadcrumb, ButtonOne, ButtonTwo } from "../../../components";
import { TfiPrinter } from "react-icons/tfi";

const DetailedSalaryData = () => {
  const [data, setData] = useState({
    year: "",
    month: "",
    nik: "",
    employee_name: "",
    designation: "",
    basic_salary: "",
    transport: "",
    meal_allowance: "",
    cuts: "",
    total: "",
  });
  const { name } = useParams();
  const [index] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  const onSubmitPrint = () => {
    navigate(
      `/report/salary-slip/print-page?month=${data.month}&year=${data.year}&name=${name}`
    );
  };

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/data_gaji/name/${name}`
        );
        const data = response.data[0];

        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getEmployeeData();
  }, [name]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (user && user.hak_akses !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <Breadcrumb pageName="Detailed Employee Salary Data" />
      <Link to="/salary-data">
        <ButtonTwo>
          <span>Return</span>
        </ButtonTwo>
      </Link>
      <div className="mt-6 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mt-4 flex flex-col items-center justify-between md:flex-row md:justify-between"></div>

        <div className="max-w-full overflow-x-auto">
          <div className="md:w-2/3">
            <div className="w-full md:text-lg">
              <h2 className="mb-4 block font-medium text-black dark:text-white">
                <span className="inline-block w-32 md:w-40">Name</span>
                <span className="inline-block w-7">:</span>
                {data.employee_name}
              </h2>
              <h2 className="mb-4 block font-medium text-black dark:text-white">
                <span className="inline-block w-32 md:w-40">NIK</span>
                <span className="inline-block w-6">:</span>{" "}
                <span className="pl-[-10] md:pl-0"></span>
                {data.nik}
              </h2>
              <h2 className="mb-4 block font-medium text-black dark:text-white">
                <span className="inline-block w-32 md:w-40">Department</span>
                <span className="inline-block w-7">:</span>
                {data.designation}
              </h2>
              <h2 className="mb-4 block font-medium text-black dark:text-white">
                <span className="inline-block w-32 md:w-40">Month</span>
                <span className="pl-[-8] md:pl-0"></span>
                <span className="inline-block w-7">:</span>
                {data.month}
              </h2>
              <h2 className="mb-4 block font-medium text-black dark:text-white">
                <span className="inline-block w-32 md:w-40">Year</span>
                <span className="inline-block w-7">:</span>
                {data.year}
                <span className="pl-[-8] md:pl-0"></span>
              </h2>
            </div>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  No
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Information
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50 dark:border-strokedark">
                <td className="border-b border-[#eee] px-4 py-5 text-black dark:border-strokedark dark:text-white">
                  {index + 1}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 text-black dark:border-strokedark dark:text-white">
                  Basic salary
                </td>
                <td className="border-b border-[#eee] px-4 py-5 text-black dark:border-strokedark dark:text-white">
                  Rs. {data.basic_salary}
                </td>
              </tr>
              <tr className="bg-gray-50 dark:border-strokedark">
                <td className="border-b border-[#eee] px-4 py-5 text-black dark:border-strokedark dark:text-white">
                  {index + 2}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 text-black dark:border-strokedark dark:text-white">
                  Transportation Allowance
                </td>
                <td className="border-b border-[#eee] px-4 py-5 text-black dark:border-strokedark dark:text-white">
                  Rs. {data.transport}
                </td>
              </tr>
              <tr className="bg-gray-50 dark:border-strokedark">
                <td className="border-b border-[#eee] px-4 py-5 text-black dark:border-strokedark dark:text-white">
                  {index + 3}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 text-black dark:border-strokedark dark:text-white">
                  Meal allowance
                </td>
                <td className="border-b border-[#eee] px-4 py-5 text-black dark:border-strokedark dark:text-white">
                  Rs. {data.meal_allowance}
                </td>
              </tr>
              <tr className="bg-gray-50 dark:border-strokedark">
                <td className="border-b border-[#eee] px-4 py-5 text-black dark:border-strokedark dark:text-white">
                  {index + 4}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 text-black dark:border-strokedark dark:text-white">
                  Cuts
                </td>
                <td className="border-b border-[#eee] px-4 py-5 text-black dark:border-strokedark dark:text-white">
                  Rs. {data.cuts}
                </td>
              </tr>
              <tr className="bg-gray-50 dark:border-strokedark">
                <td className="border-b border-[#eee] px-4 py-5 text-black dark:border-strokedark dark:text-white"></td>
                <td className="border-b border-[#eee]  py-5 text-right font-medium text-black dark:border-strokedark dark:text-white">
                  Total Salary :
                </td>
                <td className="border-b border-[#eee] px-4 py-5 font-medium text-black dark:border-strokedark dark:text-white">
                  Rs. {data.total}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="w-full py-6 md:w-1/2 md:justify-end">
            <div className="w-full md:w-auto">
              <ButtonOne onClick={onSubmitPrint}>
                <span>Print Employee Salaries</span>
                <span>
                  <TfiPrinter />
                </span>
              </ButtonOne>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailedSalaryData;
