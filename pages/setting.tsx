import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Avatar, Box, Modal, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { getUser, loginUser, userActions } from '../store/user';
import { RootState } from '../store';
import { Loading } from '../components/atoms';
import RightArrow from '../static/right-arrow.svg';

export default function setting() {
  const { data: user } = useSelector((state: RootState) => state.user.users);
  const { token, isLoggedIn, oauth } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
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

  return (
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                지갑 주소
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {user.klaytn_addres}
              </Typography>
            </Box>
          </Modal>
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
        </>
      )}
    </Box>
  );
}
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
