import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RootState } from '../store';
import { loginUser } from '../store/user';

export default function useAuthenticated() {
  const [fetchedAuth, setFetchedAuth] = useState(false);
  const { isLoggedIn, isKlipLinked } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const wrap = async () => {
      try {
        await setFetchedAuth(false);
        await dispatch(loginUser());
      } catch (e) {
        await router.push('/login');
      } finally {
        setFetchedAuth(true);
      }
    };
    wrap();
  }, []);

  useEffect(() => {
    const wrap = () => {
      if (!isLoggedIn) {
        router.push('/login');
      }

      // if (!isKlipLinked) {
      //   return router.push('/linkKlip');
      // }
    };

    wrap();
  }, [isLoggedIn]);

  return { isLoggedIn, fetchedAuth, isKlipLinked };
}
