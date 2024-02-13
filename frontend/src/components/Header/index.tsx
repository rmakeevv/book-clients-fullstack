import React from 'react';
import styles from './index.module.css';
import { AliwangwangOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

interface IHeader {
  logOut: () => void;
}

export default function Header({ logOut }: IHeader) {
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
