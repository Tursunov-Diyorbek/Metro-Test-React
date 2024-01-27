import { RiMenuFoldFill } from "react-icons/ri";
import { Drawer } from "antd";
import { useState } from "react";
import styles from "./index.module.sass";
import { useNavigate } from "react-router";
import { Fade } from "react-awesome-reveal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={styles.navbar}>
        <Fade triggerOnce={true} direction="left">
          <div className={styles.navbar__logo} onClick={() => navigate("/")}>
            <img src="/logo2.png" alt="logo" />
            <h2>Metro Test</h2>
          </div>
        </Fade>

        <Fade triggerOnce={true} direction="right">
          <div className={styles.navbar__auth}>
            <div className={styles.login}>
              <button
                onClick={() => {
                  navigate("/auth/login");
                }}
              >
                Kirish
              </button>
            </div>
            <div className={styles.register}>
              <button
                onClick={() => {
                  navigate("/auth/register");
                }}
              >
                Akkount ochish
              </button>
            </div>
          </div>
        </Fade>

        <Fade triggerOnce={true} direction="right" className={styles.drawer}>
          <RiMenuFoldFill
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={showDrawer}
          />
        </Fade>
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
      </Drawer>
    </>
  );
}
