import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAttendanceData } from "../../../../config/redux/action";
import { AiFillDatabase } from "react-icons/ai";

const CardFour = () => {
  const dispatch = useDispatch();
  const { attendanceData } = useSelector((state) => state.attendanceData);
  const jumlahDataKehadiran = attendanceData.length;

  useEffect(() => {
    dispatch(getAttendanceData());
  }, [dispatch]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <AiFillDatabase className="fill-primary text-xl dark:fill-white" />
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {jumlahDataKehadiran}
          </h4>
          <span className="text-sm font-medium">Attendance Data</span>
        </div>
      </div>
    </div>
  );
};

export default CardFour;
