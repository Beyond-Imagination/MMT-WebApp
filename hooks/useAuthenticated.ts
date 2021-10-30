import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { RootState } from '../store';
import { loginUser } from '../store/user';

export default function useAuthenticated() {
  const { isLoggedIn, token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(loginUser());
  }, []);
  useEffect(() => {
    if (token === null) {
      router.push('/login');
    }
  }, [isLoggedIn, token]);
}
