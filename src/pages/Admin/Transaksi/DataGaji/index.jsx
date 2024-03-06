import { useState, useEffect } from "react";
import Layout from "../../../../layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, ButtonOne } from "../../../../components";
import { FaRegEye } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import Swal from "sweetalert2";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { TfiPrinter } from "react-icons/tfi";
import {
  fetchSalaryReportByMonth,
  fetchSalaryReportByYear,
  getSalaryData,
  getMe,
} from "../../../../config/redux/action";

const ITEMS_PER_PAGE = 4;

const SalaryData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTahun, setFilterTahun] = useState("");
  const [filterBulan, setFilterBulan] = useState("");
  const [filterNama, setFilterNama] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { salaryData } = useSelector((state) => state.salaryData);
  const { isError, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPages = Math.ceil(salaryData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const filteredDataGaji = salaryData.filter((gajiDataPegawai) => {
    const isMatchBulan =
      filterBulan === "" ||
      (typeof gajiDataPegawai.month === "string" &&
        gajiDataPegawai.month
          .toLowerCase()
          .includes(filterBulan.toLowerCase()));
    const isMatchTahun =
      filterTahun === "" || gajiDataPegawai.year.toString() === filterTahun;
    const isMatchNama =
      filterNama === "" ||
      (typeof gajiDataPegawai.employee_name === "string" &&
        gajiDataPegawai.employee_name
          .toLowerCase()
          .includes(filterNama.toLowerCase()));
    return isMatchBulan && isMatchTahun && isMatchNama;
  });

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleBulanChange = (event) => {
    setFilterBulan(event.target.value);
  };

  const handleTahunChange = (event) => {
    setFilterTahun(event.target.value);
  };

  const handleNamaChange = (event) => {
    setFilterNama(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const selectedMonth = filterBulan;
    const selectedYear = filterTahun;

    let yearDataFound = false;
    let monthDataFound = false;

    await Promise.all([
      dispatch(
        fetchSalaryReportByYear(selectedYear, () => (yearDataFound = true))
      ),
      dispatch(
        fetchSalaryReportByMonth(selectedMonth, () => (monthDataFound = true))
      ),
    ]);
    setShowMessage(true);

    if (yearDataFound && monthDataFound) {
      setShowMessage(false);
      navigate(
        `/report/salary/print-page?month=${selectedMonth}&year=${selectedYear}`
      );
    } else {
      setShowMessage(false);
      Swal.fire({
        icon: "error",
        title: "Data tidak ditemukan",
        text: "Maaf, data yang anda cari tidak ditemukan",
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    dispatch(getSalaryData(startIndex, endIndex));
  }, [dispatch, startIndex, endIndex]);

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

  const paginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`border border-gray-2 px-4 py-2 font-semibold text-black dark:border-strokedark dark:text-white ${
            currentPage === page
              ? "bg-primary text-white hover:bg-primary dark:bg-primary dark:hover:bg-primary"
              : "hover:bg-gray-2 dark:hover:bg-stroke"
          } rounded-lg`}
        >
          {page}
        </button>
      );
    }

    if (startPage > 2) {
      items.unshift(
        <p
          key="start-ellipsis"
          className="border border-gray-2 bg-gray px-4 py-2 font-medium text-black dark:border-strokedark dark:bg-transparent dark:text-white"
        >
          ...
        </p>
      );
    }

    if (endPage < totalPages - 1) {
      items.push(
        <p
          key="end-ellipsis"
          className="border border-gray-2 bg-gray px-4 py-2 font-medium text-black dark:border-strokedark dark:bg-transparent dark:text-white"
        >
          ...
        </p>
      );
    }

    return items;
  };
  return (
    <Layout>
      <Breadcrumb pageName="Data Gaji Pegawai" />

      <div className="mt-6 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-10">
        <div className="border-b border-stroke py-2 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Filter Data Gaji Pegawai
          </h3>
        </div>
        <form onSubmit={handleSearch}>
          {showMessage && <p className="text-meta-1">Data tidak ditemukan</p>}
          <div className="mt-4 flex flex-col items-center md:flex-row md:justify-between">
            <div className="relative mb-4 w-full md:mb-0 md:mr-2 md:w-1/2">
              <div className="relative">
                <span className="px-6">Bulan</span>
                <span className="absolute left-70 top-1/2 z-30 -translate-y-1/2 text-xl">
                  <MdOutlineKeyboardArrowDown />
                </span>
                <select
                  value={filterBulan}
                  onChange={handleBulanChange}
                  required
                  className="relative appearance-none rounded border border-stroke bg-transparent px-18 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="">Pilih Bulan</option>
                  <option value="Januari">Januari</option>
                  <option value="Februari">Februari</option>
                  <option value="Maret">Maret</option>
                  <option value="April">April</option>
                  <option value="Mei">Mei</option>
                  <option value="Juni">Juni</option>
                  <option value="Juli">Juli</option>
                  <option value="Agustus">Agustus</option>
                  <option value="September">September</option>
                  <option value="Oktober">Oktober</option>
                  <option value="November">November</option>
                  <option value="Desember">Desember</option>
                </select>
              </div>
            </div>
            <div className="relative mb-4 w-full md:mb-0 md:mr-2 md:w-1/2">
              <div className="relative">
                <span className="px-6">Tahun</span>
                <input
                  type="number"
                  placeholder="Masukkan Tahun..."
                  value={filterTahun}
                  onChange={handleTahunChange}
                  required
                  className="left-0 rounded border-[1.5px] border-stroke bg-transparent py-2 pl-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <span className="absolute left-25 py-3 text-xl ">
                  <BiSearch />
                </span>
              </div>
            </div>
            <div className="flex w-full justify-center md:w-1/2 md:justify-end">
              <div className="w-full md:w-auto">
                <ButtonOne type="submit">
                  <span>Cetak Daftar Gaji</span>
                  <span>
                    <TfiPrinter />
                  </span>
                </ButtonOne>
              </div>
            </div>
          </div>
        </form>
        <div className="mt-6 bg-gray-2 text-left dark:bg-meta-4">
          {filteredDataGaji
            .reduce((uniqueEntries, data) => {
              const isEntryExist = uniqueEntries.find(
                (entry) =>
                  entry.month === data.month && entry.year === data.year
              );
              if (!isEntryExist) {
                uniqueEntries.push(data);
              }
              return uniqueEntries;
            }, [])
            .map(
              (data) =>
                data.year !== 0 &&
                data.month !== 0 && (
                  <h2
                    className="px-4 py-2 text-black dark:text-white"
                    key={`${data.month}-${data.year}`}
                  >
                    Menampilkan Data Gaji Pegawai Bulan :
                    <span className="font-medium"> {data.month} </span>
                    Tahun :<span className="font-medium"> {data.year}</span>
                  </h2>
                )
            )}
        </div>
      </div>

      <div className="mt-6 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mt-4 flex flex-col items-center justify-between md:flex-row md:justify-between">
          <div className="flex-2 relative mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Cari Nama Pegawai..."
              value={filterNama}
              onChange={handleNamaChange}
              className="left-0 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 pl-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <span className="absolute left-2 py-3 text-xl">
              <BiSearch />
            </span>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto py-4">
          <table className="table-auto-full w-full">
            <thead>
              <tr className="bg-gray-2  dark:bg-meta-4">
                <th className="px-2 py-2 font-medium text-black dark:text-white">
                  No
                </th>
                <th className="px-2 py-2 font-medium text-black dark:text-white">
                  NIK
                </th>
                <th className="px-2 py-2 font-medium text-black dark:text-white">
                  Nama <br /> Pegawai
                </th>
                <th className="px-2 py-2 font-medium text-black dark:text-white">
                  Jabatan
                </th>
                <th className="px-2 py-2 font-medium text-black dark:text-white">
                  Gaji <br /> Pokok
                </th>
                <th className="px-2 py-2 font-medium text-black dark:text-white">
                  Tunjangan <br />
                  Transport
                </th>
                <th className="px-2 py-2 font-medium text-black dark:text-white">
                  Uang <br /> Makan
                </th>
                <th className="px-2 py-2 font-medium text-black dark:text-white">
                  Potongan
                </th>
                <th className="px-2 py-2 font-medium text-black dark:text-white">
                  Total <br /> Gaji
                </th>
                <th className="px-2 py-2 font-medium text-black dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDataGaji
                .slice(startIndex, endIndex)
                .map((data, index) => {
                  return (
                    <tr key={data.id}>
                      <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {startIndex + index + 1}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                        <p className="text-black dark:text-white">{data.nik}</p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data.employee_name}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data.designation}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          Rp. {data.basic_salary}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          Rp. {data.transport}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          Rp. {data.meal_allowance}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          Rp. {data.cuts}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          Rp. {data.total}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <Link
                            className="hover:text-black"
                            to={`/salary-data/detail-salary-data/name/${data.employee_name}`}
                          >
                            <FaRegEye className="text-xl text-primary hover:text-black dark:hover:text-white" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col items-center justify-between md:flex-row md:justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-5 dark:text-gray-4 py-4 text-sm">
              Menampilkan {startIndex + 1}-
              {Math.min(endIndex, filteredDataGaji.length)} data{" "}
              {filteredDataGaji.length} Data Gaji Pegawai
            </span>
          </div>
          <div className="flex space-x-2 py-4">
            <button
              disabled={currentPage === 1}
              onClick={goToPrevPage}
              className="rounded-lg border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary hover:text-white disabled:opacity-50 dark:border-primary dark:text-white dark:hover:bg-primary dark:hover:text-white"
            >
              <MdKeyboardDoubleArrowLeft />
            </button>
            {paginationItems()}
            <button
              disabled={currentPage === totalPages}
              onClick={goToNextPage}
              className="rounded-lg border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary hover:text-white disabled:opacity-50 dark:border-primary dark:text-white dark:hover:bg-primary dark:hover:text-white"
            >
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalaryData;
