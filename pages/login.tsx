import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import useStorage from '../hooks/useStorage';
import useApi from '../hooks/useApi';

function loginWithKakao(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!Kakao) {
      return reject(new Error('Kakao instance is not initialized'));
    }

    Kakao.Auth.login({
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
  const [state, fetchTour] = useApi('/api/tour', 'get');

  const { data } = state;

  const handleKakaoLogin = async () => {
    try {
      const result = await loginWithKakao();
      useStorage().sessionStorage.setItem('KAKAO_ACCESS_TOKEN', result);

      setAccessToken(result);
      await fetchTour({
        pageNo: 1,
        arrange: 'A',
        contentTypeId: 12,
        mapX: 126.981611,
        mapY: 37.568477,
        radius: 1000,
      });
      console.log('fucking', data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.KAKAO_SDK_JAVASCRIPT_KEY);
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
