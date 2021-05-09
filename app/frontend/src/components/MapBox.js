import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactMapGL, { Popup, Layer, Source, Marker } from "react-map-gl";
import { areaLayer, highlightLayer } from "../utils/mapbox/mapStyle";
import xmlParser from "../utils/mapbox/xmlParser";

const MapboxAccessToken = process.env.REACT_APP_MAPBOX;

function MapBox({ data }) {
  const [viewport, setViewport] = useState({
    width: 1200,
    height: 800,
    latitude: 37.5642135,
    longitude: 127.0016985,
    zoom: 10.5,
  });
  useEffect(() => {
    return { data };
  }, [data]);

  // map 구역 hover 기능
  const [hoverInfo, setHoverInfo] = useState(null);

  const hoverHandler = useCallback((e) => {
    const hoverArea = e.features && e.features[0];
    setHoverInfo({
      longitude: e.lngLat[0],
      latitude: e.lngLat[1],
      areaName: hoverArea && hoverArea.properties.sggnm,
    });
  }, []);
  const selectedArea = (hoverInfo && hoverInfo.areaName) || "";
  const filter = useMemo(() => ["in", "sggnm", selectedArea], [selectedArea]);

  // map 구역 click 기능
  const [childHouseInfo, setChildHouseInfo] = useState(null);

  const clickHandler = useCallback(async () => {
    // Todo : selectedArea를 시군구 코드로 변환 후 그에 맞춰 DB에서 fetch
    try {
      if (selectedArea === "은평구") {
        const fetchChildHouse = await axios.get(
          "/src/assets/data/Eunpyeonggu_childhouse_data.xml"
        );
        xmlParser(fetchChildHouse.data).then((data) => {
          const childHouse = data.response.item.filter(
            (element) => element.crcargbname[0] === "운영"
          );
          setChildHouseInfo(childHouse);
        });
      } else {
        setChildHouseInfo(null);
      }
    } catch (err) {
      console.err(err);
    }
  }, [selectedArea]);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onHover={hoverHandler}
      onClick={clickHandler}
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
          className="popup"
        >
          {selectedArea}
        </Popup>
      )}
      {childHouseInfo &&
        childHouseInfo.map((childHouse, index) => (
          <Marker
            key={index}
            latitude={Number(childHouse.la[0])}
            longitude={Number(childHouse.lo[0])}
            className="marker"
          />
        ))}
    </ReactMapGL>
  );
}
export default MapBox;
