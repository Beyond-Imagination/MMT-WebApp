import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { useEffect } from 'react';
import MapScreen from './Map';
import useStorage from '../hooks/useStorage';
import { RootState } from '../store';

function Home() {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, []);
  // if (token == null || token === '') router.push('/login');

  if (!isLoggedIn) {
    return <div>Redirect to Login page...</div>;
  }
  return <MapScreen />;
}

export default Home;
