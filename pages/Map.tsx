import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import MapCard from '../components/molecules/MapCard';
import useAuth from '../components/common/Authentication';
import { RootState } from '../store';
import { loginUser } from '../store/user';

const infoWindowStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
};

export interface IMapItem {
  id: string;
  lat: number;
  lng: number;
  title: string;
  imageUrl: string;
  distance: string;
  show: boolean;
}

const testItem: IMapItem[] = [
  {
    id: '경복궁 1',
    lat: 33.450701,
    lng: 126.570667,
    title: '경복궁 1',
    imageUrl: 'http://www.artinsight.co.kr/data/tmp/1804/79026ca47a77c48e37c1afb425b80566_RtxaVP4jOakhYzo6m2edDPv.jpg',
    distance: '10.1km',
    show: false,
  },
  {
    id: '경복궁 2',
    lat: 33.750701,
    lng: 126.170667,
    title: '경복궁 2',
    imageUrl: 'http://www.artinsight.co.kr/data/tmp/1804/79026ca47a77c48e37c1afb425b80566_RtxaVP4jOakhYzo6m2edDPv.jpg',
    distance: '10.1km',
    show: false,
  },
];

export default function MapScreen() {
  const [items, setItems] = useState(testItem);
  const router = useRouter();
  const { isLoggedIn, token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginUser());
  }, []);
  useEffect(() => {
    if (token == null) {
      router.push('/login');
    }
  }, [isLoggedIn, token]);

  const toggleShow = (item: IMapItem) => {
    const index = items.findIndex(x => x.id === item.id);
    item.show = !item.show;

    setItems([...items.slice(0, index), item, ...items.slice(index + 1)]);
  };

  const Auth = useAuth();

  const MapMarkerList = items.map(item => (
    <MapMarker
      position={{
        lat: item.lat,
        lng: item.lng,
      }}
      key={item.id}
      clickable
      onClick={() => toggleShow(item)}
      infoWindowOptions={{
        className: 'infoWindow',
        style: infoWindowStyle,
      }}
    >
      {item.show && <MapCard imageUrl={item.imageUrl} title={item.title} distance={item.distance} />}
    </MapMarker>
  ));

  return (
    <>
      <Map
        center={{
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{ width: '100%', height: '100%' }}
        level={3}
      >
        {MapMarkerList}
      </Map>
    </>
  );
}
