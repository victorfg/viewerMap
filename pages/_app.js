import '../styles/globals.css'
import React from 'react';
import Script from 'next/script'
import  MapContextProvider  from '../store/contexts/MapContextProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" />
      <Script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'/>
      <MapContextProvider>
        <Component {...pageProps} />
      </MapContextProvider>
    </>
  ) 
}

export default MyApp
