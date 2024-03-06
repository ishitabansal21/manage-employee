import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../../../layout";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Breadcrumb,
  ButtonOne,
  ButtonTwo,
  ButtonThree,
} from "../../../../../components";
import { getMe } from "../../../../../config/redux/action";

const FormEditDataAttendance = () => {
  const [nik, setNik] = useState("");
  const [namaPegawai, setNamaPegawai] = useState("");
  const [designationName, setNamaJabatan] = useState("");
  const [hadir, setHadir] = useState("");
  const [sakit, setSakit] = useState("");
  const [alpha, setAlpha] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/data_kehadiran/${id}`
        );
        setNamaPegawai(response.data.employee_name);
        setNik(response.data.nik);
        setNamaJabatan(response.data.desigantion_name);
        setHadir(response.data.hadir);
        setSakit(response.data.sakit);
        setAlpha(response.data.alpha);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateAttendanceData = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("employee_name", namaPegawai);
      formData.append("nik", nik);
      formData.append("desigantion_name", designationName);
      formData.append("hadir", hadir);
      formData.append("sakit", sakit);
      formData.append("alpha", alpha);

      const response = await axios.patch(
        `http://localhost:5000/data_kehadiran/update/${id}`,
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
      navigate("/attendance-data");
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
      <Breadcrumb pageName="Form Edit Data Kehadiran Pegawai" />

      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Edit Data Kehadiran Pegawai
              </h3>
            </div>
            <form onSubmit={updateAttendanceData}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nama Pegawai <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="namaPegawai"
                      name="namaPegawai"
                      value={namaPegawai}
                      onChange={(e) => setNamaPegawai(e.target.value)}
                      disabled
                      placeholder="Masukkan Nama"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
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
                      disabled
                      placeholder="Masukkan NIK"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 mt-10 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jabatan <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="designationName"
                      name="designationName"
                      value={designationName}
                      onChange={(e) => setNamaJabatan(e.target.value)}
                      required={true}
                      disabled
                      placeholder="Masukkan designation"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Hadir <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="hadir"
                      name="hadir"
                      value={hadir}
                      onChange={(e) => setHadir(e.target.value)}
                      required
                      placeholder="Masukkan hadir"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 mt-10 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Sakit <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="sakit"
                      name="sakit"
                      value={sakit}
                      onChange={(e) => setSakit(e.target.value)}
                      required
                      placeholder="Masukkan sakit"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Alpha <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="alpha"
                      name="alpha"
                      value={alpha}
                      onChange={(e) => setAlpha(e.target.value)}
                      required
                      placeholder="Masukkan alpha"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col gap-3 text-center md:flex-row">
                  <div>
                    <ButtonOne>
                      <span>Perbarui</span>
                    </ButtonOne>
                  </div>
                  <Link to="/attendance-data">
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

export default FormEditDataAttendance;
