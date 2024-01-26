import { useState } from "react";
import { api } from "../../api";
import styles from "./index.module.sass";
import { useNavigate } from "react-router";
import Loading from "../loading/index";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordEye, setPasswordEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      return toast.error("Malumotlar to'liq to'ldirilmadi!");
    }

    if (password.length < 6) {
      return toast.warning("Parol 6 tadan kam!");
    }
    setLoading(true);

    try {
      const res = await api.post("api/v1/auth/login", {
        email: username,
        password: password,
      });
      localStorage.setItem("Token", res.data.token.token);
      localStorage.setItem("UserType", res.data.userType);
      if (
        res.data.userType === "ADMIN" ||
        res.data.userType === "SUPER_ADMIN"
      ) {
        navigate("/admin-panel/monitoring");
      } else {
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loading />}
      <div className={styles.login}>
        <div className={styles.login__left}>
          <h1>Xush kelibsiz</h1>

          <div>
            <img src="/Exams-pana.svg" alt="svg" />
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ID raqam & Email"
                className={styles.input}
              />
              <div className={styles.eye}>
                <input
                  type={passwordEye ? "text" : "password"}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                {passwordEye ? (
                  <IoEyeOutline
                    style={{ fontSize: 25, paddingRight: 5, cursor: "pointer" }}
                    onClick={() => setPasswordEye(false)}
                  />
                ) : (
                  <IoEyeOffOutline
                    style={{ fontSize: 25, paddingRight: 5, cursor: "pointer" }}
                    onClick={() => setPasswordEye(true)}
                  />
                )}
              </div>
              <button>Kirish</button>
            </form>
          </div>

          <button onClick={() => navigate("/auth/register")}>
            Akkount ochish
          </button>
        </div>
        <div className={styles.login__right}>
          <img src="/photo_2024-01-24_22-08-56.jpg" alt="img" />
        </div>
      </div>
    </>
  );
}
