import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import * as React from 'react';
import { nftActions } from '../../store/nft';
import { RootState } from '../../store';
import { Loading } from '../../components/atoms';
import LazyLoadingImage from '../../components/atoms/LazyLoadingImage';

const NftDetail = () => {
  const router = useRouter();
  const { pid } = router.query;
  const dispatch = useDispatch();
  const nft = useSelector((state: RootState) => nftActions.nftSelector(state));

  useEffect(() => {
    // dispatch(newsActions.setSelected(parseQuery(location.search).id));
    dispatch(nftActions.setSelected(pid));
  }, [dispatch, router]);

  if (!nft) {
    return <Loading />;
  }
  return (
    <div className="w-full">
      <div className="w-full relative h-15 text-center font-bold text-4xl px-3 py-3">
        <button className="absolute w-8 h-8 left-4" type="button" onClick={() => router.back()}>
          <img src="../../static/back-btn.png" alt="back button" />
        </button>
        <Typography variant="h5" fontWeight={800}>
          {nft.title}
        </Typography>
      </div>
      <div className="w-full px-4">
        <LazyLoadingImage src={nft.image} className="w-full mt-4 shadow-2xl rounded-lg" />
      </div>
      <div className="px-4 mt-4">
        <div className="shadow-lg rounded-lg mb-4 py-4 px-4">
          <div className="font-bold text-2xl mb-2">소감</div>
          <div>{nft.impression}</div>
        </div>

        <div className="shadow-lg rounded-lg mb-4 py-4 px-4">
          <div className="font-bold text-2xl mb-2">기분</div>
          <div>{nft.emotion}</div>
        </div>

        <div className="shadow-lg rounded-lg mb-4 py-4 px-4">
          <div className="font-bold text-2xl mb-2">날씨</div>
          <div>{nft.weather}</div>
        </div>

      </div>
    </div>
  );
};

export default NftDetail;
