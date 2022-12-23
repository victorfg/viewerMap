import '../styles/globals.css'
import React from 'react';
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" />
      <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
