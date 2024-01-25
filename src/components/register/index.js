import { useState } from "react";
import styles from "./index.module.sass";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    fatherName: "",
    idNumber: "",
    department1: "",
    department2: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form data:", formData);
  };
  return (
    <div className={styles.register}>
      <div className={styles.register__left}>
        <img src="/photo_2024-01-24_22-08-56 (2).jpg" alt="svg" />
      </div>

      <div className={styles.register__right}>
        <h1>{"Ro'yxatdan o'tish"}</h1>
        <div style={{ textAlign: "center" }}>
          <img src="/Sign up-rafiki.svg" alt="svg" />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Familiya"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Ism"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Otangizni ismi"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
            />
            <input
              type="number"
              placeholder="ID raqam"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
            />
            <select
              name="department1"
              value={formData.department1}
              onChange={handleInputChange}
            >
              <option value="" disabled hidden>
                Department
              </option>
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
              <option value="uk">United Kingdom</option>
            </select>

            <select
              name="department2"
              value={formData.department2}
              onChange={handleInputChange}
            >
              <option value="" disabled hidden>
                Department
              </option>
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
              <option value="uk">United Kingdom</option>
            </select>
            <button type="submit">Tasdiqlash</button>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
}
