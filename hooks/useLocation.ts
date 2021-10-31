import { useState } from 'react';
import geolocation from '../helpers/geolocation';

interface MapCenter {
  lat: number;
  lng: number;
}

export default function useLocation({ lat, lng } = { lat: 37.575869, lng: 126.976859 }) {
  const [mapCenter, _setMapCenter] = useState<MapCenter>({ lat, lng });
  const [firstUpdated, setFirstUpdated] = useState(false);
  const [updatedLocation, setUpdatedLocation] = useState(false);

  const setMapCenter = async (latLng: MapCenter) => {
    await _setMapCenter({ lat: latLng.lat, lng: latLng.lng });
    await setFirstUpdated(true);
  };

  const fetchLocation = async () => {
    try {
      const geo = await geolocation.getGeolocation();
      const { latitude, longitude } = geo.coords;
      await setMapCenter({ lat: latitude, lng: longitude });
    } finally {
      await setUpdatedLocation(true);
    }
  };

  return {
    mapCenter,
    firstUpdated,
    updatedLocation,
    setMapCenter,
    fetchLocation,
  };
}
