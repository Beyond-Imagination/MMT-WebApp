import { useEffect, useState } from 'react';
import * as React from 'react';
import callAPI from '../../helpers/apiCaller';
import useStorage from '../../hooks/useStorage';

export default function Auth() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const doLogin = () => {
      const accessToken = useStorage().localStorage.getItem('KAKAO_ACCESS_TOKEN');
      callAPI('post', '/api/users/login', { access_token: accessToken })
        .then(() => setAuthenticated(true))
        .catch(() => setAuthenticated(false));
    };
    doLogin();
  }, []);

  if (isAuthenticated) {
    return <div className="hidden" />;
  }

  return <div className="fixed w-full h-full">Not login</div>;
}
