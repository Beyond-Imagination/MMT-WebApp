import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyNft, TabPanel, Tabs } from '../components/molecules';
import { ITabProps } from '../components/molecules/Tabs';
import { RootState } from '../store';
import { getNftList } from '../store/nft';
import TitleBar from '../components/molecules/TitleBar';
import useKlip from '../hooks/useKlip';

const tabs: ITabProps[] = [{ id: 1, title: '내 NFT' }];

export default function nft() {
  const [current, setCurrent] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrent(newValue);
  };
  const { nftList } = useSelector((root: RootState) => root.nft);
  const { data: user } = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch();

  const { isLoggedIn, isKlipLinked } = useKlip();

  useEffect(() => {
    if (isLoggedIn && isKlipLinked) {
      dispatch(getNftList());
    }
  }, [isLoggedIn, isKlipLinked]);

  return (
    <div className="w-full bg-white">
      <TitleBar title="NFT 엘범" useBackBtn={false} />
      <Tabs values={tabs} current={current} handleChange={handleChange} />
      {nftList.data.length === 0 ? (
        <div className="fixed left-1/2 top-1/2 text-lg font-bold" style={{ transform: 'translate(-50%, -50%)' }}>
          NFT 가 없습니다
        </div>
      ) : (
        <TabPanel current={current} index={0}>
          <MyNft nftList={nftList.data} />
        </TabPanel>
      )}
    </div>
  );
}
