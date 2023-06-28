import React from 'react'
import {GoogleMap, useLoadScript} from '@react-google-maps/api'

export default function GoogleMapLocation() {
    const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyCVi9b69930B3id6SBzXv0SfgxHKNOprvY"})
    if (!isLoaded) return <p>loading...</p>
  return (
    <div>
        {/* {!isLoaded && <p>"loading..."</p>} */}
      <GoogleMap zoom={10} center={{lat:44, lng:-80}} mapContainerClassName='aaa'></GoogleMap>
    </div>
  )
}
