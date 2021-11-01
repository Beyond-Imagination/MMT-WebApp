import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Loading } from '../components/atoms';
import useAuthenticated from '../hooks/useAuthenticated';

function Home() {
  const { isLoggedIn } = useAuthenticated();
  const router = useRouter();

  useEffect(() => {
    router.push('/Map');
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Loading />;
  }
  return <></>;
}

export default Home;
