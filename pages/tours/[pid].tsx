import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { RootState } from '../../store';
import { getTourDetail } from '../../store/tour';

const TourDetail = () => {
  const router = useRouter();
  const { pid } = router.query;
  const dispatch = useDispatch();
  const tourDetail = useSelector((state: RootState) => state.tour.tourDetail.data);

  useEffect(() => {
    if (pid != null) dispatch(getTourDetail(Number(pid)));
  }, [dispatch, pid]);

  if (tourDetail == null) return <div>Loading...</div>;

  console.log(tourDetail);

  return (
    <div>
      <img src={tourDetail.images[0].origin_img_url} alt="" />
      <div>{tourDetail.title}</div>
      <Button>NFT 발급</Button>
      <div style={{ height: 150, overflow: 'hidden' }}>{tourDetail.overview}</div>
    </div>
  );
};
export default TourDetail;
