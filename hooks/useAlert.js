import { useState, useCallback } from 'react';
import AlertPop from '../component/common/AlertPop';

const useAlert = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [okText, setOkText] = useState('확인');
  const [onOk, setOnOk] = useState(() => () => {});

  const showAlert = (param) => {
    if (typeof param === 'string') {
      setMessage(param);
    }
    if (typeof param === 'object') {
      setTitle(param.title || '');
      setMessage(param.msg || '');
      setOkText(param.okText || '확인');
      setOnOk(() => param.onOk || (() => {}));
    }

    setVisible(true);
  };

  const hideAlert = useCallback(() => {
    setVisible(false);
    onOk();
  }, [onOk]);

  const AlertComponent = () => (
    <AlertPop
      visible={visible}
      onClose={hideAlert}
      title={title}
      message={message}
      buttonText={okText}
    />
  );

  return [showAlert, AlertComponent];
};

export default useAlert;
