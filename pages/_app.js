import '../styles/globals.css'
import React from 'react';
import Script from 'next/script'
import  MapContextProvider  from '../store/contexts/MapContextProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" />
      <MapContextProvider>
        <Component {...pageProps} />
      </MapContextProvider>
    </>
  ) 
}

export default MyApp
