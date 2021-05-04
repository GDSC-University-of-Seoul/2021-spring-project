import React, { useCallback, useMemo, useState } from "react";
import ReactMapGL, { Popup, Layer, Source } from "react-map-gl";
import { areaLayer, highlightLayer } from "../utils/mapbox/mapStyle";

const MapboxAccessToken = process.env.REACT_APP_MAPBOX;

function MapBox({ data }) {
  const [viewport, setViewport] = useState({
    width: 1200,
    height: 800,
    latitude: 37.5642135,
    longitude: 127.0016985,
    zoom: 10.5,
  });
  const [hoverInfo, setHoverInfo] = useState(null);

  const onHover = useCallback((e) => {
    const hoverArea = e.features && e.features[0];
    setHoverInfo({
      longitude: e.lngLat[0],
      latitude: e.lngLat[1],
      areaName: hoverArea && hoverArea.properties.sggnm,
    });
  }, []);
  const selectedArea = (hoverInfo && hoverInfo.areaName) || "";
  const filter = useMemo(() => ["in", "sggnm", selectedArea], [selectedArea]);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onHover={onHover}
      mapboxApiAccessToken={MapboxAccessToken}
    >
      <Source type="geojson" data={data}>
        <Layer {...areaLayer} />
        <Layer {...highlightLayer} filter={filter} />
      </Source>
      {selectedArea && (
        <Popup
          longitude={hoverInfo.longitude}
          latitude={hoverInfo.latitude}
          closeButton={false}
          className="areaInfo"
        >
          {selectedArea}
        </Popup>
      )}
    </ReactMapGL>
  );
}
export default MapBox;
