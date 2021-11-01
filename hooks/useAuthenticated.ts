import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RootState } from '../store';
import { userActions } from '../store/user';
import callAPI from '../helpers/apiCaller';
import useStorage from './useStorage';

export default function useAuthenticated() {
  const [fetchedAuth, setFetchedAuth] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  function toLogin() {
    if (router.pathname.toLowerCase() !== '/login') {
      router.push('/login');
    }
  }

  useEffect(() => {
    const wrap = async () => {
      try {
        await setFetchedAuth(false);
        const accessToken: string = useStorage().localStorage.getItem('KAKAO_ACCESS_TOKEN');
        const { is_klip_linked: isKlipLinked } = await callAPI('post', '/api/users/login', {
          access_token: accessToken,
        });

        await dispatch(userActions.setUser(isKlipLinked));
      } catch (e) {
        console.log(e);
        toLogin();
      } finally {
        setFetchedAuth(true);
      }
    };
    wrap();
  }, []);

  useEffect(() => {
    if (!isLoggedIn && fetchedAuth) {
      toLogin();
    }
  }, [isLoggedIn, fetchedAuth]);

  return { isLoggedIn, fetchedAuth };
}
