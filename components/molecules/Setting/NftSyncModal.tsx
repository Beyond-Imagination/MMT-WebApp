import { Box, Modal, Typography, Input } from '@mui/material';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BusinessException } from '../../../models/BusinessException';
import callAPI from '../../../helpers/apiCaller';
import { loginUser } from '../../../store/user';

interface Prop {
  nftSync: boolean;
  setNftSync: any;
  oauth: any;
}
const NftSyncModal = ({ nftSync, setNftSync, oauth }: Prop) => {
  const [add, setAdd] = useState<string>('');
  const dispatch = useDispatch();
  const [current, setCurrent] = useState<number>(1);
  const handlEKlipWallet = () => {
    if (oauth.data !== null && !oauth.data.is_klip_linked) {
      // SDK
      const bappName = 'Moment';
      const res = klipSDK.prepare.auth({ bappName }).then(value => {
        klipSDK.request(value.request_key, () => alert('모바일 환경에서 실행해주세요'));
        const interval = setInterval(
          args =>
            klipSDK.getResult(value.request_key).then(result => {
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
        throw new BusinessException('KLIP_SYNC_ERROR');
      } else if (res.request_key) {
        // request_key 보관
      }
    }
  };
  const step1 = () => {
    return (
      <>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 6 }}>
          <Typography>Moment 서비스를 위해서는 Klip 연동이 필요합니다.</Typography>
        </Box>
        <Box
          sx={styles.kakaoKlip}
          onClick={() => {
            handlEKlipWallet();
          }}
        >
          <Typography>카카오톡에서 Klip 연동하기</Typography>
        </Box>
        <Box
          sx={styles.directKlip}
          onClick={() => {
            setCurrent(2);
          }}
        >
          <Typography color="white">직접 Klip 연동하기</Typography>
        </Box>
        <Box sx={styles.close} onClick={() => setNftSync(false)}>
          <Typography color="black">닫기</Typography>
        </Box>
      </>
    );
  };

  const step2 = () => {
    return (
      <>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={800}>
            Klip 주소 연동하기
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1">카카오톡에서 Klip 주소를 복하사하여 붙어넣어주세요.</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="outlined-basic"
            label="Klip 주소"
            variant="outlined"
            value={add}
            onChange={event => {
              setAdd(event.target.value);
            }}
          />
        </Box>
        <Box
          sx={styles.close}
          onClick={() => {
            const req = { klaytn_address: add };
            callAPI('post', '/api/users/klaytnAddress', req)
              .then(value => {
                alert('Klip 연동 성공');
                dispatch(loginUser());
                setNftSync(false);
              })
              .catch(e => {
                throw new BusinessException(e);
              });
          }}
        >
          <Typography color="black">확인</Typography>
        </Box>
      </>
    );
  };

  return (
    <Modal
      open={nftSync}
      onClose={() => {
        setNftSync(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.container}>{current === 1 ? step1() : step2()}</Box>
    </Modal>
  );
};

const styles: {
  close: SystemStyleObject;
  kakaoKlip: SystemStyleObject;
  container: SystemStyleObject;
  directKlip: SystemStyleObject;
} = {
  close: { display: 'flex', justifyContent: 'center', width: '70%' },
  kakaoKlip: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 1,
    p: 1,
    bgcolor: '#FEE500',
    alignItems: 'center',
    width: '100%',
    mb: 2,
  },
  directKlip: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 1,
    p: 1,
    bgcolor: '#C4D15F',
    alignItems: 'center',
    width: '100%',
    mb: 2,
  },
  container: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 464,
    bgcolor: 'background.paper',
    outline: 'none',
    borderRadius: 4,
    p: 2,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};
export default NftSyncModal;
