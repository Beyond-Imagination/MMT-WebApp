import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MyNft, TabPanel, Tabs } from '../components/molecules';
import { ITabProps } from '../components/molecules/Tabs';
import { getNftList } from '../store/nft';
import TitleBar from '../components/molecules/TitleBar';
import useKlip from '../hooks/useKlip';
import { fetchUser } from '../core/apis/user';
import { IUser } from '../models/user/IUser';
import { Loading } from '../components/atoms';

const tabs: ITabProps[] = [{ id: 1, title: '내 NFT' }];

export default function nft() {
  const [current, setCurrent] = useState(0);
  const [user, setUser] = useState<IUser>(null);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrent(newValue);
  };
  const { isLoggedIn, isKlipLinked } = useKlip();

  useEffect(() => {
    const wrap = async () => {
      if (isLoggedIn && isKlipLinked) {
        const result = await fetchUser();
        setUser(result);
      }
    };

    wrap();
  }, [isLoggedIn, isKlipLinked]);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="w-full bg-white h-full">
      <TitleBar title="NFT 엘범" useBackBtn={false} />
      <Tabs values={tabs} current={current} handleChange={handleChange} />
      {user.nft_list.length === 0 ? (
        <div className="fixed left-1/2 top-1/2 text-lg font-bold" style={{ transform: 'translate(-50%, -50%)' }}>
          발급받은 <span className="text-indigo-500">NFT</span> 가 없습니다
        </div>
      ) : (
        <TabPanel current={current} index={0}>
          <MyNft nftList={user.nft_list} />
        </TabPanel>
      )}
    </div>
  );
}
