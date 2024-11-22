import React from "react";
import { getMapboxToken } from "./actions/getMapToken";
import Map from "./Map";

const MapContainer = async () => {
  const mapboxToken = await getMapboxToken();

  return <Map mapboxToken={mapboxToken} />;
};

export default MapContainer;
