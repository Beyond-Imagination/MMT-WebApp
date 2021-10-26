import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { RootState } from '../../store';
import { getTourDetail } from '../../store/tour';

const TourDetail = () => {
  const router = useRouter();
  const { pid } = router.query;
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.tour.tourDetail);

  useEffect(() => {
    dispatch(getTourDetail(Number(pid)));
  }, [dispatch, pid]);

  console.log('data: ', data);

  if (data === null) return <div>Loading...</div>;

  return (
    <Box sx={{ height: '96vh' }}>
      <Box sx={{ height: '30%' }}>
        <img src={data.images[0].origin_img_url} alt="" />
      </Box>
      <Box
        sx={{
          pl: 2,
          pr: 2,
          pt: 2,
          height: '65%',
          overflow: 'scroll',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 2 }}>
          {data.title}
        </Typography>
        <Button sx={{ backgroundColor: '#C4D15F', color: 'white', width: '100%', mb: 2 }}>NFT 발급</Button>
        <div>{data.overview}</div>
      </Box>
    </Box>
  );
};
export default TourDetail;
