import styles from "./index.module.sass";
import { PiUserCircleLight } from "react-icons/pi";
import { Outlet, useNavigate, useLocation } from "react-router";

export default function AdminPanel() {
  const pathname = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div style={{ boxShadow: "1px 3px 8px 0px rgba(66, 67, 67, 0.2)" }}>
        <div className={styles.navbar}>
          <div className={styles.navbar__logo} onClick={() => navigate("/")}>
            <img src="/logo2.png" alt="logo" />
            <h2>Metro Test</h2>
          </div>
          <ul className={styles.navbar__ul}>
            <li
              style={{
                color:
                  pathname.pathname === "/admin-panel/monitoring"
                    ? "#3b6fb0"
                    : "black",
              }}
              onClick={() => navigate("/admin-panel/monitoring")}
            >
              Monitoring
            </li>
            <li
              style={{
                color:
                  pathname.pathname === "/admin-panel/statistika"
                    ? "#3b6fb0"
                    : "black",
              }}
              onClick={() => navigate("/admin-panel/statistika")}
            >
              Statistika
            </li>
            <li
              style={{
                color:
                  pathname.pathname === "/admin-panel/deportment"
                    ? "#3b6fb0"
                    : "black",
              }}
              onClick={() => navigate("/admin-panel/deportment")}
            >
              Department
            </li>
            <li
              style={{
                color:
                  pathname.pathname === "/admin-panel/test" ||
                  pathname.pathname === "/admin-panel/test/tests"
                    ? "#3b6fb0"
                    : "black",
              }}
              onClick={() => navigate("/admin-panel/test")}
            >
              Test
            </li>
          </ul>
          <PiUserCircleLight style={{ fontSize: 25, cursor: "pointer" }} />
        </div>
      </div>
      <Outlet />
    </>
  );
}
