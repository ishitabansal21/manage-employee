import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../../../layout";
import Swal from "sweetalert2";
import { Breadcrumb, ButtonOne, ButtonTwo } from "../../../../../components";
import {
  createDataDepartment,
  getMe,
} from "../../../../../config/redux/action";

const FormAddDataDesignation = () => {
  const [formData, setFormData] = useState({
    designationName: "",
    basicSalary: "",
    transport: "",
    mealAllowance: "",
  });

  const { designationName, basicSalary, transport, mealAllowance } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  const submitDesignationData = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("desigantion_name", designationName);
    newFormData.append("basic_salary", basicSalary);
    newFormData.append("transport", transport);
    newFormData.append("meal_allowance", mealAllowance);

    dispatch(createDataDepartment(newFormData, navigate))
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.msg) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: error.response.data.msg,
            confirmButtonText: "Ok",
          });
        } else if (error.message) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: error.message,
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      <Breadcrumb pageName="Form Jabatan" />

      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Data Jabatan
              </h3>
            </div>
            <form onSubmit={submitDesignationData}>
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                      required
                      placeholder="Masukkan uang makan"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 text-center md:flex-row">
                  <div>
                    <ButtonOne>
                      <span>Simpan</span>
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

export default FormAddDataDesignation;
