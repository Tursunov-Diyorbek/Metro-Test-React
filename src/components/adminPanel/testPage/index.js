import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.sass";
import { LiaDownloadSolid } from "react-icons/lia";
import { api } from "../../../api";
const { Option } = Select;

export default function Test() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState([]);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Token");

      const res = await api.get("position", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosition(res?.data);
    };
    fetchData();
  }, []);

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem("Token");

      await api.post("test/addTest", values, {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }

    form.resetFields();
    setIsModalOpen(false);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <div className={styles.test}>
        <div className={styles.btn}>
          <button onClick={showModal}>Test {"to'plam qo'shish"}</button>
        </div>

        <div className={styles.test__cards}>
          <div className={styles.test__card}>1</div>
          <div className={styles.test__card}>2</div>
          <div className={styles.test__card}>3</div>
          <div className={styles.test__card}>4</div>
        </div>
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
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Json file kiritilmadi!",
              },
            ]}
          >
            <Upload
              name="file"
              // action="http://testprojectformetro-production-ad66.up.railway.app/test/addTest"
              listType="json"
              accept=".json"
            >
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
            <Select
              placeholder="Lavozim"
              // onChange={onGenderChange}
              allowClear
            >
              {position?.map((item, index) => {
                return (
                  <Option value={item.id} key={index}>
                    {item.name}
                  </Option>
                );
              })}
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
