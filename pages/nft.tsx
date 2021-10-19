import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MyNft, TabPanel, Tabs } from '../components/molecules';
import { ITabProps } from '../components/molecules/Tabs';
import { RootState } from '../store';
import { getNftList, nftActions } from '../store/nft';

const tabs: ITabProps[] = [
  { id: 1, title: '내 NFT' },
  {
    id: 2,
    title: '내 뱃지',
  },
];

export default function nft() {
  const [current, setCurrent] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrent(newValue);
  };
  const { nftList } = useSelector((root: RootState) => root.nft);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNftList());
  }, [dispatch]);

  return (
    <Box>
      <Tabs values={tabs} current={current} handleChange={handleChange} />
      <TabPanel current={current} index={0}>
        <MyNft nftList={nftList.data} />
      </TabPanel>
    </Box>
  );
}
