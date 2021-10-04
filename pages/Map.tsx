import { AppProps } from 'next/app'
import { CSSProperties, useEffect } from 'react'
import { StyleObject } from '../types'

const Styles: StyleObject = {
  FullScreen: {
    width: '100%',
    height: '100%'
  }
}

export default function Map ({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const container = document.getElementById('kakao-map')
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    }
    const map = new kakao.maps.Map(container, options)
  }, [])

  return (
    <div id="kakao-map" style={Styles.FullScreen} />
  )
}
