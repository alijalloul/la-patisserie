import React from "react";
import { getMapboxToken } from "./actions/getMapToken";
import Map from "./Map";

const MapContainer = async () => {
  const mapboxToken = await getMapboxToken();

  console.log("client env", mapboxToken);

  return <Map mapboxToken={mapboxToken} />;
};

export default MapContainer;
