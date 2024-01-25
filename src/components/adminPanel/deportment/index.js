import { Modal, Table } from "antd";
import { useState } from "react";
import styles from "./index.module.sass";

export default function Deportment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);

  const handleOk = () => setIsModalOpen(false);

  const handleCancel = () => setIsModalOpen(false);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Ismi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ro'yxatdan o'tgan sanasi",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "O'zgartirilgan sanasi",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Lavozimlar soni",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "variantlar",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <>
      <div className={styles.deportment}>
        <div className={styles.deportment__button}>
          <button onClick={showModal}>{"Qo'shish"}</button>
        </div>
        <Table dataSource={dataSource} columns={columns} />
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
