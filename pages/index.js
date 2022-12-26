import { useState, useRef, useEffect } from "react";
import Script from 'next/script'
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
import useDeviceDetect from '../hooks/customHooks'
import { SidebarMobile } from "../components/menu/SidebarMobile";
import {FullScreen, defaults as defaultControls} from 'ol/control.js'


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
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
		let setView = new ol.View({
			center: [396905,4618292],
			zoom: 3,
			projection: setExtension(),
			extent: cataloniaCoord
		})
		setViewCatalonia(setView); 
		setMapObject(new ol.Map({controls:[],interactions: null, view: setView}));
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

  const handlerRadioButtonsBaseLayer = (layerSelec) => {
      let newObj = {
          TOPOGRAFIC_MAP: layerSelec == baseLayers.TOPOGRAFIC_MAP,
          ORTOFOTOMAPA_MAP: layerSelec == baseLayers.ORTOFOTOMAPA_MAP
      }
      setSelectedBaseLayer(newObj);
  }

  const handlerCheckButtonsLayers = (layerSelec) => {
      switch (layerSelec) {
          case layers.COMARQUES_LAYER:
              setSelectLayers((prevState) => ({
                  ...prevState,
                  COMARQUES_LAYER: !prevState.COMARQUES_LAYER
              }));
              break;
      
          case layers.MUNICIPIS_LAYER:
              setSelectLayers((prevState) => ({
                  ...prevState,
                  MUNICIPIS_LAYER: !prevState.MUNICIPIS_LAYER
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

  const onClickMap = (ev) => {
    if (isMobile && showSidebar){
        let myElement = document.getElementById('sidebarMobile');
        let bounding = myElement.getBoundingClientRect();
        if (bounding.width < ev.clientX){
            setShowSidebar(false);
        }
    }
  }

  return (
      <>   
        <Head>
            <title>My Map</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        </Head>
        <Script src="https://cdn.jsdelivr.net/npm/elm-pep@1.0.6/dist/elm-pep.js"></Script>
          <div id="map" className="map" onClick={onClickMap}>
              {/*<div id="popup" className="ol-popup">
                  <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                  <div id="popup-content"></div>
              </div>*/}
                {!isMobile && 
                    <>
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
                                    selectLayers={selectLayers}
                                />
                                <MenuToggle toggle={() => toggleOpen()} />          
                        </motion.nav>
                        <div className="general-zoom">
                            <Image src="/zoomGeneral.png" alt="me" width="40" height="40" onClick={setGeneralZoom} />
                        </div>
                    </>
                }
                {isMobile &&
                    <>
                        <div className="main-menu-mobile ">
                            <SidebarMobile 
                                handlerRadioButtonsBaseLayer={handlerRadioButtonsBaseLayer}
                                handlerOpacityLayer={handlerOpacityLayer}
                                handlerCheckButtonsLayers={handlerCheckButtonsLayers}
                                selectedBaseLayer={selectedBaseLayer}
                                selectLayers={selectLayers}
                                showSidebar={showSidebar}
                                setShowSidebar={setShowSidebar}
                            />
                        </div>
                    </>
                }
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