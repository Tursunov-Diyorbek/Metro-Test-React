import React, { useState } from "react";
import styles from "./index.module.sass";
import { FaTelegram } from "react-icons/fa";
import Navbar from "../navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className={styles.img}>
        <img src="/Alisher Navoiy 1.jpeg" alt="img" />
        <div className={styles.img__filter}></div>
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
      </div>
      <div className={styles.footer}>
        <h3>MetroTest</h3>
        <a href="https://t.me/Feyzr_554" target="_tblank">
          <FaTelegram /> {"Biz bilan bo'glanish"}
        </a>
      </div>
    </>
  );
}
