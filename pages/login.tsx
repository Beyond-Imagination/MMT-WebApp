import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import useStorage from '../hooks/useStorage';
import callAPI from '../helpers/apiCaller';

function loginWithKakao(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.Kakao) {
      return reject(new Error('Kakao instance is not initialized'));
    }

    window.Kakao.Auth.login({
      success(auth) {
        resolve(auth.access_token);
      },
      fail(error) {
        reject(error);
      },
    });
    return null;
  });
}

export default function loginScreen() {
  const [accessToken, setAccessToken] = useState('');

  const handleKakaoLogin = async () => {
    try {
      const result = await loginWithKakao();
      useStorage().localStorage.setItem('KAKAO_ACCESS_TOKEN', result);
      setAccessToken(result);

      const loginResult = await callAPI('post', '/api/users/login', {
        access_token: result,
      });

      console.log('loginResult: ', loginResult);

      const tourResult = await callAPI('get', '/api/tour', {
        numOfRows: 4,
        pageNo: 1,
        arrange: 'A',
        contentTypeId: 12,
        mapX: 126.981611,
        mapY: 37.568477,
        radius: 1000,
      });

      console.log('tourResult: ', tourResult);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('1fa3d84c220e7a4cbc19ac98ad079f9a');
    }
    // handleKakaoLogin();
  });

  return (
    <div style={{ height: '100%', paddingTop: 128 }}>
      {/* <div>Hello Access Token</div> */}
      {/* <div>{accessToken.length > 0 && <div>access: {accessToken}</div>}</div> */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="../static/logo.png" alt="" style={{ height: 240 }} />
      </div>
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}
        onClick={handleKakaoLogin}
      >
        <img src="../static/kakao_login_large_wide.png" alt="" style={{ height: 50 }} />
      </div>
    </div>
  );
}
