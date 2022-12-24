import mapContext from './mapContext';
import { useState } from "react";
import React from 'react';

const MapContextProvider = ({ children }) => {
    const [viewCatalonia, setViewCatalonia] = useState(null);
		const [mapObject, setMapObject] =  useState(null);
  
    const mapCtx = {
      viewCatalonia: viewCatalonia,
      mapObject: mapObject,
			setViewCatalonia:setViewCatalonia,
			setMapObject:setMapObject
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