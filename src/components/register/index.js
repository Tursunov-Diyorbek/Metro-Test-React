import { useEffect, useState } from "react";
import styles from "./index.module.sass";
import { api } from "../../api";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import Loading from "../loading/index";
import { Fade } from "react-awesome-reveal";

export default function RegisterPage() {
  const [departments, setDepartments] = useState([]);
  const [position, setPosition] = useState([]);
  const [password1, setPassword1] = useState(false);
  const [password2, setPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    idNumber: "",
    password: "",
    confirmPassword: "",
    departmentId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("department/allDepartments");
      setDepartments(res?.data);
    };
    fetchData();
  }, []);

  const [posSelect, setPosSelect] = useState({ positionId: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const pos = departments.find((item) => item.id == value);

    setPosition(pos?.positions);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setPosSelect((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.firstName.trim().length <= 0 ||
      formData.middleName.trim().length <= 0 ||
      formData.lastName.trim().length <= 0 ||
      formData.idNumber.trim().length <= 0 ||
      formData.password.trim().length <= 0 ||
      formData.confirmPassword.trim().length <= 0 ||
      formData.departmentId.trim().length <= 0 ||
      posSelect.positionId.trim().length <= 0
    ) {
      return toast.error("Malumotlar to'liq to'ldirilmadi!");
    }

    if (formData.password.length < 6 || formData.confirmPassword.length < 6) {
      return toast.warning("Parol 6 tadan kam!");
    } else if (formData.idNumber.length !== 5) {
      return toast.warning("ID raqam uzunligi 5ta bo'lishi kerak!");
    }

    setLoading(true);

    try {
      await api.post("api/v1/auth/register", {
        ...formData,
        ...posSelect,
      });
      navigate("/auth/login");
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loading />}
      <div className={styles.register}>
        <div className={styles.register__left}>
          <img src="/photo_2024-01-24_22-08-56 (2).jpg" alt="svg" />
        </div>

        <div className={styles.register__right}>
          <h1>{"Ro'yxatdan o'tish"}</h1>
          <div style={{ textAlign: "center" }}>
            <Fade delay={150}>
              <img src="/Sign up-rafiki.svg" alt="svg" />
            </Fade>
            <form onSubmit={handleSubmit}>
              <Fade delay={300}>
                <input
                  type="text"
                  placeholder="Familiya"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </Fade>

              <Fade delay={400}>
                <input
                  type="text"
                  placeholder="Ism"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </Fade>

              <Fade delay={500}>
                <input
                  type="text"
                  placeholder="Otangizni ismi"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </Fade>

              <Fade delay={600}>
                <input
                  type="number"
                  placeholder="ID raqam"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </Fade>

              <Fade delay={700}>
                <div className={styles.eye}>
                  <input
                    type={password1 ? "text" : "password"}
                    placeholder="Parol"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {password1 ? (
                    <IoEyeOutline
                      style={{
                        fontSize: 25,
                        paddingRight: 5,
                        cursor: "pointer",
                      }}
                      onClick={() => setPassword1(false)}
                    />
                  ) : (
                    <IoEyeOffOutline
                      style={{
                        fontSize: 25,
                        paddingRight: 5,
                        cursor: "pointer",
                      }}
                      onClick={() => setPassword1(true)}
                    />
                  )}
                </div>
              </Fade>

              <Fade delay={800}>
                <div className={styles.eye}>
                  <input
                    type={password2 ? "text" : "password"}
                    placeholder="Parolni tasdiqlash"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {password2 ? (
                    <IoEyeOutline
                      style={{
                        fontSize: 25,
                        paddingRight: 5,
                        cursor: "pointer",
                      }}
                      onClick={() => setPassword2(false)}
                    />
                  ) : (
                    <IoEyeOffOutline
                      style={{
                        fontSize: 25,
                        paddingRight: 5,
                        cursor: "pointer",
                      }}
                      onClick={() => setPassword2(true)}
                    />
                  )}
                </div>
              </Fade>

              <Fade delay={900}>
                <select
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleInputChange}
                >
                  <option value="" disabled hidden>
                    Department
                  </option>
                  {departments?.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </Fade>

              <Fade delay={1000}>
                <select
                  name="positionId"
                  value={posSelect.positionId}
                  onChange={handleSelectChange}
                >
                  <option value="" disabled hidden>
                    Lavozim
                  </option>
                  {position?.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </Fade>

              <Fade delay={1100}>
                <button type="submit">Tasdiqlash</button>
              </Fade>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
