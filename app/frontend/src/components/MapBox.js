import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactMapGL, { Popup, Layer, Source, Marker } from "react-map-gl";
import { areaLayer, highlightLayer } from "../utils/mapbox/mapStyle";
import xmlParser from "../utils/mapbox/xmlParser";
import MapBoxCategory from "./MapBoxCategory";

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

  // map 구역 hover 기능 - hover 중인 지역구 표시
  const [hoverInfo, setHoverInfo] = useState(null);

  // Todo : 지역구 어린이집 사건·사고에 대한 레이블 정보 추가
  const hoverHandler = useCallback((e) => {
    const hoverArea = e.features && e.features[0];
    setHoverInfo({
      longitude: e.lngLat[0],
      latitude: e.lngLat[1],
      areaName: hoverArea && hoverArea.properties.sggnm,
      childHouseCnt: hoverArea && hoverArea.properties.childHouseCnt,
    });
  }, []);
  const selectedArea = (hoverInfo && hoverInfo.areaName) || "";
  const filter = useMemo(() => ["in", "sggnm", selectedArea], [selectedArea]);

  // map 구역 click 기능 - 지역구 내에 있는 어린이집 데이터를 통한 설정
  const [childHouseInfo, setChildHouseInfo] = useState(null);

  const clickHandler = useCallback(async () => {
    // Todo : selectedArea를 시군구 코드로 변환 후 그에 맞춰 DB에서 어린이집 데이터 fetch
    const area = {
      은평구: "Eunpyeonggu",
      종로구: "Jongnogu",
    };
    try {
      if (selectedArea === "은평구" || selectedArea === "종로구") {
        const fetchChildHouse = await axios.get(
          `/src/assets/data/${area[selectedArea]}_childhouse_data.xml`
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
    <>
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
      {/* Todo : 툴팁 메세지 정보 - 지역구, 사건·사고 유형, 발생건수 추가 */}
      {selectedArea && (
        <Popup
          longitude={hoverInfo.longitude}
          latitude={hoverInfo.latitude}
          closeButton={false}
          className="popup"
        >
          <h1>{selectedArea}</h1>
          <div>어린이집 개수 : {hoverInfo.childHouseCnt}</div>
        </Popup>
      )}
      {/* Todo : 마커 표시 - 사건·사고가 발생한 어린이집의 경우 다른 색상의 마커로 표시 */}
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
    <MapBoxCategory />
    </>
  );
}
export default MapBox;
