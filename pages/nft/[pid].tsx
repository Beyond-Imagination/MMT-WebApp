import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as React from 'react';
import { nftActions } from '../../store/nft';
import { RootState } from '../../store';
import { Loading } from '../../components/atoms';
import LazyLoadingImage from '../../components/atoms/LazyLoadingImage';
import TitleBar from '../../components/molecules/TitleBar';

const NftDetail = () => {
  const router = useRouter();
  const { pid } = router.query;
  const dispatch = useDispatch();
  const {data: nftList} = useSelector((state: RootState) => state.nft.nftList);

  let nft;
  if(nftList) {
    nft = nftList.find(e => Number(e.nft_id) === Number(pid))
  }

  useEffect(() => {
    // dispatch(newsActions.setSelected(parseQuery(location.search).id));
    dispatch(nftActions.setSelected(pid));
  }, [dispatch, router]);

  if (!nft) {
    return <Loading />;
  }
  return (
    <div className="w-full">
      <TitleBar title={nft.title} />
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
