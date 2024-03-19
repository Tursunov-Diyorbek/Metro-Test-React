import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import HomePage from "../components/homePage";
import LoginPage from "../components/login";
import styles from "./index.module.sass";
import RegisterPage from "../components/register";
import AdminPanel from "../components/adminPanel";
import Monitoring from "../components/adminPanel/monitoring";
import Statistika from "../components/adminPanel/statistika";
import Deportment from "../components/adminPanel/deportment";
import Test from "../components/adminPanel/testPage";
import TestWork from "../components/test-work";
import Tests from "../components/adminPanel/testsCategory";
import { TestId } from "../context/context";
import "./App.css";

function App() {
  const [logo, setLogo] = useState(true);
  const [testId, setTestId] = useState("");
  const pathname = useLocation();
  const navigate = useNavigate();

  setTimeout(() => {
    setLogo(false);
  }, 2000);

  useEffect(() => {
    const userType = localStorage.getItem("UserType");

    if (userType === "ADMIN" || userType === "SUPER_ADMIN")
      return navigate("/admin-panel/monitoring");

    if (pathname.pathname === "/admin-panel")
      return navigate("/admin-panel/monitoring");
  }, []);

  return (
    <div>
      <TestId.Provider value={{ testId, setTestId }}>
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
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/register" element={<RegisterPage />} />
          <Route path="admin-panel" element={<AdminPanel />}>
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="statistika" element={<Statistika />} />
            <Route path="deportment" element={<Deportment />} />
            <Route path="test" element={<Test />} />
            <Route path="test/tests" element={<Tests />} />
          </Route>
        </Routes>
      </TestId.Provider>
    </div>
  );
}

export default App;
