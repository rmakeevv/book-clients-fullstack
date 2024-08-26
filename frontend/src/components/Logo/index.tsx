import { AliwangwangOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React, { useMemo } from 'react';
import styles from './index.module.css';

interface ILogo {
    type: 'middle' | 'small';
}

const LogoClassName = {
    ['middle']: { icon: 'icon', text: 'text' },
    ['small']: { icon: 'small__icon', text: 'small__text' },
};

const Logo = ({ type = 'small' }: ILogo) => {
    const classNameList = useMemo(() => LogoClassName[type], [type]);

    return (
        <Space>
            <AliwangwangOutlined className={styles[classNameList.icon]} />

            <span className={styles[classNameList.text]}>booklist</span>
        </Space>
    );
};

export default Logo;
