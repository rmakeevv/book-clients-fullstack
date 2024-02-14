import styles from './index.module.css';
import { AliwangwangOutlined } from '@ant-design/icons';
import { UseAuthForm } from 'hooks/UseAuthForm';
import React, { useContext } from 'react';
import { AuthForm } from 'components';
import { UserContext } from 'router/AuthProvider';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

function Auth() {
  const { setIsLogged } = useContext(UserContext);
  const { onFinish, isError } = UseAuthForm(setIsLogged);

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
        <AuthForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
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
