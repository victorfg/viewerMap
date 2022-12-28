import { useContext, useEffect } from "react";
import OLTileLayer from "ol/layer/Tile";
import LayerGroup from 'ol/layer/Group';
import { useMapContext } from '../../../store/contexts/MapContextProvider';

const GroupLayers = ({ source, title, selectedBaseLayer}) => {
    const { mapObject } = useMapContext();

	useEffect(() => {
		if (!mapObject) return;

        let tileLayer;

        let olTileLayers =  source.map((layer,index) => {
            return new OLTileLayer({
                source: layer,
                title: title
            });
        })

        tileLayer = new LayerGroup({
            layers: olTileLayers
        })
        
        mapObject.addLayer(tileLayer);
	}, [mapObject, selectedBaseLayer]);

	return null;
};

export default GroupLayers;