import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../../../layout";
import Swal from "sweetalert2";
import { Breadcrumb, ButtonOne, ButtonTwo } from "../../../../../components";
import { createCutData, getMe } from "../../../../../config/redux/action";

const FormAddDataCut = () => {
  const [formData, setFormData] = useState({
    cuts: "",
    jmlPotongan: "",
  });

  const { cuts, jmlPotongan } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  const submitDataPotongan = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("cuts", cuts);
    newFormData.append("jml_potongan", jmlPotongan);

    dispatch(createCutData(newFormData, navigate))
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
      <Breadcrumb pageName="Form Data Potongan" />

      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Data Potongan
              </h3>
            </div>
            <form onSubmit={submitDataPotongan}>
              <div className="p-6.5">
                <div className="mb-4.5 ">
                  <div className="mb-4 w-full">
                    <label className="mb-4 block text-black dark:text-white">
                      Potongan <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="cuts"
                      name="cuts"
                      value={cuts}
                      onChange={handleChange}
                      required={true}
                      placeholder="Masukkan cuts"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4 w-full">
                    <label className="mb-4 block text-black dark:text-white">
                      Jumlah Potongan <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="jmlPotongan"
                      name="jmlPotongan"
                      value={jmlPotongan}
                      onChange={handleChange}
                      required
                      placeholder="Masukkan jumlah cuts"
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
                  <Link to="/data-slice">
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

export default FormAddDataCut;
