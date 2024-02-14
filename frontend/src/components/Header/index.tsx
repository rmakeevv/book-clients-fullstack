import React from 'react';
import styles from './index.module.css';
import { AliwangwangOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { IHeader } from './types';

export default function Header({ logOut }: IHeader) {
  return (
    <div className={styles.container}>
      <Space>
        <AliwangwangOutlined className={styles.logo} />

        <span className={styles.logo__text}>booklist</span>
      </Space>
      <Button onClick={logOut} icon={<PoweroffOutlined />}>
        Выход
      </Button>
    </div>
  );
}
