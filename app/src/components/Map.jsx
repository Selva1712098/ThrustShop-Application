import React from "react";
import { GoogleMap, LoadScript, Marker } from "react-google-maps";

const Map = (props) => {
  const { apiKey, center, zoom, markerPosition } = props;

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} center={center} zoom={zoom}>
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
