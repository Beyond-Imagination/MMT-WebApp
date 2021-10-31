import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Avatar, Box, Modal, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getUser, loginUser, userActions } from '../store/user';
import { RootState } from '../store';
import { Loading } from '../components/atoms';
import RightArrow from '../static/right-arrow.svg';
import NftModal from '../components/molecules/Setting/NftModal';
import { BusinessException } from '../models/BusinessException';
import NftSyncModal from '../components/molecules/Setting/NftSyncModal';

export default function setting() {
  const { data: user } = useSelector((state: RootState) => state.user.users);
  const { token, isLoggedIn, oauth } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [nftSync, setNftSync] = useState<boolean>(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(loginUser());
  }, []);

  useEffect(() => {
    if (token == null) {
      router.push('/login');
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    if (isLoggedIn) {
      getUser(oauth.data.access_token);
    } else dispatch(getUser(''));
  }, [dispatch, isLoggedIn]);

  useEffect(() => {}, [nftSync]);

  const handleModal = () => {
    console.log('is_klip_linked: ', oauth.data?.is_klip_linked);
    console.log('nftSync: ', nftSync);
    console.log('user: ', user);
    if (oauth.data != null && oauth.data.is_klip_linked !== undefined && !oauth.data.is_klip_linked && nftSync) {
      console.log(oauth.data.is_klip_linked);
      console.log(nftSync);
      return <NftSyncModal setNftSync={setNftSync} nftSync={nftSync} oauth={oauth} />;
    }
    return null;
  };

  return (
    <>
      <Box sx={{ backgroundColor: 'white', width: '100%' }}>
        {!isLoggedIn || user == null ? (
          <Loading />
        ) : (
          <>
            <Box sx={{ display: 'flex', height: 140, alignItems: 'center', paddingLeft: 4 }}>
              <Box>
                <Avatar src={user.profile_image_uri} alt="" sx={{ width: 80, height: 80 }} />
              </Box>
              <Box sx={{ paddingLeft: 2 }}>
                <Typography variant="h5">{user.nickname}</Typography>
              </Box>
            </Box>
            <NftModal handleClose={handleClose} open={open} klaytnAddres={user.klaytn_address} />
            <MenuBar
              title="지갑 주소 확인하기"
              onClick={() => {
                if (!oauth.data.is_klip_linked) setNftSync(true);
                else {
                  setOpen(!open);
                }
              }}
            />
            <MenuBar
              title="NFT 토큰"
              onClick={() => {
                router.push('/nft');
              }}
            />
            <MenuBar
              title="로그아웃"
              onClick={() => {
                localStorage.clear();
                dispatch(userActions.logout());
                router.push('/login');
                console.log('Removed!');
              }}
            />
          </>
        )}
      </Box>
      {handleModal()}
    </>
  );
}

interface IMenuBar {
  title: string;
  onClick: any;
}

function MenuBar({ title, onClick }: IMenuBar) {
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        height: 50,
        paddingLeft: 2,
        paddingRight: 2,
        borderBottomWidth: 0.5,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderColor: '#DADADA',
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onClick={onClick}
    >
      <div>
        <Typography variant="subtitle1">{title}</Typography>
      </div>
      <div>
        <RightArrow />
      </div>
    </Box>
  );
}
