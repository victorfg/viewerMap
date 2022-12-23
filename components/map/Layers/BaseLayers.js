import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLTileLayer from "ol/layer/Tile";
import LayerGroup from 'ol/layer/Group';
import { baseLayers, layers } from "../Utils/Constants";

const BaseLayers = ({ source, title,selectedBaseLayer, selectLayers, opacityLayer }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let tileLayer = new OLTileLayer({
			source,
            title
		});

		map.addLayer(tileLayer);
	}, [map]);

	//HANDLER CHANGE LAYERS
	useEffect(() => {
		if (!map) return;
		map.getLayers().forEach(layer => {
			if (layer instanceof LayerGroup){
				layer.getLayers().forEach((lyr,index,array) => {
					if (lyr.get('title') === layers.COMARQUES_LAYER && !selectLayers.COMARQUES_LAYER ||
						lyr.get('title') === layers.MUNICIPIS_LAYER && !selectLayers.MUNICIPIS_LAYER){

						console.log('delete LayerGroup '+ lyr.get('title'));
						map.removeLayer(lyr);
						lyr.setVisible(false);
					} 
					
				});
			} else {	
				if (selectedBaseLayer.ORTOFOTOMAPA_MAP && layer && layer.get('title') !== baseLayers.ORTOFOTOMAPA_MAP ||
					selectedBaseLayer.TOPOGRAFIC_MAP && layer && layer.get('title') !== baseLayers.TOPOGRAFIC_MAP){
						console.log('delete '+ layer.get('title'));
						map.removeLayer(layer);
						layer.setVisible(false);
				} 
			}
		});
	},[selectedBaseLayer , selectLayers.COMARQUES_LAYER , selectLayers.MUNICIPIS_LAYER])

	//HANDLER OPACITY LAYERS
	useEffect(() => {
		if (!map) return;
		map.getLayers().forEach(layer => {
			if (layer instanceof LayerGroup){
				layer.getLayers().forEach((lyr,index,array) => {
					if (opacityLayer.dom_element?.parentElement.firstElementChild.value == lyr.get('title') ){
						layer.setOpacity(parseFloat(opacityLayer.value));
					}
				});
			} else {	
				if (opacityLayer.dom_element?.parentElement.firstElementChild.value == layer.get('title') ){
					layer.setOpacity(parseFloat(opacityLayer.value));
				}
			}
		});
	},[opacityLayer.value])

	return null;
};

export default BaseLayers;
