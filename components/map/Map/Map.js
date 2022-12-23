import React, { useRef, useState, useEffect } from "react"
import MapContext from "./MapContext";
import * as ol from "ol";
import {get as getProjection} from 'ol/proj';
import LayerGroup from 'ol/layer/Group';
import { baseLayers, layers } from "../Utils/Constants";
import { getProjection_EPSG_25831 } from '../Utils/Functions'

const Map = ({selectedBaseLayer, selectLayers, opacityLayer,children }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);
	const [optionsMap, setOptionsMap] = useState(null);

	getProjection_EPSG_25831();

	useEffect(() => { 
		const projection = getProjection('EPSG:25831');
		projection.setExtent([257904,4484796,535907,4751795]);
		const extent = [257904,4484796,535907,4751795];
		let options = {
			view: new ol.View({ zoom:1.5, center:[396905,4618292], projection: projection, extent: extent}),
			controls: []
		};
		let mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);
		setOptionsMap(options);
		setMap(mapObject);
		return () => mapObject.setTarget(undefined);
	}, []);

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{children}
			</div>
		</MapContext.Provider>
	)
}

export default Map;