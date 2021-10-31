import { useRouter } from 'next/router';
import MapScreen from './Map';
import { Loading } from '../components/atoms';
import useAuthenticated from '../hooks/useAuthenticated';

function Home() {
  const router = useRouter();

  const { isLoggedIn } = useAuthenticated();

  if (!isLoggedIn) {
    return <Loading />;
  }
  return <MapScreen />;
}

export default Home;
