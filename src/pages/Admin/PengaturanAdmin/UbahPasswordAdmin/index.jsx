import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../../layout";
import Swal from "sweetalert2";
import { Breadcrumb, ButtonOne } from "../../../../components";
import { TfiLock } from "react-icons/tfi";
import { changePassword, getMe } from "../../../../config/redux/action";

const ChangePasswordAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const { isError, user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confPassword) {
      try {
        dispatch(changePassword(password, confPassword));
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Password Success di Perbarui",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response?.data?.msg || "Terjadi kesalahan",
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Password dan Confirmation Password No Cocok",
        confirmButtonText: "Ok",
        timer: 1500,
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
      <Breadcrumb pageName="Form Ganti Password" />

      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Ganti Password
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 ">
                  <div className="mb-4 w-full">
                    <label className="mb-4 block text-black dark:text-white">
                      Password Baru <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Masukkan password baru"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="mb-4 block text-black dark:text-white">
                      Ulangi Password Baru{" "}
                      <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Masukkan ulangi password baru"
                      value={confPassword}
                      required
                      onChange={(e) => setConfPassword(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <TfiLock className="absolute right-4 top-4 text-xl" />
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 text-center md:flex-row">
                  <ButtonOne type="submit">
                    <span>Perbarui Password</span>
                  </ButtonOne>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePasswordAdmin;
