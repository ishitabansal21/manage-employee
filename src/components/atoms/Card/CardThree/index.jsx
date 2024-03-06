import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataDepartment } from "../../../../config/redux/action";
import { FaUserTie } from "react-icons/fa";

const CardThree = () => {
  const dispatch = useDispatch();
  const { departmentData } = useSelector((state) => state.departmentData);
  const jumlahDataJabatan = departmentData.length;

  useEffect(() => {
    dispatch(getDataDepartment());
  }, [dispatch]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <FaUserTie className="fill-primary text-xl dark:fill-white" />
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {jumlahDataJabatan}
          </h4>
          <span className="text-sm font-medium">Department Data</span>
        </div>
      </div>
    </div>
  );
};

export default CardThree;
