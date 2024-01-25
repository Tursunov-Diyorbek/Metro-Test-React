import { RiMenuFoldFill } from "react-icons/ri";
import { Drawer } from "antd";
import { useState } from "react";
import styles from "./index.module.sass";
import Loading from "../loading/index";
import { useNavigate } from "react-router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  if (loading) return <loading />;

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navbar__logo} onClick={() => navigate("/")}>
          <img src="/logo2.png" alt="logo" />
          <h2>Metro Test</h2>
        </div>
        <div className={styles.navbar__auth}>
          <div className={styles.login}>
            <button
              onClick={() => {
                navigate("/auth/login");
                setLoading(true);
              }}
            >
              Kirish
            </button>
          </div>
          <div className={styles.register}>
            <button
              onClick={() => {
                navigate("/auth/register");
                setLoading(true);
              }}
            >
              Akkount ochish
            </button>
          </div>
        </div>
        <div className={styles.drawer}>
          <RiMenuFoldFill
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={showDrawer}
          />
        </div>
      </div>

      <Drawer
        onClose={onClose}
        open={open}
        width={200}
        closable={false}
        bodyStyle={{ padding: 10 }}
      >
        <div className={styles.btn}>
          <button onClick={() => navigate("/auth/login")}>Kirish</button>
        </div>
        <div className={styles.btn}>
          <button onClick={() => navigate("/auth/register")}>
            Akkount ochish
          </button>
        </div>
        <div className={styles.btn}>
          <button style={{ backgroundColor: "red" }}>Chiqish</button>
        </div>
      </Drawer>
    </>
  );
}
