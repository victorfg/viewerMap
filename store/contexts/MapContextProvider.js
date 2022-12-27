import mapContext from './mapContext';
import { useState, useMemo } from "react";
import React from 'react';
import Feature from 'ol/Feature.js';
import OLVectorLayer from "ol/layer/Vector";
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';

const MapContextProvider = ({ children }) => {
    const [viewCatalonia, setViewCatalonia] = useState(null);
    const [geolocationCat, setGeolocationCat] = useState(null);
		const [mapObject, setMapObject] =  useState(null);
    const positionFeature = new Feature();
    const accuracyFeature = new Feature();
    const caca = new OLVectorLayer({});

		positionFeature.setStyle(
			new Style({
				image: new CircleStyle({
					radius: 6,
					fill: new Fill({
						color: '#3399CC',
					}),
					stroke: new Stroke({
						color: '#fff',
						width: 2,
					}),
				}),
			})
		);
  
    const mapCtx = {
      accuracyFeature:accuracyFeature,
      positionFeature:positionFeature,
      viewCatalonia: viewCatalonia,
      geolocationCat: geolocationCat,
      mapObject: mapObject,
			setViewCatalonia:setViewCatalonia,
      setGeolocationCat:setGeolocationCat,
			setMapObject:setMapObject,
      caca:caca
    };
  
    return (
      <mapContext.Provider displayName="MapContextProvider" value={mapCtx}>
        {children}
      </mapContext.Provider>
    );
};

const useMapContext = () => {
  return React.useContext(mapContext);
};

export default MapContextProvider;
export { useMapContext };