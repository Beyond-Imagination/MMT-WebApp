import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { getUser, loginUser } from '../store/user';
import { RootState } from '../store';
import { Loading } from '../components/atoms';
import RightArrow from '../static/right-arrow.svg';

export default function setting() {
  const { data: user } = useSelector((state: RootState) => state.user.users);
  const { token, isLoggedIn, oauth } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      getUser(oauth.data.access_token);
    } else dispatch(getUser(''));
  }, [dispatch]);
  console.log('user:', user);

  if (1) {
    return (
      <Box sx={{ height: 1024, padding: 0, margin: 0 }}>
        <Loading />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', height: 140, alignItems: 'center', paddingLeft: 4 }}>
        <Box>
          <Avatar src={user.profile_image_uri} alt="" sx={{ width: 80, height: 80 }} />
        </Box>
        <Box sx={{ paddingLeft: 2 }}>
          <Typography variant="h5">{user.nickname}</Typography>
        </Box>
      </Box>
      <MenuBar title="지갑 주소 확인하기" />
      <MenuBar title="NFT 토큰" />
      {/* <MenuBar title="뱃지" /> */}
      <MenuBar title="로그아웃" />
    </Box>
  );
}

interface IMenuBar {
  title: string;
}
function MenuBar({ title }: IMenuBar) {
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
