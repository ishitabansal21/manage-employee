import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeData } from "../../../../config/redux/action";
import { FaUsers } from "react-icons/fa";

const CardOne = () => {
  const dispatch = useDispatch();
  const { employeeData } = useSelector((state) => state.employeeData);
  const jumlahDataPegawai = employeeData.length;

  useEffect(() => {
    dispatch(getEmployeeData());
  }, [dispatch]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <FaUsers className="fill-primary text-xl dark:fill-white" />
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {jumlahDataPegawai}
          </h4>
          <span className="text-sm font-medium">Employee Data</span>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
