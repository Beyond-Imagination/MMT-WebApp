import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getUser, loginUser, userActions } from '../store/user';
import { RootState } from '../store';
import { Loading } from '../components/atoms';
import RightArrow from '../static/right-arrow.svg';
import NftModal from '../components/molecules/Setting/NftModal';

export default function setting() {
  const { data: user } = useSelector((state: RootState) => state.user.users);
  const { token, isLoggedIn, oauth } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const [add, setAdd] = useState();
  useEffect(() => {
    dispatch(loginUser());
  }, []);

  useEffect(() => {
    console.log(klipSDK);
    if (oauth.data !== null && !oauth.data.is_klip_linked) {
      // SDK
      const bappName = 'Moment';
      const res = klipSDK.prepare.auth({ bappName }).then(value => {
        klipSDK.request(value.request_key, () => alert('모바일 환경에서 실행해주세요'));
        const interval = setInterval(
          args =>
            klipSDK.getResult(value.request_key).then(result => {
              console.log('result: ', result.status);
              if (result.status === 'completed') {
                clearInterval(interval);
                alert(`Address: ${result.result.klaytn_address}`);
                setAdd(result.result.klaytn_address);
              }
            }),
          3000,
        );
      });

      if (res.err) {
        // 에러 처리
      } else if (res.request_key) {
        // request_key 보관
      }
    }
  }, [oauth.data]);

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
            <NftModal handleClose={handleClose} open={open} klaytnAddres={user.klaytn_addres} />
            <MenuBar
              title="지갑 주소 확인하기"
              onClick={() => {
                setOpen(!open);
              }}
            />
            <MenuBar
              title="NFT 토큰"
              onClick={() => {
                setOpen(!open);
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
            <div>{`add: ${add}`}</div>
          </>
        )}
      </Box>
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
