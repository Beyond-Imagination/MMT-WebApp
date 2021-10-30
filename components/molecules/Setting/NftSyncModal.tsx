import { Box, Modal, Typography } from '@mui/material';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { useState } from 'react';
import { BusinessException } from '../../../models/BusinessException';

interface Prop {
  nftSync: boolean;
  setNftSync: any;
  oauth: any;
}
const NftSyncModal = ({ nftSync, setNftSync, oauth }: Prop) => {
  const [add, setAdd] = useState();

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
  return (
    <Modal
      open={nftSync}
      onClose={() => {
        setNftSync(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.container}>
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
        <Box sx={styles.directKlip} onClick={() => {}}>
          <Typography color="white">직접 Klip 연동하기</Typography>
        </Box>
        <Box sx={styles.close} onClick={() => setNftSync(false)}>
          <Typography color="black">닫기</Typography>
        </Box>
      </Box>
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
