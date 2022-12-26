import React from "react"
import InputLayerSelectorAndOpacity from "../Utils/InputComponents"
import { baseLayers, layers } from "../Utils/Constants";
import useDeviceDetect from '../../../hooks/customHooks'

const MenuComponent = (props) => {
    const { isMobile } = useDeviceDetect();
    return (
        <>
            <div className={`flex items-center ${isMobile ? ' text-lg' : ''}`}  >   
                <InputLayerSelectorAndOpacity 
                    type="radio"
                    name="baseLayerRadioButton" 
                    defaultValue={baseLayers.TOPOGRAFIC_MAP}
                    checked={props.selectedBaseLayer.TOPOGRAFIC_MAP}
                    onChange={props.handlerRadioButtonsBaseLayer}
                    className="cursor-pointer"
                    layerName="ICC Topo"
                    onChangeRange={event => props.handlerOpacityLayer(event.target)}
                />
            </div>
            <div className= {`flex items-center ${isMobile ? ' mt-5 text-lg' : ' mt-1'}`}  >
                <InputLayerSelectorAndOpacity
                    type="radio" 
                    name="baseLayerRadioButton" 
                    defaultValue={baseLayers.ORTOFOTOMAPA_MAP}
                    checked={props.selectedBaseLayer.ORTOFOTOMAPA_MAP}
                    onChange={props.handlerRadioButtonsBaseLayer}
                    className="cursor-pointer"
                    layerName="ICC Orto"
                    onChangeRange={event => props.handlerOpacityLayer(event.target)}
                />
            </div>
            <div className= {`flex items-center ${isMobile ? ' mt-5 text-lg' : ' mt-1'}`}  >
                <InputLayerSelectorAndOpacity
                    type="checkbox" 
                    name="comarquesCheckBox" 
                    defaultValue={layers.COMARQUES_LAYER}
                    onChange={props.handlerCheckButtonsLayers}
                    className="cursor-pointer"
                    layerName="Comarques"
                    id="comarques"
                    onChangeRange={event => props.handlerOpacityLayer(event.target)}
                    checked={props.selectLayers.COMARQUES_LAYER}
                />
            </div>
            <div className= {`flex items-center ${isMobile ? ' mt-5 text-lg' : ' mt-1'}`}  >
                <InputLayerSelectorAndOpacity
                    type="checkbox" 
                    name="municipisCheckBox" 
                    defaultValue={layers.MUNICIPIS_LAYER}
                    onChange={props.handlerCheckButtonsLayers}
                    className="cursor-pointer"
                    layerName="Municipis"
                    id="municipis"
                    onChangeRange={event => props.handlerOpacityLayer(event.target)}
                    checked={props.selectLayers.MUNICIPIS_LAYER}
                />
                
            </div>
        </>
    )
}

export default MenuComponent;