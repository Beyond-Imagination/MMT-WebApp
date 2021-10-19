import * as React from 'react';
import Link from 'next/link';
import INft from '../../../models/nft/INft';

interface MyNftProps {
  children?: React.ReactNode;
  nftList: INft[];
}

export default function MyNft(props: MyNftProps) {
  const { children, nftList, ...other } = props;

  return (
    <div className="test2" style={{ display: 'flex', flexWrap: 'wrap', boxSizing: 'border-box', overflow: 'scroll' }}>
      {nftList.map(nftData => (
        <NftCard nftData={nftData} />
      ))}
    </div>
  );
}

interface INftCard {
  nftData: INft;
}

function NftCard(props: INftCard) {
  const { nftData, ...other } = props;

  return (
    <Link href={`/nft/${nftData.nftId}`}>
      <div style={{ width: '33%', padding: 5 }}>
        <img src={nftData.image} alt="" style={{ width: '100%' }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>{nftData.title}</div>
      </div>
    </Link>
  );
}
