import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { getNftList } from '../../store/nft';
import { Loading } from '../../components/atoms';
import LazyLoadingImage from '../../components/atoms/LazyLoadingImage';
import TitleBar from '../../components/molecules/TitleBar';
import useKlip from '../../hooks/useKlip';
import { fetchUser } from '../../core/apis/user';
import { IUser } from '../../models/user/IUser';
import INft from '../../models/nft/INft';

const NftDetail = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser>(null);
  const [nft, setNft] = useState<INft>(null);
  const { pid } = router.query;
  const dispatch = useDispatch();

  const { isLoggedIn, isKlipLinked } = useKlip();

  useEffect(() => {
    const wrap = async () => {
      if (isLoggedIn && isKlipLinked) {
        await dispatch(getNftList());
        const result = await fetchUser();
        await setUser(result);
        const tempNfp = result.nft_list.find((x: INft) => x.nft_id === Number(pid));
        setNft(tempNfp);
      }
    };
    wrap();
  }, [isLoggedIn, isKlipLinked]);

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

        <div className="shadow-lg rounded-lg mb-4 py-4 px-4">
          <div className="font-bold text-2xl mb-2">블록체인 네트워크</div>
          <div>Klaytn Baobab Network</div>
        </div>

        <div className="shadow-lg rounded-lg mb-4 py-4 px-4">
          <div className="font-bold text-2xl mb-2">tx hash</div>
          <div>{`${nft.tx_hash.slice(0, 6)}...${nft.tx_hash.slice(-7, -1)}`}</div>
        </div>
      </div>
      <div className="pb-40" />
    </div>
  );
};

export default NftDetail;
