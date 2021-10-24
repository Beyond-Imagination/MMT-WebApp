import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useRouter } from 'next/router';

import MapScreen from './Map';

function Home() {
  const router = useRouter();

  return <MapScreen />;
}

export default Home;
