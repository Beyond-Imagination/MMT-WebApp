import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useStorage from '../hooks/useStorage';
import callAPI from '../helpers/apiCaller';
import { userActions } from '../store/user';
import { RootState } from '../store';

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
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handleKakaoLogin = async () => {
    const result = await loginWithKakao();
    useStorage().localStorage.setItem('KAKAO_ACCESS_TOKEN', result);

    const loginResult = await callAPI('post', '/api/users/login', {
      access_token: result,
    });

    dispatch(userActions.saveToken(loginResult));
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('1fa3d84c220e7a4cbc19ac98ad079f9a');
    }
  });

  if (isLoggedIn) {
    router.push('/');
  }

  return (
    <>
      <div style={{ height: '100%', paddingTop: 128 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="../static/logo.png" alt="" style={{ height: 240 }} />
        </div>
      </div>

      <button
        type="button"
        className="fixed bottom-12 left-0 right-0 mx-auto"
        onClick={handleKakaoLogin}
        style={{ width: '300px', height: '45px' }}
      >
        <img className="w-full h-full" src="../static/kakao_login_large_wide.png" alt="" />
      </button>
    </>
  );
}
