import { useCallback, useContext } from 'react';

const useLogin = () => {
  // const context = useContext(WebViewContext);

  const logout = useCallback(() => {}, []);

  return {
    logout,
  };
};

export default useLogin;
