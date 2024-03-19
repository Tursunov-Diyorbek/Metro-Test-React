import { useContext, useEffect, useState } from "react";
import { TestId } from "../../../context/context";
import styles from "./index.module.sass";
import { api } from "../../../api";
import { useNavigate } from "react-router";
import { message, Modal, Popconfirm, Table } from "antd";

export default function Tests() {
  const { testId } = useContext(TestId);
  const [tests, setTests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => setIsModalOpen(false);

  const handleCancel = () => setIsModalOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const fetchPositions = async () => {
      try {
        const response = await api.get(`test/getTests/${testId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTests(response?.data);
      } catch (error) {
        // if (error.response?.status === 401) {
        //   localStorage.clear();
        //   navigate("/auth/login");
        // }
      }
    };

    fetchPositions();
  }, []);

  const confirm = async (id) => {
    // try {
    //   await api.delete(`/tester/deleteTester/${id}`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("Token")}`,
    //     },
    //   });
    //   setDeleteName(true);
    //   message.success("Foydalanuvchi o'chirildi");
    // } catch (error) {
    //   const errorMessage = error.message || "An error occurred";
    //   message.error(errorMessage);
    // }
  };
  const cancel = (e) => {
    message.error("Bekor qilindi!");
  };

  const columns = [
    {
      title: <div style={{ fontSize: "13px" }}>#</div>,
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: <div style={{ fontSize: "13px" }}>Nomi</div>,
      dataIndex: "title",
      key: "title",
    },
    {
      title: <div style={{ fontSize: "13px" }}>1 - variant</div>,
      dataIndex: "variantFirst",
      key: "variantFirst",
    },
    {
      title: <div style={{ fontSize: "13px" }}>2 - variant</div>,
      dataIndex: "variantSecond",
      key: "variantSecond",
    },
    {
      title: <div style={{ fontSize: "13px" }}>3 - variant</div>,
      dataIndex: "variantThird",
      key: "variantThird",
    },
    {
      title: <div style={{ fontSize: "13px" }}>4 - variant</div>,
      dataIndex: "variantFourth",
      key: "variantFourth",
    },
    {
      title: <div style={{ fontSize: "13px" }}>{"To'g'ri variant"}</div>,
      dataIndex: "variantTrue",
      key: "variantTrue",
    },
    {
      title: <div style={{ fontSize: "13px" }}>Kodi</div>,
      dataIndex: "code",
      key: "code",
    },
    {
      title: <div style={{ fontSize: "13px" }}>variantlar</div>,
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className={styles.buton}>
            <button>{"O'zgartirish"}</button>
          </div>
          <div className={styles.buton}>
            <Popconfirm
              title="O'chirish"
              description={`Siz ${record.idNumber} ID raqamli foydalanuvchini o'chirmoqchimisiz?`}
              onConfirm={() => confirm(record.id)}
              onCancel={cancel}
              okText="xa"
              cancelText="Yo'q"
            >
              <button>{"O'chirish"}</button>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={styles.allTest}>
        <div className={styles.btn}>
          <button onClick={showModal}>{"Qo'shish"}</button>
        </div>
        <Table
          style={{ padding: "50px 0" }}
          dataSource={tests}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
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
