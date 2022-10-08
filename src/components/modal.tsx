import { Modal } from 'antd';

export default ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal title="Basic Modal" open={visible} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
    </Modal>
  );
};
