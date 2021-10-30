import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SettingIcon from '@mui/icons-material/Settings';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import '../styles/globals.css';
import { Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import store from '../store';

const client = new QueryClient();
const BOTTOM_NAV_HIDE_LIST = ['/login'];

function MyApp({ Component, pageProps }: AppProps) {
  const [value, setValue] = React.useState('Home');
  const [hideBottomNav, setHideBottomNav] = useState(true);
  const router = useRouter();
  const pushTo = path => router.push(`/${path}`);

  useEffect(() => {
    const path = router.pathname.toLowerCase();
    setHideBottomNav(BOTTOM_NAV_HIDE_LIST.some(x => path === x));
  }, [router.pathname]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <div className="w-full h-full">
          <div className="w-full relative" style={{ height: 'calc(100% - 56px)' }}>
            <Component {...pageProps} />
          </div>
          <Paper
            className="fixed w-full right-0 bottom-0 left-0 flex justify-center items-center h-14 z-10"
            elevation={3}
            style={{ visibility: hideBottomNav ? 'hidden' : 'visible' }}
          >
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              style={{ maxWidth: 388 }}
            >
              <BottomNavigationAction value="home" label="" icon={<HomeIcon />} onClick={() => pushTo('Map')} />
              <BottomNavigationAction
                value="tours"
                label=""
                icon={<PhotoCameraIcon />}
                onClick={() => pushTo('tours')}
              />
              <BottomNavigationAction value="nft" label="" icon={<PhotoLibraryIcon />} onClick={() => pushTo('nft')} />
              <BottomNavigationAction
                value="setting"
                label=""
                icon={<SettingIcon />}
                onClick={() => pushTo('setting')}
              />
            </BottomNavigation>
          </Paper>
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
