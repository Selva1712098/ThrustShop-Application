// import React from 'react';
// import { GoogleMap, LoadScript, Marker, useLoadScript } from '@react-google-maps/api';

// const Location = () => {
//   const mapContainerStyle = {
//     width: '100%',
//     height: '400px',
//   };

//   const center = {
//     lat: 13.082680,
//     lng: 80.270721,
//   };

//   const markerPosition = {
//     lat: 13.082680,
//     lng: 80.270721,
//   };

//   const {} = useLoadScript({
//     googleMapsApiKey: "AIzaSyDfKTA6DR3bkmi2nVaIlQ3AqonHKQI-NzE"
//   });

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyDfKTA6DR3bkmi2nVaIlQ3AqonHKQI-NzE">
//       <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
//         <Marker position={markerPosition} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default Location;
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Location.css";


export default function Location() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 13, lng: 80 }), []);



  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}