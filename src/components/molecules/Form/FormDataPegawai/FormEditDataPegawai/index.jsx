import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Breadcrumb, ButtonOne, ButtonTwo } from "../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../../../layout";
import axios from "axios";
import { getMe } from "../../../../../config/redux/action";
import Swal from "sweetalert2";

const FormEditEmployeeData = () => {
  const [nik, setNik] = useState("");
  const [namaPegawai, setNamaPegawai] = useState("");
  const [username, setUsername] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [designation, setJabatan] = useState("");
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [status, setStatus] = useState("");
  const [hakAkses, setHakAkses] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nik", nik);
      formData.append("employee_name", namaPegawai);
      formData.append("username", username);
      formData.append("jenis_kelamin", jenisKelamin);
      formData.append("designation", designation);
      formData.append("tanggal_masuk", tanggalMasuk);
      formData.append("status", status);
      formData.append("hak_akses", hakAkses);

      const response = await axios.patch(
        `http://localhost:5000/data_pegawai/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMsg(response.data.msg);
      Swal.fire({
        icon: "success",
        title: "Success",
        timer: 1500,
        text: response.data.msg,
      });
      navigate("/employee-data");
    } catch (error) {
      setMsg(error.response.data.msg);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.msg,
      });
    }
  };

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/data_pegawai/id/${id}`
        );
        const data = response.data;
        setNik(data.nik);
        setNamaPegawai(data.employee_name);
        setUsername(data.username);
        setJenisKelamin(data.jenis_kelamin);
        setJabatan(data.designation);
        setTanggalMasuk(data.tanggal_masuk);
        setStatus(data.status);
        setHakAkses(data.hak_akses);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

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
      <Breadcrumb pageName="Form Edit Pegawai" />
      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Edit Data Pegawai
              </h3>
            </div>
            <form onSubmit={updateUser}>
              <p className="text-meta-1">{msg}</p>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      NIK <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="nik"
                      name="nik"
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      required
                      placeholder="Masukkan nomor nik"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nama Lengkap <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="namaPegawai"
                      name="namaPegawai"
                      value={namaPegawai}
                      onChange={(e) => setNamaPegawai(e.target.value)}
                      required={true}
                      placeholder="Masukkan nama lengkap"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Username <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="username"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required={true}
                      placeholder="Masukkan username"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jenis Kelamin <span className="text-meta-1">*</span>
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        id="jenisKelamin"
                        name="jenisKelamin"
                        value={jenisKelamin}
                        onChange={(e) => setJenisKelamin(e.target.value)}
                        required={true}
                      >
                        <option value="" disabled={true}>
                          Pilih jenis kelamin
                        </option>
                        <option value="laki-laki">Laki-Laki</option>
                        <option value="perempuan">Perempuan</option>
                      </select>
                      <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2 text-2xl">
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jabatan <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={designation}
                      onChange={(e) => setJabatan(e.target.value)}
                      required={true}
                      placeholder="Masukkan designation"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Tanggal Masuk <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="date"
                      id="tanggalMasuk"
                      name="tanggalMasuk"
                      value={tanggalMasuk}
                      onChange={(e) => setTanggalMasuk(e.target.value)}
                      required={true}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Status <span className="text-meta-1">*</span>
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required={true}
                      >
                        <option value="" disabled={true}>
                          Pilih status
                        </option>
                        <option value="karyawan tetap">
                          Permanent employees
                        </option>
                        <option value="karyawan tidak tetap">
                          Non-Permanent Employees
                        </option>
                      </select>
                      <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2 text-2xl">
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </div>
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Hak Akses <span className="text-meta-1">*</span>
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        id="hak_akses"
                        name="hak_akses"
                        value={hakAkses}
                        onChange={(e) => setHakAkses(e.target.value)}
                        required={true}
                      >
                        <option value="" disabled={true}>
                          Pilih hak akses
                        </option>
                        <option value="admin">Admin</option>
                        <option value="pegawai">Pegawai</option>
                      </select>
                      <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2 text-2xl">
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 text-center md:flex-row">
                  <div>
                    <ButtonOne>
                      <span>Perbarui</span>
                    </ButtonOne>
                  </div>
                  <Link to="/employee-data">
                    <ButtonTwo>
                      <span>Kembali</span>
                    </ButtonTwo>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FormEditEmployeeData;
