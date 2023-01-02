import React from 'react'
import {
  Button,
  Form,
  Input,
} from 'antd';

const UserDataEditForm = (props) => {
    const {data, formSubmit} = props
    const [form] = Form.useForm();
    
      const onFinish = (values) => {
        const formData = {
            name: values.name,
            username: values.username,
            mobile: values.mobile
        }
        const resetFields = () => {
            form.resetFields()
          }

          formSubmit(formData, resetFields)
      };
    

    return (
        <div>
            <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        name: data.name,
        username: data.username,
        mobile: data.mobile
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input your Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="mobile"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="username"
        label="E-mail id/Username"
        rules={[
          {
            required: true,
            message: 'Required',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div>
    )
}

export default UserDataEditForm