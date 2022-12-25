import { useState, useRef, useEffect } from "react";
import Head from 'next/head'
import { motion, useCycle } from "framer-motion";
import { Layers, BaseLayers, GroupLayers, VectorLayer } from "../components/map/Layers";
import { topo, orto, comarques,municipis } from "../components/map/Source";
import { baseLayers, layers } from "../components/map/Utils/Constants";
import Map from "../components/map/Map";
import { useDimensions } from "../hooks/customHooks";
import {NavigationItems} from '../components/menu/NavigationItems'
import MenuToggle from '../components/menu/MenuToogle'
import {sidebarTransition} from '../components/constantsTransitions'
import Image from 'next/image'
import * as ol from "ol";
import { setProjection_EPSG_25831, setExtension } from '../components/map/Utils/Functions'
import { useMapContext } from '../store/contexts/MapContextProvider';
import { cataloniaCoord } from "../components/map/Utils/Constants";
import Script from 'next/script'
import useDeviceDetect from '../hooks/customHooks'
import TileLayer from 'ol/layer/Tile.js';


export default function HomeMap() {
  setProjection_EPSG_25831();
  const { viewCatalonia,setMapObject, setViewCatalonia } = useMapContext();

  const [selectedBaseLayer, setSelectedBaseLayer] = useState({ ORTOFOTOMAPA_MAP: true, TOPOGRAFIC_MAP: false });
  const [selectLayers, setSelectLayers] = useState({ COMARQUES_LAYER:false, MUNICIPIS_LAYER:false });
  const [opacityLayer, setOpacityLayer] = useState({dom_element: null, value: null});

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

	const { isMobile } = useDeviceDetect();

  useEffect(() => {
		let setView = new ol.View({
			center: [396905,4618292],
			zoom: 3,
			projection: setExtension(),
			extent: cataloniaCoord
		})
		setViewCatalonia(setView); 
		setMapObject(new ol.Map({view: setView}));
  }, []);
                                                        
  useEffect(() => { 
		let generalZoom = document.querySelector(".general-zoom");
    if (generalZoom){
      setTimeout(() => {
        if (isOpen){
          generalZoom.style.zIndex = 0;
        } else {
          generalZoom.style.zIndex = 1;
        }
      }, 800);
    }
	}, [isOpen]);

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

  const setGeneralZoom = () => {
    viewCatalonia.animate({
      center: [396905,4618292],
      duration: 5000,
      extent: cataloniaCoord,
      zoom: 1,
    });
  }

  return (
      <>   
					<Head>
							<title>My Map</title>
							<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
					</Head>
					<Script src="https://cdn.jsdelivr.net/npm/elm-pep@1.0.6/dist/elm-pep.js"></Script>
          <div id="map" className="map">
              {/*<div id="popup" className="ol-popup">
                  <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                  <div id="popup-content"></div>
              </div>*/}
              {!isMobile && <div>
                <motion.nav
                    className={`menu ${isOpen ? 'z-10' : ''}`}
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    custom={height}
                    ref={containerRef} 
                >
                    <motion.div className={`background ${isOpen ? 'rounded-3xl' : ''}`} variants={sidebarTransition} />
                    <NavigationItems 
                      handlerRadioButtonsBaseLayer={handlerRadioButtonsBaseLayer}
                      handlerOpacityLayer={handlerOpacityLayer}
                      handlerCheckButtonsLayers={handlerCheckButtonsLayers}
                      selectedBaseLayer={selectedBaseLayer}
                    />
                    <MenuToggle toggle={() => toggleOpen()} />          
                </motion.nav>
                <div className="general-zoom"><Image src="/zoomGeneral.png" alt="me" width="40" height="40" onClick={setGeneralZoom} /></div>
              </div>}
							{isMobile && <div>CACA</div>}
              <Map>
                  <Layers>
                      {selectedBaseLayer.TOPOGRAFIC_MAP && (
                          <BaseLayers
                              source={topo()}
                              title={baseLayers.TOPOGRAFIC_MAP}
                              selectLayers={selectLayers}
                              selectedBaseLayer={selectedBaseLayer}
                              opacityLayer={opacityLayer} 
                          />
                      )}
                      {selectedBaseLayer.ORTOFOTOMAPA_MAP && (
                          <BaseLayers
                              source={orto()}
                              title={baseLayers.ORTOFOTOMAPA_MAP}
                              selectLayers={selectLayers}
                              selectedBaseLayer={selectedBaseLayer}
                              opacityLayer={opacityLayer} 
                          />
                      )}
                      
                      {selectLayers.COMARQUES_LAYER && (
                          <GroupLayers
                              source={comarques()}
                              title={layers.COMARQUES_LAYER}
                              selectedBaseLayer={selectedBaseLayer}
                          />
                      )}

                      {selectLayers.MUNICIPIS_LAYER && (
                          <GroupLayers
                              source={municipis()}
                              title={layers.MUNICIPIS_LAYER}
                              selectedBaseLayer={selectedBaseLayer}
                          />
                      )}
                      {/*<VectorLayer usersData={usersData}/>*/}
                  
                  </Layers>
                  {/*<Controls>
                      <FullScreenControl />
                  </Controls>*/}
              </Map>
          </div>
      </>
  )
}