import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, userActions } from '../store/user';
import { RootState } from '../store';

export default function login() {
  const router = useRouter();
  const { code } = router.query;
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log('useEffect');
    if (code != null && code !== '') {
      dispatch(userActions.saveToken(code));

      if (typeof code === 'string') {
        dispatch(loginUser(code));
      } else dispatch(loginUser(code[0]));
    }
  }, [dispatch, code]);

  if (isLoggedIn) {
    router.push('/');
  }
  console.log(router.query);
  console.log('isLoggedIn: ', isLoggedIn);
  console.log(code);

  return (
    <div>
      Login...
      <div>{code}</div>
    </div>
  );
}
