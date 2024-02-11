import React from 'react';
import styles from './index.module.css';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear()
    navigate('/auth')
  }

  return (
    <div className={styles.container}>
      <Space>
      <DoubleRightOutlined style={{ color: 'white' }} />
      <span style={{fontSize: '16px', fontWeight: '600', color: 'white'}}>
      BOOKLIST
      </span>
      
      </Space>
      <Button onClick={logOut}>Logout</Button>
    </div>
  );
}
