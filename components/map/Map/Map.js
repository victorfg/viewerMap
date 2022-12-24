import React, { useRef, useEffect } from "react"
import { useMapContext } from '../../../store/contexts/MapContextProvider';

const Map = ({ children }) => {
	const mapRef = useRef();
	const { mapObject } = useMapContext();

	useEffect(() => { 		
		if (!mapObject) return;  
		mapObject.setTarget(mapRef.current);
		return () => mapObject.setTarget(undefined);
	}, [mapObject]);

	return (
		<div ref={mapRef} className="ol-map">
			{children}
		</div>
	)
}

export default Map;