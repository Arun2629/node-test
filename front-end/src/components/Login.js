import React from 'react'
import { useDispatch } from 'react-redux';
import { startLoginUser } from '../actions/usersAction';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {  Button, Form, Input } from 'antd';

const Login = (props) => {
    
    const dispatch = useDispatch()

    const redirectHome = () => {
        props.history.push('/home')
    }

    const onFinish = values => {
            const formData = {
                username: values.username,
                password: values.password
            }
            dispatch(startLoginUser(formData, redirectHome))
      
        }
   
   

    return (
        
        <div className='login-container'>
            <h2><strong>Login</strong></h2>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    username: '',
                    password: ''
                }}
                onFinish={onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username'
                    }
                    
                    ]}
                    hasFeedback
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    {min: 8},
                    {max:16}
                    ]}
                    hasFeedback
                >
                    <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" block htmlType="submit" className="login-form-button" >
                    Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
       
    )
}

export default Login