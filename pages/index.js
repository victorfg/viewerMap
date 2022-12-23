import { useState, useRef, useEffect } from "react";
import { motion, useCycle } from "framer-motion";
import MenuComponent from "../components/map/Menu/MenuComponent";
import { Layers, BaseLayers, GroupLayers, VectorLayer } from "../components/map/Layers";
import { topo, orto, comarques,municipis } from "../components/map/Source";
import { baseLayers, layers } from "../components/map/Utils/Constants";
import { Controls, FullScreenControl } from "../components/map/Controls";
import Map from "../components/map/Map";
import { useDimensions } from "../hooks/customHooks";
import {NavigationItems} from '../components/menu/NavigationItems'
import MenuToggle from '../components/menu/MenuToogle'
import {sidebarTransition} from '../components/constants'

export default function Home() {
  const [openMenuOptions, setOpenMenuOptions] = useState(false);
  const [selectedBaseLayer, setSelectedBaseLayer] = useState({ ORTOFOTOMAPA_MAP: true, TOPOGRAFIC_MAP: false });
  const [selectLayers, setSelectLayers] = useState({ COMARQUES_LAYER:false, MUNICIPIS_LAYER:false });
  const [opacityLayer, setOpacityLayer] = useState({dom_element: null, value: null});
  const [usersData, setUsersData] = useState(null);

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const handlerRadioButtonsBaseLayer = (ev) => {
      let newObj = {
          TOPOGRAFIC_MAP: ev.value == baseLayers.TOPOGRAFIC_MAP ? ev.checked : !ev.checked,
          ORTOFOTOMAPA_MAP: ev.value == baseLayers.ORTOFOTOMAPA_MAP ? ev.checked : !ev.checked
      }
      setSelectedBaseLayer(newObj);
  }

  const handlerCheckButtonsLayers = (ev) => {
      switch (ev.value) {
          case layers.COMARQUES_LAYER:
              setSelectLayers((prevState) => ({
                  ...prevState,
                  COMARQUES_LAYER: ev.checked
              }));
              break;
      
          case layers.MUNICIPIS_LAYER:
              setSelectLayers((prevState) => ({
                  ...prevState,
                  MUNICIPIS_LAYER: ev.checked
              }));
              break;
      }
  }

  const handlerOpacityLayer = (ev) => {
      let newObj = {
          dom_element: ev,
          value: ev.value
      }
      setOpacityLayer(newObj);
  }
  try {
    return (
        <div className="grid-container">
            <MenuComponent 
                selectedBaseLayer={selectedBaseLayer} 
                openMenuOptions={openMenuOptions}
                handlerRadioButtonsBaseLayer={handlerRadioButtonsBaseLayer}
                handlerCheckButtonsLayers={handlerCheckButtonsLayers}
                handlerOpacityLayer={handlerOpacityLayer}
            />    
            <div id="map" className="map">
                <div id="popup" className="ol-popup">
                    <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                    <div id="popup-content"></div>
                </div>
                <motion.nav
                    className="menu"
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    custom={height}
                    ref={containerRef} 
                >
                    <motion.div className="background" variants={sidebarTransition} />
                    <NavigationItems />
                    <MenuToggle toggle={() => toggleOpen()} />
                    {/*<div id="menuLeft" className="bar-menu-left" onClick={() => setOpenMenuOptions(prevState => !prevState)}>
                        <svg className="h-8 w-8"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </div>*/}            
                </motion.nav>
                <Map 
                    selectedBaseLayer={selectedBaseLayer} 
                    selectLayers={selectLayers}
                    opacityLayer={opacityLayer}
                >
                    
                    <Controls>
                        <FullScreenControl />
                    </Controls>
                </Map>
            </div>
        </div>
      ); 
  } catch (error) {
    console.log(error)
  }
}