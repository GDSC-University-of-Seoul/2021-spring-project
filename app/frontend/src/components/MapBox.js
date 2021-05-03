import dotenv from "dotenv";
import React, { useState } from "react";
import ReactMapGL, { Layer, Source } from "react-map-gl";

dotenv.config();
const MapboxAccessToken = process.env.REACT_APP_MAPBOX;

const layerStyle = {
  id: "data",
  type: "fill",
  paint: {
    "fill-outline-color": "#ff0000",
    "fill-color": "#04e40f",
    "fill-opacity": 0.8,
  },
};

function MapBox({ data }) {
  const [viewport, setViewport] = useState({
    width: 1200,
    height: 800,
    latitude: 37.5642135,
    longitude: 127.0016985,
    zoom: 10.5,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={MapboxAccessToken}
    >
      <Source type="geojson" data={data}>
        <Layer {...layerStyle} />
      </Source>
    </ReactMapGL>
  );
}
export default MapBox;
