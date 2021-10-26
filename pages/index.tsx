import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useRouter } from 'next/router';

import MapScreen from './Map';
import useStorage from '../hooks/useStorage';

function Home() {
  const router = useRouter();

  // if (token == null || token === '') router.push('/login');
  return <MapScreen />;
}

export default Home;
