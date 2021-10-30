import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import MapCard from '../components/molecules/MapCard';
import { RootState } from '../store';
import { getTourList } from '../store/tour';
import useAuthenticated from '../hooks/useAuthenticated';
import useLocation from '../hooks/useLocation';

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
  contentTypeId: number;
  show: boolean;
}

export default function MapScreen() {
  const [items, setItems] = useState([]);
  const { mapCenter, setMapCenter, fetchLocation } = useLocation();
  const router = useRouter();
  const { data } = useSelector((root: RootState) => root.tour.tours);
  const dispatch = useDispatch();

  useAuthenticated();
  useEffect(() => {
    dispatch(
      getTourList({
        mapX: mapCenter.lng,
        mapY: mapCenter.lat,
        radius: 1500,
        pageNo: 1,
        numOfRows: 100,
        overview: false,
      }),
    );
  }, [dispatch, mapCenter]);

  useEffect(() => {
    const mapItems: IMapItem[] = data.map(tour => ({
      id: `${tour.content_id}`,
      lat: tour.mapy,
      lng: tour.mapx,
      title: tour.title,
      imageUrl: tour.image_url,
      distance: '',
      contentTypeId: tour.content_type_id,
      show: false,
    }));
    setItems(mapItems);
  }, [data]);

  const toggleShow = (item: IMapItem) => {
    const index = items.findIndex(x => x.id === item.id);
    item.show = !item.show;

    setItems([...items.slice(0, index), item, ...items.slice(index + 1)]);
  };

  const removeBackground = () => {
    const infoWindows = Array.from(document.getElementsByClassName('infoWindow'));
    infoWindows.forEach(infoWindow => {
      const targetElement = infoWindow.parentElement.parentElement;
      targetElement.style.border = 'none';
      targetElement.style.background = 'none';
    });
  };

  const pushTo = (contentId, contentTypeId) => {
    router.push(`/tours/${contentId}?contentTypeId=${contentTypeId}`);
  };

  const onDragEnd = async (map, e) => {
    const { La: lng, Ma: lat } = map.getCenter();
    setMapCenter({ lat, lng });
  };

  const MapMarkerList = items.map((item: IMapItem) => (
    <MapMarker
      position={{
        lat: item.lat,
        lng: item.lng,
      }}
      key={item.id}
      clickable
      onClick={() => toggleShow(item)}
      onCreate={() => removeBackground()}
      infoWindowOptions={{
        className: 'infoWindow',
        style: infoWindowStyle,
      }}
    >
      {item.show && (
        <MapCard
          imageUrl={item.imageUrl}
          title={item.title}
          onClick={() => pushTo(item.id, item.contentTypeId)}
          show={item.show}
        />
      )}
    </MapMarker>
  ));

  return (
    <>
      <button
        className="fixed right-6 bottom-16 w-12 h-12 z-20 rounded-full border-2 border-indigo-500 bg-indigo-500 text-white"
        type="button"
        onClick={() => fetchLocation()}
      >
        위치
      </button>
      <Map
        center={mapCenter}
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        level={4}
        onDragEnd={(map, e) => onDragEnd(map, e)}
      >
        {MapMarkerList}
      </Map>
    </>
  );
}
