import React, { useState } from "react";
import styles from "./index.module.sass";
import { FaTelegram } from "react-icons/fa";
import Navbar from "../navbar";
import { Fade } from "react-awesome-reveal";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className={styles.img}>
        <img src="/Alisher Navoiy 1.jpeg" alt="img" />
        <div className={styles.img__filter}></div>
        <Fade triggerOnce={true} delay={150}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>
              Metropoliten xodimlari malakasini baholash tizimiga xush kelibsiz
            </h2>
          </div>
        </Fade>
      </div>
      <div className={styles.footer}>
        <Fade triggerOnce={true} direction="left">
          <h3>MetroTest</h3>
        </Fade>
        <Fade triggerOnce={true} direction="right">
          <a href="https://t.me/Feyzr_554" target="_tblank">
            <FaTelegram /> {"Biz bilan bo'glanish"}
          </a>
        </Fade>
      </div>
    </>
  );
}
