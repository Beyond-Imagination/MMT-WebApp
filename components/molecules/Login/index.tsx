import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import useStorage from '../../../hooks/useStorage';
import callAPI from '../../../helpers/apiCaller';

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

export default function kakaoLogin(callback) {
  const handleKakaoLogin = async () => {
    try {
      const result = await loginWithKakao();
      useStorage().localStorage.setItem('KAKAO_ACCESS_TOKEN', result);
      await callAPI('post', '/api/users/login', {
        access_token: result,
      });
      callback();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('1fa3d84c220e7a4cbc19ac98ad079f9a');
    }
  }, []);

  const KakaoLogin = () => (
    <>
      <Button color="primary" onClick={handleKakaoLogin}>
        카카오톡으로 시작하기
      </Button>
    </>
  );

  return KakaoLogin;
}
