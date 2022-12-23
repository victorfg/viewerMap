import { useRef, useState, useEffect } from "react"
import MapContext from "./MapContext";
import * as ol from "ol";
import {get as getProjection} from 'ol/proj';
import LayerGroup from 'ol/layer/Group';
import { baseLayers, layers } from "../Utils/Constants";

const Map = ({selectedBaseLayer, selectLayers, opacityLayer,children }) => {
	

	return (
		<div>TEST</div>
	)
}

export default Map;
