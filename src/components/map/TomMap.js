// src/components/map/TomMap.js

import React, { useEffect, useCallback, useRef } from 'react';
import { useMap } from 'providers/MapProvider';
import './TomMap.scss';

const TomMap = ({ location }) => {
  let map = useRef(null);

  const { initMap, requestGeoLocation, setCenter } = useMap();

  const getGeoLocation = useCallback((location) => {
    location &&
      requestGeoLocation(location)
        .then(position => {
          setCenter(map.current, position);
        })
  }, [requestGeoLocation, setCenter]);


  useEffect(() => {
    getGeoLocation(location);
  }, [location, getGeoLocation]);

  useEffect(() => {
    map.current = initMap();
  }, [initMap]);

  return <div id="bwm-map"></div>
};


export default TomMap;
