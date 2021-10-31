import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getUser, loginUser } from '../store/user';
import { MyNft, TabPanel, Tabs } from '../components/molecules';
import { ITabProps } from '../components/molecules/Tabs';
import { RootState } from '../store';
import { getNftList, nftActions } from '../store/nft';

import { Loading } from '../components/atoms';
import TitleBar from "../components/molecules/TitleBar";

const tabs: ITabProps[] = [{ id: 1, title: '내 NFT' }];

export default function nft() {
  const [current, setCurrent] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrent(newValue);
  };
  const { nftList } = useSelector((root: RootState) => root.nft);
  const { data: user } = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn, token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(loginUser());
  }, []);

  useEffect(() => {
    if (token == null) {
      router.push('/login');
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    if (user) {
      dispatch(nftActions.setNftList(user.nft_list));
    }
  });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, isLoggedIn]);

  return (
    <div className="w-full bg-white">
      <TitleBar title="NFT 엘범" useBackBtn={false} />
      <Tabs values={tabs} current={current} handleChange={handleChange} />
      {!user || user.nft_list.length === 0 ? (
        <div className="fixed left-1/2 top-1/2 text-lg font-bold" style={{ transform: 'translate(-50%, -50%)' }}>
          NFT 가 없습니다
        </div>
      ) : (
        <TabPanel current={current} index={0}>
          <MyNft nftList={user.nft_list} />
        </TabPanel>
      )}
    </div>
  );
}
