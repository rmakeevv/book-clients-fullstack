import React from 'react';
import styles from './index.module.css';
import { AliwangwangOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate('/auth');
  };

  return (
    <div className={styles.container}>
      <Space>
        <AliwangwangOutlined className={styles.logo} />

        <span
          style={{
            fontSize: '26px',
            fontWeight: '600',
            color: 'white',
            letterSpacing: '-1px',
          }}
        >
          booklist
        </span>
      </Space>
      <Button onClick={logOut} icon={<PoweroffOutlined />}>
        Выход
      </Button>
    </div>
  );
}
