import { useState } from "react";
import { Route, Routes } from "react-router";
import HomePage from "../components/homePage";
import LoginPage from "../components/login";
import styles from "./index.module.sass";
import "./App.css";
import TestWork from "../components/test-work";

function App() {
  const [logo, setLogo] = useState(true);

  setTimeout(() => {
    setLogo(false);
  }, 2000);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            logo ? (
              <div className={styles.animeLogo}>
                <img src="/logo2.png" alt="logo" />
              </div>
            ) : (
              <HomePage />
            )
          }
        />

        <Route path="test-work/:id" element={<TestWork />} />

        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="auth/register" element={<RegisterPage />} />
        <Route path="admin-panel" element={<AdminPanel />}>
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="statistika" element={<Statistika />} />
          <Route path="deportment" element={<Deportment />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
