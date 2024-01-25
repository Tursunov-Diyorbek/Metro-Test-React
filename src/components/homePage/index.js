import React, { useState } from "react";
import { FaTelegram } from "react-icons/fa";
import Navbar from "../navbar";
import { Outlet } from "react-router";
import styles from "./index.module.sass"

export default function Home() {
  return (
    <>
      <Navbar />

      <div className={styles.containet}>
        <Outlet />
      </div>
    </>
  );
}
