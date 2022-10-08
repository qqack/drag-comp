import { InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import BasicModal from '../components/modal';
import styles from './drag.less';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <span
        id="ball1"
        className={styles.icon}
        tabIndex={1}
        onClick={() => {
          setVisible(true);
        }}
      >
        <InfoCircleOutlined style={{ fontSize: 20 }} />
      </span>
      <BasicModal visible={visible} setVisible={setVisible} />
    </>
  );
};
