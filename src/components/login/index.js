import { useState } from "react";
import { api } from "../../api";
import styles from "./index.module.sass";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("api/v1/auth/login", {
        email: username,
        password: password,
      });
      console.log("Login successful:", res.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
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
              placeholder="Username & Email"
            />
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button>Kirish</button>
          </form>
        </div>

        <button>Akkount ochish</button>
      </div>
      <div className={styles.login__right}>
        <img src="/photo_2024-01-24_22-08-56.jpg" alt="img" />
      </div>
    </div>
  );
}
