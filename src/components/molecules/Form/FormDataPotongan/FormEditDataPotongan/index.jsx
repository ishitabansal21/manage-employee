import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import Layout from "../../../../../layout";
import { Breadcrumb, ButtonOne, ButtonTwo } from "../../../../../components";
import { getMe } from "../../../../../config/redux/action";

const FormEditDataCut = () => {
  const [cuts, setPotongan] = useState("");
  const [jmlPotongan, setJmlPotongan] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, user } = useSelector((state) => state.auth);

  const updateCutData = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("cuts", cuts);
      formData.append("jml_potongan", jmlPotongan);

      const response = await axios.patch(
        `http://localhost:5000/data_potongan/update/${id}`,
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
      navigate("/data-slice");
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
    const getDataById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/data_potongan/${id}`
        );
        setPotongan(response.data.cuts);
        setJmlPotongan(response.data.jml_potongan);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getDataById();
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
      <Breadcrumb pageName="Form Edit Data Potongan" />

      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Edit Data Potongan
              </h3>
            </div>
            <form onSubmit={updateCutData}>
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
                      onChange={(e) => setPotongan(e.target.value)}
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
                      onChange={(e) => setJmlPotongan(e.target.value)}
                      required
                      placeholder="Masukkan jumlah cuts"
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

export default FormEditDataCut;
