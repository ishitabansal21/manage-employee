import React, { useRef, useEffect, useState } from "react";
import LogoPt from "../../../../assets/images/logo/logo-dark.svg";
import LogoSipeka from "../../../../assets/images/logo/logo-sipeka.png";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSlipGajiByMonth,
  fetchSlipGajiByName,
  fetchSlipGajiByYear,
  getMe,
} from "../../../../config/redux/action";
import { ButtonOne, ButtonTwo } from "../../../atoms";

const PrintPdfSalarySlip = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const name = searchParams.get("name");

  const [month, setBulan] = useState("");
  const [year, setTahun] = useState("");

  const { isError, user } = useSelector((state) => state.auth);
  const { SalarySlipdata } = useSelector((state) => state.salarySlip);

  const getDataByYear = async (selectedYear) => {
    dispatch(fetchSlipGajiByYear(selectedYear));
  };

  const getDataByMonth = async (selectedMonth) => {
    dispatch(fetchSlipGajiByMonth(selectedMonth));
  };

  const getDataByName = async (selectedName) => {
    dispatch(fetchSlipGajiByName(selectedName));
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Slip_Gaji_Pegawai_PT. Humpuss Karbometil Selulosa",
  });

  useEffect(() => {
    getDataByYear(year);
    getDataByMonth(month);
    getDataByName(name);
  }, [year, month, name]);

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
        <div>
          <ButtonTwo onClick={() => navigate(-1)}>
            <span>Kembali</span>
          </ButtonTwo>
        </div>
      </div>
      <div ref={componentRef}>
        {SalarySlipdata.map((data, index) => {
          return (
            <div
              key={index}
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
                Daftar Gaji Pegawai
              </h1>
              <div className="w-full md:text-lg">
                <h2 className="mb-4 block font-medium text-black dark:text-white">
                  <span className="inline-block w-32 md:w-40">
                    Nama Pegawai
                  </span>
                  <span className="pl-[-8] md:pl-0"></span>
                  <span className="inline-block w-7">:</span>
                  {name}
                </h2>
                <h2 className="mb-4 block font-medium text-black dark:text-white">
                  <span className="inline-block w-32 md:w-40">NIK</span>
                  <span className="pl-[-8] md:pl-0"></span>
                  <span className="inline-block w-7">:</span>
                  {data.nik}
                </h2>
                <h2 className="mb-4 block font-medium text-black dark:text-white">
                  <span className="inline-block w-32 md:w-40">Jabatan</span>
                  <span className="pl-[-8] md:pl-0"></span>
                  <span className="inline-block w-7">:</span>
                  {data.designation}
                </h2>
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
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-white text-left dark:bg-meta-4">
                      <th className="border-l border-t py-4 text-center font-medium text-black dark:text-white">
                        No
                      </th>
                      <th className="border-l border-t px-4 py-4 text-center font-medium text-black dark:text-white">
                        Keterangan
                      </th>
                      <th className="border-l border-r border-t px-4 py-4 text-center font-medium text-black dark:text-white">
                        Jumlah
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="dark:border-white">
                      <td className="border-b border-l border-t border-black py-5 text-center text-black dark:border-white dark:text-white">
                        {index + 1}
                      </td>
                      <td className="border-b border-l border-t border-black px-4 py-5 text-black dark:border-white dark:text-white">
                        Gaji Pokok
                      </td>
                      <td className="border-b border-l border-r border-t border-black px-4 py-5 text-black dark:border-white dark:text-white">
                        Rp. {data.basic_salary}
                      </td>
                    </tr>
                    <tr className=" dark:border-white">
                      <td className="border-b border-l border-t border-black py-5 text-center text-black dark:border-white dark:text-white">
                        {index + 2}
                      </td>
                      <td className="border-b border-l border-t border-black px-4 py-5 text-black dark:border-white dark:text-white">
                        Tunjangan Transportasi
                      </td>
                      <td className="border-b border-l border-r border-t border-black px-4 py-5 text-black dark:border-white dark:text-white">
                        Rp. {data.transport}
                      </td>
                    </tr>
                    <tr className=" dark:border-white">
                      <td className="border-b border-l border-t border-black py-5 text-center text-black dark:border-white dark:text-white">
                        {index + 3}
                      </td>
                      <td className="border-b border-l border-t border-black px-4 py-5 text-black dark:border-white dark:text-white">
                        Uang Makan
                      </td>
                      <td className="border-b border-l border-r border-t border-black px-4 py-5 text-black dark:border-white dark:text-white">
                        Rp. {data.meal_allowance}
                      </td>
                    </tr>
                    <tr className=" dark:border-white">
                      <td className="border-b border-l border-t border-black py-5 text-center text-black dark:border-white dark:text-white">
                        {index + 4}
                      </td>
                      <td className="border-b border-l border-t border-black px-4 py-5 text-black dark:border-white dark:text-white">
                        Potongan
                      </td>
                      <td className="border-b border-l border-r border-t border-black px-4 py-5 text-black dark:border-white dark:text-white">
                        Rp. {data.cuts}
                      </td>
                    </tr>
                    <tr className=" dark:border-white">
                      <td className="border-b border-l border-t border-black px-4 py-5 text-black dark:border-white dark:text-white"></td>
                      <td className="border-b border-black px-2 py-5 text-right font-medium text-black dark:border-white dark:text-white">
                        Total Gaji :
                      </td>
                      <td className="border-b border-l border-r border-t border-black px-4 py-5 font-medium text-black dark:border-white dark:text-white">
                        Rp. {data.total}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between py-6">
                <div className="font-medium text-black dark:text-white">
                  <span className="p-6">Pegawai</span>
                  <br />
                  <br />
                  <br />
                  <br />
                  <span>{name}</span>
                </div>
                <div className="font-medium text-black dark:text-white">
                  <span className="text-right">
                    Karawang, {`${new Date().getDate()} ${month} ${year}`}
                  </span>
                  <br />
                  <span>Finance</span>
                  <br />
                  <br />
                  <span className="p-8 italic text-black dark:text-white">
                    Tanda Tangan
                  </span>
                </div>
              </div>
              <div className="mt-30 italic text-black dark:text-white">
                Dicetak Pada : {`${new Date().getDate()} ${month} ${year}`}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PrintPdfSalarySlip;
