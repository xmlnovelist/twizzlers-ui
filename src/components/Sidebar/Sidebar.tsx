import React from 'react';
import styles from './Sidebar.module.scss';

type Props = {};

const Sidebar: React.FC<Props> = (props) => {
  return (
    <div className={styles.sidebar}></div>
  );
}

export default Sidebar;
