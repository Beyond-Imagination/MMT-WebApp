import { Box, Typography, Modal } from '@mui/material';

interface Prop {
  open: boolean;
  handleClose: any;
  klaytnAddres: string;
}

const NftModal = ({ open, handleClose, klaytnAddres }: Prop) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Typography id="modal-modal-title" variant="h6">
            지갑 주소
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#EAEAEA', height: 32, mb: 2 }}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {klaytnAddres}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} onClick={handleClose}>
          <Typography id="modal-modal-title" variant="subtitle1" color="#C4D15F">
            종료
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 4,
  p: 2,
};

export default NftModal;
