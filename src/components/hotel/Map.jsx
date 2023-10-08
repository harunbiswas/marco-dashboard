import React, { useMemo } from "react";
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";


function Map({ lat, lng }) {
  const MapComponent = withGoogleMap((prop) => {
    console.log(prop);
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat, lng } ?? { lat: -34.397, lng: 150.644 }}
      >
        <Marker position={{ lat, lng } ?? { lat: -34.397, lng: 150.644 }} />
      </GoogleMap>
    );
  });
  const memoizedMapComponent = useMemo(
    () => (
      <MapComponent
        containerElement={<div style={{ height: "400px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        lat={lat}
        lng={lng}
      />
    ),
    [lat, lng]
  );

  return <div className="map">{memoizedMapComponent}</div>;
}

export default Map;
