import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { AliwangwangOutlined } from '@ant-design/icons';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
};

function Auth() {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const onFinish = async (values: any) => {
    try {
      const token = await axios.post('http://localhost:5000/user/auth', values);

      navigate('/');
      localStorage.setItem('token', token.data);
    } catch (e) {
      setIsError(true);
      console.log(e);
    }
  };

  return (
    <div className={styles.page}>
      <div style={{ paddingBottom: '10%' }}>
        <div className={styles.logo__container}>
          <AliwangwangOutlined className={styles.logo} />

          <span
            style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#0958d9',
              letterSpacing: '-1px',
            }}
          >
            booklist
          </span>
        </div>
        <Form
          name="basic"
          style={{ maxWidth: '400px' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Имя пользователя"
            name="username"
            rules={[{ required: true, message: 'Пожалуйста, укажите логин!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, укажите пароль!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="middle">
              Войти
            </Button>
          </Form.Item>
        </Form>
        {isError && (
          <span
            style={{ color: '#ff7875', fontSize: '14px', fontWeight: '300' }}
          >
            Пароль неверный!
          </span>
        )}
      </div>
    </div>
  );
}

export default Auth;
