import { Modal, Table } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.sass";
import { api } from "../../../api";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../loading/index";

export default function Deportment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [positionMOdal, setPositionMOdal] = useState(false);
  const [deportmentData, setDeportmentData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [positionADD, setPositionADD] = useState("");
  const [deportmentADD, setDeportmentADD] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [deportmentEdit, setDeportmentEdit] = useState([]);
  const [deportmentOnchange, setDeportmentOnchange] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const fetchData = async () => {
      try {
        const res = await api.get(`department/allDepartments/${count}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDeportmentData(res?.data);
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/auth/login");
        }
      }
    };
    fetchData();
    setRefresh(false);
    setLoading(false);
  }, [refresh, refresh, count]);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const showPosModal = (e) => {
    const pos = deportmentData?.data.find((item) => item.id == e);

    setPositionData(pos);

    setPositionMOdal(true);
  };

  const handlePos = () => setPositionMOdal(false);
  const handlePosCancel = () => setPositionMOdal(false);

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
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div
          style={{
            fontWeight: "700",
          }}
        >
          {deportmentEdit.includes(record.id) ? (
            <input
              type="text"
              defaultValue={text}
              style={{
                width: "100%",
                border: "1px solid gray",
                padding: "5px 10px",
                borderRadius: "5px",
                outline: "none",
              }}
              onChange={(e) => {
                setDeportmentOnchange(e.target.value);
              }}
            />
          ) : (
            <span>{text}</span>
          )}
        </div>
      ),
    },
    {
      title: <div style={{ fontSize: "13px" }}>Lavozimlar soni</div>,
      dataIndex: "positions",
      key: "positions",
      render: (text, record) => <span>{text.length} ta lavozim mavjud</span>,
    },
    {
      title: (
        <div style={{ fontSize: "13px", width: "150px" }}>
          Ro'yxatdan o'tgan sanasi
        </div>
      ),
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: (
        <div style={{ fontSize: "13px", width: "130px" }}>
          O'zgartirilgan sanasi
        </div>
      ),
      dataIndex: "updatedDate",
      key: "updatedDate",
    },
    {
      title: <div style={{ fontSize: "13px" }}>variantlar</div>,
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className={styles.buton} onClick={() => showPosModal(record.id)}>
            <button>{"Lavozimlarni ko'rish"}</button>
          </div>
          <div className={styles.buton}>
            <button onClick={() => toggleVisibility(record.id)}>
              {deportmentEdit.includes(record.id)
                ? "Tasdiqlash"
                : "O'zgartirish"}
            </button>
          </div>
        </div>
      ),
    },
  ];

  const deportmentAdd = async () => {
    const token = localStorage.getItem("Token");

    try {
      await api.post(
        "department/addDepartment",
        {
          name: deportmentADD,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Deportment muvaffaqiyatli qo'shildi");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400)
        return toast.success(error.data.messages);
    }
    setIsModalOpen(false);
    setRefresh(true);
    setDeportmentADD("");
  };

  const positionAdd = async (id) => {
    if (positionADD.trim().length <= 0) return;
    const token = localStorage.getItem("Token");

    try {
      await api.post(
        `position/addPositionToDepartment/${id}`,
        {
          name: positionADD,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Lavozim muvaffaqiyatli qo'shildi");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400)
        return toast.error(error.response.data.message);
    }
    setRefresh(true);
    setPositionMOdal(false);
    setPositionADD("");
  };

  const toggleVisibility = (id) => {
    const token = localStorage.getItem("Token");

    const departmentEdit = async () => {
      try {
        await api.patch(
          "department/updateName",
          {
            departmentId: id,
            newName: deportmentOnchange,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Deportment muvaffaqiyatli o'zgartirildi");
        setRefresh(true);
      } catch (error) {
        if (error.response?.status === 400 || error.response?.status === 404)
          return toast.error(error.response.data.message);
      }
    };

    setDeportmentEdit((prev) => {
      if (prev.includes(id)) {
        departmentEdit();
        return prev.filter((recordId) => recordId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loading />}
      <div className={styles.deportment}>
        <div className={styles.deportment__button}>
          <button onClick={showModal}>{"Qo'shish"}</button>
        </div>
        <Table
          dataSource={deportmentData?.data}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "10px",
            gap: "10px",
          }}
        >
          {deportmentData.isFirstPage ? (
            ""
          ) : (
            <div className={styles.btn}>
              <button
                onClick={() => {
                  setLoading(true);
                  setCount((prev) => prev - 1);
                }}
              >
                <FaArrowLeftLong style={{ fontSize: "13px" }} />
              </button>
            </div>
          )}

          <span style={{ fontSize: "13px" }}>
            {deportmentData.isFirstPage === true &&
            deportmentData.isLastPage === true
              ? ""
              : typeof deportmentData.currentPage === "number"
              ? deportmentData.currentPage + 1
              : ""}
          </span>

          {deportmentData.isLastPage ? (
            ""
          ) : (
            <div className={styles.btn}>
              <button
                onClick={() => {
                  setLoading(true);
                  setCount((prev) => prev + 1);
                }}
              >
                <FaArrowRightLong style={{ fontSize: "13px" }} />
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Department qo'shish"
        open={isModalOpen}
        onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            style={{
              width: "82%",
              padding: "3px 10px",
              border: "1px solid gray",
              outline: "none",
              borderRadius: "5px",
            }}
            value={deportmentADD}
            onChange={(e) => setDeportmentADD(e.target.value)}
          />
          <div className={styles.buton}>
            <button onClick={deportmentAdd}>{"Qo'shish"}</button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Lavozimlar"
        open={positionMOdal}
        onOk={handlePos}
        onCancel={handlePosCancel}
        footer={false}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 0",
          }}
        >
          <input
            type="text"
            placeholder="Lavozim qo'shish"
            style={{
              width: "82%",
              padding: "3px 10px",
              border: "1px solid gray",
              outline: "none",
              borderRadius: "5px",
            }}
            value={positionADD}
            onChange={(e) => setPositionADD(e.target.value)}
          />
          <div className={styles.buton}>
            <button onClick={() => positionAdd(positionData.id)}>
              {"Qo'shish"}
            </button>
          </div>
        </div>
        {positionData?.positions?.map((item, index) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid gray",
              padding: "10px 0",
            }}
            key={index}
          >
            <input
              type="text"
              key={item.name}
              value={item.name}
              style={{
                width: "80%",
                border: "none",
                outline: "none",
              }}
              // onChange={(e) => setPosEdit(e.target.value)}
              readOnly={true}
            />
            <div className={styles.buton}>
              <button>{"o'zgartirish"}</button>
            </div>
          </div>
        ))}
      </Modal>
    </>
  );
}
