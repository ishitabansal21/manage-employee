import { useState, useEffect } from "react";
import Layout from "../../../../layout";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, ButtonOne } from "../../../../components";
import { FaRegEdit, FaPlus } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { BiSearch } from "react-icons/bi";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import {
  deleteAttendanceData,
  getAttendanceData,
  getMe,
} from "../../../../config/redux/action";

const ITEMS_PER_PAGE = 4;

const AttendanceData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTahun, setFilterTahun] = useState("");
  const [filterBulan, setFilterBulan] = useState("");
  const [filterNama, setFilterNama] = useState("");

  const { attendanceData } = useSelector((state) => state.attendanceData);
  const { isError, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPages = Math.ceil(attendanceData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const filteredDataKehadiran = attendanceData.filter((kehadiranData) => {
    const isMatchBulan =
      filterBulan === "" ||
      kehadiranData.month.toLowerCase().includes(filterBulan.toLowerCase());
    const isMatchTahun =
      filterTahun === "" || kehadiranData.year.toString() === filterTahun;
    const isMatchNama =
      filterNama === "" ||
      kehadiranData.employee_name
        .toLowerCase()
        .includes(filterNama.toLowerCase());
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

  const onDeleteDataKehadiran = (id) => {
    Swal.fire({
      title: "Confirmation",
      text: "Apakah Anda yakin ingin Menghapus?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAttendanceData(id)).then(() => {
          Swal.fire({
            title: "Success",
            text: "Data attendence berhasil dihapus.",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          dispatch(getAttendanceData());
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getAttendanceData(startIndex, endIndex));
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
      <Breadcrumb pageName="Data Kehadiran Pegawai" />

      <div className="mt-6 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-10">
        <div className="border-b border-stroke py-2 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Filter Data Kehadiran Pegawai
          </h3>
        </div>

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
                className="left-0 rounded border-[1.5px] border-stroke bg-transparent py-2 pl-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              <span className="absolute left-25 py-3 text-xl ">
                <BiSearch />
              </span>
            </div>
          </div>
          <div className="flex w-full justify-center md:w-1/2 md:justify-end">
            <div className="w-full md:w-auto">
              <Link to="/attendance-data/form-attendance-data/add">
                <ButtonOne>
                  <span>Input Kehadiran</span>
                  <span>
                    <FaPlus />
                  </span>
                </ButtonOne>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-gray-2 text-left dark:bg-meta-4">
          {filteredDataKehadiran
            .slice(startIndex, endIndex)
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
            .map((data) => (
              <h2
                className="px-4 py-2 text-black dark:text-white"
                key={`${data.month}-${data.year}`}
              >
                Menampilkan Data Kehadiran Pegawai Bulan :
                <span className="font-medium"> {data.month} </span>
                Tahun :<span className="font-medium"> {data.year}</span>
              </h2>
            ))}
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
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  No
                </th>
                <th className="px-4 py-4 text-center font-medium text-black dark:text-white">
                  NIK
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Nama Pegawai
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Jabatan
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Jenis Kelamin
                </th>
                <th className="px-4 py-4 text-center font-medium text-black dark:text-white">
                  Hadir
                </th>
                <th className="px-4 py-4 text-center font-medium text-black dark:text-white">
                  Sakit
                </th>
                <th className="px-4 py-4 text-center font-medium text-black dark:text-white">
                  Alpha
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDataKehadiran
                .slice(startIndex, endIndex)
                .map((data, index) => {
                  return (
                    <tr
                      key={data.id}
                      className="border-b border-[#eee] dark:border-strokedark"
                    >
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {startIndex + index + 1}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-center text-black dark:text-white">
                          {data.nik}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data.employee_name}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data.jabatan_pegawai}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data.jenis_kelamin}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-center text-black dark:text-white">
                          {data.hadir}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-center text-black dark:text-white">
                          {data.sakit}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-center text-black dark:text-white">
                          {data.alpha}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <Link
                            className="hover:text-black"
                            to={`/attendance-data/form-attendance-data/edit/${data.id}`}
                          >
                            <FaRegEdit className="text-xl text-primary hover:text-black dark:hover:text-white" />
                          </Link>
                          <button
                            className="hover:text-black"
                            onClick={() => onDeleteDataKehadiran(data.id)}
                          >
                            <BsTrash3 className="text-xl text-danger hover:text-black dark:hover:text-white" />
                          </button>
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
              {Math.min(endIndex, filteredDataKehadiran.length)} dari{" "}
              {filteredDataKehadiran.length} Data Kehadiran Pegawai
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

export default AttendanceData;
