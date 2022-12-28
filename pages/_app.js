import '../styles/globals.css'
import React from 'react';
import Script from 'next/script'
import  MapContextProvider  from '../store/contexts/MapContextProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/*<Script src="https://cdn.jsdelivr.net/npm/elm-pep@1.0.6/dist/elm-pep.js"></Script>*/}
      <MapContextProvider>
        <Component {...pageProps} />
      </MapContextProvider>
    </>
  ) 
}

export default MyApp
