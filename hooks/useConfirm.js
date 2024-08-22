import { useState, useCallback } from 'react';
import ConfirmPop from '../component/common/ConfirmPop';

const useConfirm = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [cancelText, setCancelText] = useState('확인');
  const [okText, setOkText] = useState('확인');
  const [onOk, setOnOk] = useState(() => () => {});
  const [onCancel, setOnCancel] = useState(() => () => {});

  const showAlert = (param) => {
    if (typeof param === 'string') {
      setMessage(param);
    }
    if (typeof param === 'object') {
      setTitle(param.title || '');
      setMessage(param.msg || '');
      setCancelText(param.cancelText || '아니요');
      setOkText(param.okText || '네');
      setOnOk(() => param.onOk || (() => {}));
      setOnCancel(() => param.onCancel || (() => {}));
    }

    setVisible(true);
  };

  const confirmAlert = useCallback(() => {
    setVisible(false);
    onOk();
  }, [onOk]);

  const cancelAlert = useCallback(() => {
    setVisible(false);
    onCancel();
  }, [onCancel]);

  const AlertComponent = () => (
    <ConfirmPop
      visible={visible}
      onOk={confirmAlert}
      onCancel={cancelAlert}
      title={title}
      message={message}
      okBtnText={okText}
      cancelBtnText={cancelText}
    />
  );

  return [showAlert, AlertComponent];
};

export default useConfirm;
