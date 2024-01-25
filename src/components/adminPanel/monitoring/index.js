import { Button, DatePicker, Form, Input, Select } from "antd";
import styles from "./index.module.sass";
const { Option } = Select;

export default function Monitoring() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <>
      <div className={styles.menu}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="gender"
            rules={[
              {
                required: true,
              },
            ]}
            className={styles.menu__info}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="gender2"
            rules={[
              {
                required: true,
              },
            ]}
            className={styles.menu__info}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="DatePicker"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
            className={styles.menu__info}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="DatePicker2"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
            className={styles.menu__info}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
            className={styles.menu__info}
          >
            <Input placeholder="Ism" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Qidirish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
