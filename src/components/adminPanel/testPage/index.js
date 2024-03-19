import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useContext, useEffect, useState } from "react";
import styles from "./index.module.sass";
import { LiaDownloadSolid } from "react-icons/lia";
import { api } from "../../../api";
import { useNavigate } from "react-router";
import { TestId } from "../../../context/context";
const { Option } = Select;

export default function Test() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState([]);
  const [allTest, setAllTest] = useState([]);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const { testId, setTestId } = useContext(TestId);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const fetchPositions = async () => {
      try {
        const response = await api.get("position", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosition(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    const test = async () => {
      try {
        const response = await api.get("test/getAllMainTest", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllTest(response?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPositions();
    test();
    setRefresh(false);
  }, [refresh]);

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        console.error("Authentication token is missing");
        return;
      }

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("file", values.file[0].originFileObj);
      formData.append("positionName", values.position);

      const response = await api.post("test/addTest", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.error("Unauthorized request");
        return;
      }

      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding test:", error);
    }
    setRefresh(true);
  };

  return (
    <>
      <div className={styles.test}>
        <div className={styles.btn}>
          <button onClick={showModal}>Test {"to'plam qo'shish"}</button>
        </div>

        {loading ? (
          <div
            style={{ textAlign: "center", fontWeight: "900", marginTop: 100 }}
          >
            Loading...
          </div>
        ) : (
          <div className={styles.test__cards}>
            {allTest?.map((item, index) => {
              return (
                <div
                  className={styles.test__card}
                  key={index}
                  onClick={() => {
                    setTestId(item.id);
                    navigate("/admin-panel/test/tests");
                  }}
                >
                  <img src="/logo2.png" alt="logo" />
                  <p>{item.name}</p>
                  <hr />
                  <p>{item.positionName}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Modal
        title="Test qo'shish"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form onFinish={onFinish} encType="multipart/form-data" form={form}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Test to'plami nomi kiritilmadi!",
              },
            ]}
          >
            <Input placeholder="Test to'plami nomi" />
          </Form.Item>

          <Form.Item
            name="file"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[
              {
                required: true,
                message: "Json file kiritilmadi!",
              },
            ]}
          >
            <Upload name="file" listType="json" accept=".json">
              <Button icon={<LiaDownloadSolid />}>Json file joylash</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="position"
            rules={[
              {
                required: true,
                message: "Lavozim tanlanmadi!",
              },
            ]}
          >
            <Select placeholder="Lavozim" allowClear>
              {position?.map((item, index) => (
                <Option value={item.name} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              margin: 0,
            }}
          >
            <Button type="primary" htmlType="submit">
              {"Qo'shish"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
