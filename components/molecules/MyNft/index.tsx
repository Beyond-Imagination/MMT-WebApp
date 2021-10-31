import * as React from 'react';
import Link from 'next/link';
import { nanoid } from 'nanoid';
import INft from '../../../models/nft/INft';
import LazyLoadingImage from '../../atoms/LazyLoadingImage';

interface MyNftProps {
  children?: React.ReactNode;
  nftList: INft[];
}

export default function MyNft(props: MyNftProps) {
  const { children, nftList, ...other } = props;

  return (
    <div className="flex flex-wrap box-border overflow-y-scroll">
      <div className="grid grid-cols-3 gap-2">
        {nftList.map(nftData => (
          <NftCard nftData={nftData} key={nanoid()} />
        ))}
      </div>
    </div>
  );
}

interface INftCard {
  nftData: INft;
}

function NftCard(props: INftCard) {
  const { nftData, ...other } = props;

  return (
    <Link href={`/nft/${nftData.nft_id}`} key={nftData.nft_id}>
      <div className="w-full">
        <LazyLoadingImage
          src={nftData.image}
          className="rounded-lg shadow-lg object-cover object-center w-full h-28 mb-2"
        />
        <div className="flex text-center justify-center items-center px-2 pb-2" style={{ wordBreak: 'keep-all' }}>
          {nftData.title}
        </div>
      </div>
    </Link>
  );
}
