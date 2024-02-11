import React from 'react';
import styles from './index.module.css';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear()
    navigate('/auth')
  }

  return (
    <div className={styles.container}>
      <DoubleRightOutlined style={{ color: 'wheat' }} />
      <Button onClick={logOut}>Logout</Button>
    </div>
  );
}
