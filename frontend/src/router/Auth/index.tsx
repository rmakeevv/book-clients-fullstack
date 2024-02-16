import styles from './index.module.css';
import { UseAuthForm } from 'hooks';
import { AuthForm, Logo } from 'components';
import React from 'react';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

function Auth() {
  const { onFinish, isError } = UseAuthForm();

  return (
    <div className={styles.page}>
      <div>
        <Logo type={'middle'} />
        <AuthForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
        {isError && (
          <span className={styles.error}>Пароль и(или) логин неверный!</span>
        )}
      </div>
    </div>
  );
}

export default Auth;
