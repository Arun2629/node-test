import React, {useState, useEffect} from 'react';
import { startRegisterUser } from '../actions/usersAction';
import { startFetchCountries, startFetchStates, startFetchCities } from '../actions/countriesAction';
import { useDispatch } from 'react-redux';
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
} from 'antd';
import {UploadOutlined} from '@ant-design/icons'

const Register = () => {
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [form] = Form.useForm();
  const dispatch = useDispatch()

  const { Option } = Select;

  const handleCountries = (data) => {
    setCountries(data)
  }

  const handleStates = (data) => {
    setStates(data)
  }

  const handleCities = (data) => {
    setCities(data)
  }

  const handleCountryChange = (country) => {
    dispatch(startFetchStates(country, handleStates))
  }

  const handleStateChange = (state) => {
    dispatch(startFetchCities(state, handleCities))
  }

  useEffect(() => {
    dispatch(startFetchCountries(handleCountries))
  })

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onFinish = (values) => {
    const formData = new FormData()
    for(const name in values){
        formData.append(name, values[name])
    }
    const resetFields = () => {
        form.resetFields()
    }
    dispatch(startRegisterUser(formData, resetFields))
  };

  return (
    <div className='register-container'>
      <h1>Registration</h1>
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
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

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="country"
        label="Country"
        rules={[
          {
            required: true,
            message: 'Please select country!',
          },
        ]}
      >
        <Select placeholder="Select Country " onChange={handleCountryChange}>
          <Option value="">Select</Option>
          {countries.map((ele, i) => {
            return <Option key={i} value={ele.country_name}>{ele.country_name}</Option>
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name="state"
        label="State"
        rules={[
          {
            required: true,
            message: 'Please select state!',
          },
        ]}
      >
        <Select placeholder="Select State" onChange={handleStateChange}>
          <Option value="">Select</Option>
          {states.map((ele,i) => {
            return <Option key={i} value={ele.state_name}>{ele.state_name}</Option>
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        rules={[
          {
            required: true,
            message: 'Please select your city!',
          },
        ]}
      >
        <Select placeholder="Select City">
          <Option value="">Select</Option>
          {cities.map((ele, i) => {
            return <Option key={i} value={ele.city_name}>{ele.city_name}</Option>
          })}
        </Select>
      </Form.Item>  

      <Form.Item
        name="description"
        label="Description"
        tooltip="Tell us more about yourself!!"
        rules={[
          {
            required: true,
            message: 'Hey fill me up please!!',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item
            name="image"
            label="Upload Image"
            getValueFromEvent={({file}) => file.originFileObj}
            
          >
            <Upload accept="image/png, image/jpeg, image/jpg"
                    maxCount={1}
                    listType="picture"
                    showUploadList={true}
                    customRequest={dummyRequest}
                    >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
  
  );
};
export default Register;