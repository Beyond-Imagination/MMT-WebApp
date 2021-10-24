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
      useStorage().sessionStorage.setItem('KAKAO_ACCESS_TOKEN', result);
      setAccessToken(result);

      const asd1 = await callAPI('post', '/api/users/login', {
        access_token: result,
      });

      console.log('login', asd1);

      const asd = await callAPI('get', '/api/tour', {
        numOfRows: 4,
        pageNo: 1,
        arrange: 'A',
        contentTypeId: 12,
        mapX: 126.981611,
        mapY: 37.568477,
        radius: 1000,
      });

      console.log(asd);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log(process.env);
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('1fa3d84c220e7a4cbc19ac98ad079f9a');
    }
  });

  return (
    <>
      <div>Hello Access Token</div>
      <div>{accessToken.length > 0 && <div>{accessToken}</div>}</div>
      <Button color="primary" onClick={handleKakaoLogin}>
        카카오톡으로 시작하기
      </Button>
    </>
  );
}
