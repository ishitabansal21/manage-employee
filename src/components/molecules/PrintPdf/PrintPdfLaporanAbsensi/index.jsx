import React, { useRef, useEffect, useState } from "react";
import LogoPt from "../../../../assets/images/logo/logo-dark.svg";
import LogoSipeka from "../../../../assets/images/logo/logo-sipeka.png";
import { useReactToPrint } from "react-to-print";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAbsenceReportByMonth,
  fetchAbsenceReportByYear,
  getMe,
} from "../../../../config/redux/action";
import { ButtonOne, ButtonTwo } from "../../../atoms";

const PrintPdfAbsenceReport = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const [month, setBulan] = useState("");
  const [year, setTahun] = useState("");

  const { isError, user } = useSelector((state) => state.auth);
  const { absenceReportdata } = useSelector((state) => state.absenceReport);

  const getDataByYear = async (selectedYear) => {
    dispatch(fetchAbsenceReportByYear(selectedYear));
  };

  const getDataByMonth = async (selectedMonth) => {
    dispatch(fetchAbsenceReportByMonth(selectedMonth));
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Laporan_Kehadiran_Pegawai_PT. Humpuss Karbometil Selulosa",
  });

  useEffect(() => {
    getDataByYear(year);
    getDataByMonth(month);
  }, [year, month]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (user && user.hak_akses !== "admin") {
      navigate("/dashboard");
    } else {
      handlePrint();
    }
  }, [isError, user, navigate, handlePrint]);

  useEffect(() => {
    const today = new Date();
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    setBulan(month);
    setTahun(year);
  }, []);

  return (
    <>
      <div className="flex w-full flex-col gap-3 bg-white p-6 text-center dark:bg-meta-4 md:flex-row">
        <div>
          <ButtonOne onClick={handlePrint}>
            <span>Cetak</span>
          </ButtonOne>
        </div>
        <Link to="/report/attendance">
          <ButtonTwo>
            <span>Kembali</span>
          </ButtonTwo>
        </Link>
      </div>
      <div
        ref={componentRef}
        className="w-200% h-100% bg-white p-10 dark:bg-meta-4"
      >
        <div className="flex items-center gap-24 border-b-4 border-black object-cover dark:border-white">
          <img
            className="w-35"
            src={LogoSipeka}
            title="Logo SiPeKa"
            alt="Logo SiPeKa"
          />
          <h1 className="boder text-2xl font-bold text-black  dark:text-white">
            PT. Humpuss Karbometil Selulosa
          </h1>
          <img
            className="w-35"
            src={LogoPt}
            title="Logo PT.Humpuss Karbometil Selulosa"
            alt="Logo PT.Humpuss Karbometil Selulosa"
          />
        </div>
        <h1 className="boder my-4 py-2 text-center text-xl font-medium text-black dark:text-white">
          Laporan Kehadiran Pegawai
        </h1>
        <div className="w-full md:text-lg">
          <h2 className="mb-4 block font-medium text-black dark:text-white">
            <span className="inline-block w-32 md:w-40">Bulan</span>
            <span className="pl-[-8] md:pl-0"></span>
            <span className="inline-block w-7">:</span>
            {month}
          </h2>
          <h2 className="mb-4 block font-medium text-black dark:text-white">
            <span className="inline-block w-32 md:w-40">Tahun</span>
            <span className="inline-block w-7">:</span>
            {year}
            <span className="pl-[-8] md:pl-0"></span>
          </h2>
        </div>
        <div className="max-w-full overflow-x-auto py-4">
          <table className="table-auto-full w-full">
            <thead>
              <tr>
                <th className="border-b border-l border-t border-black font-medium  text-black dark:border-white dark:text-white">
                  No
                </th>
                <th className="border-b border-l border-t border-black font-medium text-black dark:border-white dark:text-white">
                  NIK
                </th>
                <th className="border-b border-l border-t border-black font-medium text-black dark:border-white dark:text-white">
                  Nama <br /> Pegawai
                </th>
                <th className="border-b border-l border-t border-black font-medium text-black dark:border-white dark:text-white">
                  Jabatan
                </th>
                <th className="border-b border-l border-t border-black font-medium text-black dark:border-white dark:text-white">
                  Hadir
                </th>
                <th className="border-b border-l border-t border-black font-medium text-black dark:border-white dark:text-white">
                  Sakit
                </th>
                <th className="border-b border-l border-r border-t border-black font-medium text-black dark:border-white dark:text-white">
                  Alpha
                </th>
              </tr>
            </thead>
            <tbody>
              {absenceReportdata.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="border-b border-l border-black py-5 text-center dark:border-white">
                      <p className="text-black dark:text-white">{index + 1}</p>
                    </td>
                    <td className="border-b border-l border-black py-5 text-center dark:border-white">
                      <p className="text-black dark:text-white">{data.nik}</p>
                    </td>
                    <td className="border-b border-l border-black py-5 text-center dark:border-white">
                      <p className="text-black dark:text-white">
                        {data.employee_name}
                      </p>
                    </td>
                    <td className="border-b border-l border-black py-5 text-center dark:border-white">
                      <p className="text-black dark:text-white">
                        {data.jabatan_pegawai}
                      </p>
                    </td>
                    <td className="border-b border-l border-black py-5 text-center dark:border-white">
                      <p className="text-black dark:text-white">{data.hadir}</p>
                    </td>
                    <td className="border-b border-l border-black py-5 text-center dark:border-white">
                      <p className="text-black dark:text-white">{data.sakit}</p>
                    </td>
                    <td className="border-b border-l border-r border-black py-5 text-center dark:border-white">
                      <p className="text-black dark:text-white">{data.alpha}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="py-6">
          <div className="text-right font-medium text-black dark:text-white">
            <span>Karawang, {`${new Date().getDate()} ${month} ${year}`}</span>
            <br />
            <span className="p-26">Finance</span>
            <br />
            <br />
            <span className="p-8 italic text-black dark:text-white">
              Tanda Tangan
            </span>
          </div>
        </div>
        <div className="mt-70 italic text-black dark:text-white">
          Dicetak Pada : {`${new Date().getDate()} ${month} ${year}`}
        </div>
      </div>
    </>
  );
};

export default PrintPdfAbsenceReport;
