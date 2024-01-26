import { Modal } from "antd";
import { useState } from "react";
import styles from "./index.module.sass";

export default function Test() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <div className={styles.test}>
        <div className={styles.btn}>
          <button onClick={showModal}>Test {"to'mlam qo'shish"}</button>
        </div>

        <div className={styles.test__cards}>
          <div className={styles.test__card}>1</div>
          <div className={styles.test__card}>2</div>
          <div className={styles.test__card}>3</div>
          <div className={styles.test__card}>4</div>
        </div>
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
