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
      <div>
        <div className={styles.logo__container}>
          <AliwangwangOutlined className={styles.logo} />

          <span className={styles.logo__text}>booklist</span>
        </div>
        <AuthForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
        {isError && (
          <span className={styles.error}>Пароль и(или) логин неверный!</span>
        )}
      </div>
    </div>
  );
}

export default Auth;
