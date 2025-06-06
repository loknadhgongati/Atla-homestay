import React from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';

const { createContext, useContext } = React;

const MapContext = createContext(null);

export const MapProvider = ({ children, apiKey }) => {

  const initMap = () => {
    const map = tt.map({
      key: apiKey, // ✅ use the passed-in API key
      container: 'bwm-map',
    });

    map.addControl(new tt.NavigationControl());

    return map;
  };

  const setCenter = (map, position) => {
    map.setCenter(new tt.LngLat(position.lon, position.lat))
  };



  const requestGeoLocation = location => {
    return axios
      .get(`https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${apiKey}`)
      .then(res => res.data)
      .then(tomRes => {
        const results = tomRes.results;

        if (results && results.length > 0) {
          const { position } = results[0];
          return position;
        }

        return Promise.reject('Location not found or missing coordinates!');
      });
  };




  const mapApi = {
    initMap,
    requestGeoLocation,
    setCenter
  };

  return (
    <MapContext.Provider value={mapApi}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);
