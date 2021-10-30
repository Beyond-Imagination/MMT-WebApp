import { useState } from 'react';

function getGeolocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
}

export default function useLocation({ lat, lng } = { lat: 37.575869, lng: 126.976859 }) {
  const [mapCenter, setMapCenter] = useState({ lat, lng });

  const [updatedLocation, setUpdatedLocation] = useState(false);

  const fetchLocation = async () => {
    try {
      const geo = await getGeolocation();
      const { latitude, longitude } = geo.coords;
      await setMapCenter({ lat: latitude, lng: longitude });
    } finally {
      await setUpdatedLocation(true);
    }
  };

  return {
    mapCenter,
    setMapCenter,
    updatedLocation,
    fetchLocation,
  };
}
