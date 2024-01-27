import { Button, Form, Input, Select, Table } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.sass";
import { api } from "../../../api";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Loading from "../../loading/index";
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

  console.log(monitoringData);

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
  }, [count, departmenID, positionID, name]);

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
      dataIndex: "someKey",
      key: "someKey",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className={styles.buton}>
            <button>Natijalarni {"ko'rish"}</button>
          </div>
          <div className={styles.buton}>
            <button>{"O'chirish"}</button>
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
            {typeof monitoringData.currentPage === "number"
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
