import { useContext, useEffect } from "react";
import OLTileLayer from "ol/layer/Tile";
import { useMapContext } from '../../../store/contexts/MapContextProvider';

const TileLayer = ({ source, zIndex = 0 }) => {
	const { mapObject } = useMapContext();
	useEffect(() => {
		if (!mapObject) return;

		let tileLayer = new OLTileLayer({
			source,
			zIndex,
		});

		mapObject.addLayer(tileLayer);
		tileLayer.setZIndex(zIndex);

		return () => {
			if (mapObject) {
				mapObject.removeLayer(tileLayer);
			}
		};
	}, [mapObject]);

	return null;
};

export default TileLayer;
