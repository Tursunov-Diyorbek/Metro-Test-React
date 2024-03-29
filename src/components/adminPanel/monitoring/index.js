import { Button, Form, Input, Select, Table, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.sass";
import { api } from "../../../api";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Loading from "../../loading/index";
import { useNavigate } from "react-router";
const { Option } = Select;

export default function Monitoring() {
  const [monitoringData, setMonitoringData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [position, setPosition] = useState([]);
  const [departmenID, setDepartmentID] = useState("");
  const [positionID, setPositionID] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [deleteName, setDeleteName] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const fetchData = async () => {
      try {
        const res = await api.get(
          `tester/testerMonitoring/${count}?name=${name}&departmentId=${departmenID}&positionId=${positionID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMonitoringData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    setLoading(false);
    setDeleteName(false);
  }, [count, departmenID, positionID, name, deleteName]);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const departmentFunction = async () => {
      try {
        const res = await api.get("department/allDepartments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDepartmentData(res?.data);
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/auth/login");
        }
      }
    };

    const positionFunction = async () => {
      try {
        const pos = await api.get("position", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosition(pos?.data);
      } catch (error) {
        console.log(error);
      }
    };

    departmentFunction();
    positionFunction();
  }, []);

  const handleInputChange = (e) => {
    const pos = departmentData.find((item) => item.id == e);

    setPosition(pos?.positions);
  };

  const confirm = async (id) => {
    try {
      await api.delete(`/tester/deleteTester/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      setDeleteName(true);
      message.success("Foydalanuvchi o'chirildi");
    } catch (error) {
      const errorMessage = error.message || "An error occurred";
      message.error(errorMessage);
    }
  };

  const cancel = (e) => {
    message.error("Bekor qilindi!");
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Familiya Ismi",
      dataIndex: "middleName",
      key: "middleName",
      render: (text, record) => (
        <span>{`${record.middleName} ${record.firstName}`}</span>
      ),
    },
    {
      title: "ID raqam",
      dataIndex: "idNumber",
      key: "idNumber",
    },
    {
      title: "Lavozimi",
      dataIndex: "position",
      key: "position",
      render: (text) => <span>{`${text.name}`}</span>,
    },
    {
      title: "Department",
      dataIndex: "position",
      key: "position",
      render: (text) => <span>{`${text.departmentName}`}</span>,
    },
    {
      title: "Variantlar",
      dataIndex: "idNumber",
      key: "idNumber",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className={styles.buton}>
            <button>Natijalarni {"ko'rish"}</button>
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

  const onFinish = (values) => {
    setLoading(true);
    setDepartmentID(values.gender || encodeURIComponent(departmenID));
    setPositionID(values.gender2 || encodeURIComponent(positionID));
    setName(values.username || encodeURIComponent(name));
    setCount(0);
  };

  return (
    <>
      {loading && <Loading />}
      <div className={styles.menu}>
        <Form onFinish={onFinish}>
          <Form.Item name="gender" className={styles.menu__info}>
            <Select
              placeholder="Department"
              allowClear
              onChange={handleInputChange}
            >
              {departmentData?.map((item, index) => {
                return (
                  <Option value={item.id} key={index}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item name="gender2" className={styles.menu__info}>
            <Select placeholder="Lavozim" allowClear>
              {position?.map((item, index) => {
                return (
                  <Option value={item.id} key={index}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item name="username" className={styles.menu__info}>
            <Input placeholder="Ism" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Qidirish
            </Button>
          </Form.Item>
        </Form>

        <Table
          dataSource={monitoringData?.data}
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
          {monitoringData.isFirstPage ? (
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
            {monitoringData.isFirstPage === true &&
            monitoringData.isLastPage === true
              ? ""
              : typeof monitoringData.currentPage === "number"
              ? monitoringData.currentPage + 1
              : ""}
          </span>

          {monitoringData.isLastPage ? (
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
    </>
  );
}
