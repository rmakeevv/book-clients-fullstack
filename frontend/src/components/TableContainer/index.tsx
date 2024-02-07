import React, { PropsWithChildren } from 'react';
import styles from './index.module.css';

const TableContainer = ({ children }: PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>;
};

export default TableContainer;
