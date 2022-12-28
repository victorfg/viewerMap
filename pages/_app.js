import '../styles/globals.css'
import React from 'react';
import  MapContextProvider  from '../store/contexts/MapContextProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MapContextProvider>
        <Component {...pageProps} />
      </MapContextProvider>
    </>
  ) 
}

export default MyApp
