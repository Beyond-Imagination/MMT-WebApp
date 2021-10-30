import { useState } from 'react';

function getGeolocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
}

export default function useLocation() {
  const [mapCenter, setMapCenter] = useState({
    lat: 37.575869,
    lng: 126.976859,
  });

  const [updatedLocation, setUpdatedLocation] = useState(false);

  const fetchLocation = async () => {
    try {
      const geo = await getGeolocation();
      const { latitude: lat, longitude: lng } = geo.coords;
      await setMapCenter({ lat, lng });
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
