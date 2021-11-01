import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as React from 'react';
import Icon from '@mdi/react';
import { mdiCrosshairsGps } from '@mdi/js';
import MapCard from '../components/molecules/MapCard';
import { RootState } from '../store';
import { getTourList } from '../store/tour';
import useAuthenticated from '../hooks/useAuthenticated';
import useLocation from '../hooks/useLocation';
import { calculateDistanceFromLatLng } from '../helpers/geolocation';
import { Loading } from "../components/atoms";

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
  const router = useRouter();
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [firstUpdated, setFirstUpdated] = useState(false);
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>();
  const [initializedKakaoMap, setInitializedKakaoMap] = useState(false);
  const { mapCenter, setMapCenter, fetchLocation } = useLocation();
  const { mapCenter: currentCenter, fetchLocation: fetchCurrentLocation } = useLocation();
  const {
    mapCenter: lastUpdatedCenter,
    setMapCenter: setLastUpdatedCenter,
    firstUpdated: firstUpdatedLastCenter,
  } = useLocation();
  const { data } = useSelector((root: RootState) => root.tour.tours);

  const { fetchedAuth } = useAuthenticated();
  useEffect(() => {
    const wrap = async () => {
      await fetchCurrentLocation();
      const params = new URLSearchParams(window.location.search);
      const lat = Number(params.get('lat'));
      const lng = Number(params.get('lng'));
      if (!Number.isNaN(lng) && !Number.isNaN(lat) && lat > 0 && lng > 0) {
        await setMapCenter({ lat, lng });
      }
      await setFirstUpdated(true);
    };
    wrap();
  }, []);

  useEffect(() => {
    if (firstUpdated && initializedKakaoMap) {
      kakaoMap.setCenter(new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng));
      const { basePath } = router;
      router.replace(`${basePath}/Map?lat=${mapCenter.lat}&lng=${mapCenter.lng}`);
    }
  }, [firstUpdated, initializedKakaoMap]);

  useEffect(() => {
    if (firstUpdated) {
      const { basePath } = router;
      router.replace(`${basePath}/Map?lat=${mapCenter.lat}&lng=${mapCenter.lng}`);
    }
  }, [mapCenter]);

  useEffect(() => {
    const wrap = async () => {
      if (!firstUpdated) {
        return;
      }
      const lng = Number(router.query.lng);
      const lat = Number(router.query.lat);

      const km = calculateDistanceFromLatLng(lat, lng, lastUpdatedCenter.lat, lastUpdatedCenter.lng);
      if (km <= 0.6 && firstUpdatedLastCenter) {
        return;
      }

      await setLastUpdatedCenter({ lat, lng });
      await dispatch(
        getTourList({
          mapX: lng,
          mapY: lat,
          radius: 1500,
          pageNo: 1,
          numOfRows: 100,
          overview: false,
        }),
      );
      await setFirstUpdated(true);
    };
    wrap();
  }, [router.query]);

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

  const toggleShow = async (item: IMapItem) => {
    const index = items.findIndex(x => x.id === item.id);
    const km = calculateDistanceFromLatLng(item.lat, item.lng, currentCenter.lat, currentCenter.lng).toFixed(2);
    item.show = !item.show;
    item.distance = `${km} Km`;

    // await setMapCenter({ lat: item.lat, lng: item.lng });
    await setItems([
      ...items.slice(0, index).map((x: IMapItem) => ({ ...x, show: false })),
      item,
      ...items.slice(index + 1).map((x: IMapItem) => ({ ...x, show: false })),
    ]);
  };

  const removeBackground = () => {
    const infoWindows = Array.from(document.getElementsByClassName('infoWindow'));
    infoWindows.forEach(infoWindow => {
      const targetElement = infoWindow.parentElement.parentElement;
      targetElement.style.border = 'none';
      targetElement.style.background = 'none';
    });
  };

  const updateLocation = async () => {
    await fetchCurrentLocation();
    await fetchLocation();
  };

  const pushTo = (contentId, contentTypeId) => {
    router.push(`/tours/${contentId}?contentTypeId=${contentTypeId}`);
  };

  const onDragEnd = async (map, e) => {
    const { La, Ma } = map.getCenter();
    await setMapCenter({ lat: Ma, lng: La });
  };

  const onCreatedMap = (map: kakao.maps.Map) => {
    const wrap = async () => {
      await setKakaoMap(map);
      await setInitializedKakaoMap(true);
    };
    wrap();
  };

  if (!fetchedAuth) {
    return <Loading />;
  }

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
          distance={item.distance}
          title={item.title}
          onClick={() => pushTo(item.id, item.contentTypeId)}
          show={item.show}
        />
      )}
    </MapMarker>
  ));

  return (
    <div className="relative w-full h-full">
      <button
        className="fixed right-6 bottom-16 w-10 h-10 z-20 rounded-full outline-none"
        type="button"
        onClick={() => updateLocation()}
      >
        <Icon path={mdiCrosshairsGps} />
      </button>
      <Map
        center={mapCenter}
        className="fixed top-0 left-0"
        style={{ width: '100vw', height: '100vh', zIndex: 1 }}
        level={3}
        onDragEnd={(map, e) => onDragEnd(map, e)}
        onCreate={map => onCreatedMap(map)}
      >
        {MapMarkerList}
      </Map>
    </div>
  );
}
