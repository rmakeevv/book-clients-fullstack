import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
};

function Auth() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const token = await axios.post('http://localhost:5000/user/auth', values);
      console.log(token);
      navigate('/');
      localStorage.setItem('token', token.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <Form
        name="basic"
       
        style={{ width: '400px' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout='vertical'
      >
        <Form.Item<FieldType>
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Auth;
