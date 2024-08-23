import React from 'react';
import styles from './index.module.css';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { IHeader } from './types';
import { Logo } from 'components';

export default function Header({ logOut }: IHeader) {
    return (
        <div className={styles.container}>
            <Logo type={'small'} />
            <Button onClick={logOut} icon={<PoweroffOutlined />}>
                Выход
            </Button>
        </div>
    );
}
