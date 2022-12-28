import VectorLayer from "ol/layer/Vector";
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Geolocation from 'ol/Geolocation.js';
import Point from 'ol/geom/Point.js';
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import {Fill, Stroke, Style} from 'ol/style.js';

import { useState, useRef, useEffect } from "react";
import Script from 'next/script'
import Head from 'next/head'
import Image from 'next/image'
import { motion, useCycle } from "framer-motion";
import { Layers, BaseLayers, GroupLayers } from "../components/map/Layers";
import { topo, orto, comarques,municipis } from "../components/map/Source";
import { baseLayers, layers, cataloniaCoord } from "../components/map/Utils/Constants";
import MapCustom from "../components/map/Map";
import useDeviceDetect, { useDimensions } from "../hooks/customHooks";
import {NavigationItems} from '../components/menu/NavigationItems'
import MenuToggle from '../components/menu/MenuToogle'
import {sidebarTransition} from '../components/constantsTransitions'
import { setProjection_EPSG_25831, setExtension } from '../components/map/Utils/Functions'
import { useMapContext } from '../store/contexts/MapContextProvider';
import { SidebarMobile } from "../components/menu/SidebarMobile";
//import * as ol from "ol";
//import Geolocation from 'ol/Geolocation.js';


export default function HomeMap() {
  setProjection_EPSG_25831();
  const { 
		mapObject,
		viewCatalonia, 
		geolocationCat,
		setMapObject, 
		setViewCatalonia, 
		setGeolocationCat,
		positionFeature,
        setMarkePoristion 
	} = useMapContext();

  const [selectedBaseLayer, setSelectedBaseLayer] = useState({ ORTOFOTOMAPA_MAP: true, TOPOGRAFIC_MAP: false });
  const [selectLayers, setSelectLayers] = useState({ COMARQUES_LAYER:false, MUNICIPIS_LAYER:false });
  const [opacityLayer, setOpacityLayer] = useState({dom_element: null, value: null});

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const { isMobile } = useDeviceDetect();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const cataloniaView = new View({
        center: [396905,4618292],
        zoom: 3,
        projection: setExtension(),
        extent: cataloniaCoord
    });
    const map = new Map({
        view: cataloniaView,
        controls:[]
    })
    const geolocation = new Geolocation({
        trackingOptions: {
            enableHighAccuracy: true,
        },
        projection: cataloniaView.getProjection(),
    });
    const test = new VectorLayer();
    
    setViewCatalonia(cataloniaView); 
    setGeolocationCat(geolocation); 
    setMapObject(map);
    setMarkePoristion(test);
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

  const setNorthPosition = () => {
    mapObject.getView().setRotation(0);
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

  const setGeolocationUser = () => {
		//example https://openlayers.org/en/latest/examples/geolocation.html
		const accuracyFeature = new Feature();

		geolocationCat.setTracking(true);

		geolocationCat.on('change:accuracyGeometry', function () {
			accuracyFeature.setGeometry(geolocationCat.getAccuracyGeometry());
		});

		geolocationCat.on('change:position', function () {
        const coordinates = geolocationCat.getPosition();
        positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);

        /*const markerPosition = new VectorLayer({
            source: new VectorSource({
                features: [accuracyFeature, positionFeature],
            }),
        });
        
        mapObject.addLayer(markerPosition);*/
		});
  }

  /*geolocationCat?.on('change', function () {
    console.log('accuracy ' + geolocationCat.getAccuracy() + ' [m]');
    console.log('altitude ' + geolocationCat.getAltitude() + ' [m]');
    console.log('altitudeAccuracy ' + geolocationCat.getAltitudeAccuracy() + ' [m]');
    console.log('heading ' + geolocationCat.getHeading() + ' [m]');
    console.log('speed ' + geolocationCat.getSpeed() + ' [m]');
  });

  geolocationCat?.on('error', function (error) {
    console.log(error.message);
  });*/

  return (
      <>   
        <Head>
            <title>My Map</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        </Head>

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
                    <div className="north-rotate-map">
                        <Image src="/north-rotate.png" alt="me" width="25" height="25" onClick={setNorthPosition}/>
                    </div>
                    <div className="geolocation-user">
                        <Image src="/location.png" alt="me" width="25" height="25" onClick={setGeolocationUser}/>
                    </div>
                </>
            }
            <MapCustom>
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
                    {/*<VectorLayerCustom />*/}
                
                </Layers>
                {/*<Controls>
                    <FullScreenControl />
                </Controls>*/}
            </MapCustom>
        </div>
      </>
  )
}