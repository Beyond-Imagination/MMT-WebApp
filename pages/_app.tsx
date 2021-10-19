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
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import store from '../store';
import '../styles/globals.css';
import { useEffect } from 'react';
import { Link } from '@mui/material';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [value, setValue] = React.useState('Home');
  useEffect(() => {});

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Box sx={{ pb: 7 }}>
          <div className="page">
            <Component {...pageProps} />
          </div>
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <Link href="/">
                <BottomNavigationAction value="home" label="" icon={<HomeIcon />} />
              </Link>
              <Link href="/tours">
                <BottomNavigationAction value="tour" label="" icon={<PhotoCameraIcon />} />
              </Link>
              <Link href="/nft">
                <BottomNavigationAction value="nft" label="" icon={<PhotoLibraryIcon />} />
              </Link>
              <Link href="/setting">
                <BottomNavigationAction value="setting" label="" icon={<SettingIcon />} />
              </Link>
            </BottomNavigation>
          </Paper>
        </Box>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
