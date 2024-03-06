import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../../../layout";
import axios from "axios";
import Swal from "sweetalert2";
import { Breadcrumb, ButtonOne, ButtonTwo } from "../../../../../components";
import { getMe } from "../../../../../config/redux/action";

const FormEditDataDesignation = () => {
  const [designationName, setNamaJabatan] = useState("");
  const [basicSalary, setGajiPokok] = useState("");
  const [transport, setTjTransport] = useState("");
  const [mealAllowance, setUangMakan] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/data_department/${id}`
        );
        setNamaJabatan(response.data.desigantion_name);
        setGajiPokok(response.data.basic_salary);
        setTjTransport(response.data.transport);
        setUangMakan(response.data.meal_allowance);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateDataJabatan = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("desigantion_name", designationName);
      formData.append("basic_salary", basicSalary);
      formData.append("transport", transport);
      formData.append("meal_allowance", mealAllowance);

      const response = await axios.patch(
        `http://localhost:5000/data_department/${id}`,
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
      navigate("/job-data");
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
      <Breadcrumb pageName="Form Edit Jabatan" />

      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Edit Data Jabatan
              </h3>
            </div>
            <form onSubmit={updateDataJabatan}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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
                      placeholder="Masukkan designation"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Gaji Pokok <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="basicSalary"
                      name="basicSalary"
                      value={basicSalary}
                      onChange={(e) => setGajiPokok(e.target.value)}
                      required
                      placeholder="Masukkan gaji pokok"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 mt-10 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Tunjangan Transport <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="transport"
                      name="transport"
                      value={transport}
                      onChange={(e) => setTjTransport(e.target.value)}
                      required
                      placeholder="Masukkan tunjangan transport"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Uang Makan <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="mealAllowance"
                      name="mealAllowance"
                      value={mealAllowance}
                      onChange={(e) => setUangMakan(e.target.value)}
                      required
                      placeholder="Masukkan uang makan"
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
                  <Link to="/job-data">
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

export default FormEditDataDesignation;
