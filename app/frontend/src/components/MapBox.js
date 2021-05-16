import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactMapGL, { Layer, Marker, Popup, Source } from "react-map-gl";
import { areaLayer, highlightLayer } from "../utils/mapbox/mapStyle";

import MapBoxCategory from "./MapBoxCategory";
import axios from "axios";

const MapboxAccessToken = process.env.REACT_APP_MAPBOX;

/**
 * `/monitoring`에서 지도를 구성한다.
 * @param {Object} data KoreaDistrict.geojson에서 Fetch한 데이터
 * @return {HTMLElement} Mapbox 컴포넌트
 */
function MapBox({ data }) {
  // 지도의 시점
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

  // 지도 지역구 hover 기능 - hover 중인 지역구 표시
  // hoverInfo - 지역구 정보 저장
  const [hoverInfo, setHoverInfo] = useState(null);

  // Todo : 지역구 어린이집 사건·사고에 대한 레이블 정보 추가
  const hoverHandler = useCallback((e) => {
    const hoverArea = e.features && e.features[0];
    setHoverInfo({
      longitude: e.lngLat[0],
      latitude: e.lngLat[1],
      districtName: hoverArea && hoverArea.properties.sggnm,
      childHouseCnt: hoverArea && hoverArea.properties.childHouseCnt,
    });
  }, []);
  const selectedDistrict = (hoverInfo && hoverInfo.districtName) || "";
  const filter = useMemo(
    () => ["in", "sggnm", selectedDistrict],
    [selectedDistrict]
  );

  // 지도 지역구 click 기능 - 지역구 내에 있는 어린이집 데이터를 통한 설정
  // childHouseInfo - 어린이집 정보 저장
  const [childHouseInfo, setChildHouseInfo] = useState(null);

  const clickHandler = useCallback(async () => {
    try {
      const fetchChildHouse = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/api/centers?region=${selectedDistrict}`
      );
      setChildHouseInfo(fetchChildHouse.data);
    } catch (err) {
      console.error(err);
    }
  }, [selectedDistrict]);

  return (
    <>
      {/* 지도 렌더링 */}
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onHover={hoverHandler}
        onClick={clickHandler}
        mapboxApiAccessToken={MapboxAccessToken}
      >
        {/* geojson 데이터를 통해 영역 설정 및 스타일 설정 */}
        <Source type="geojson" data={data}>
          <Layer {...areaLayer} />
          <Layer {...highlightLayer} filter={filter} />
        </Source>
        {/* 팝업 메세지로 행정구역의 정보 표시 */}
        {/* Todo : 툴팁 메세지 정보 - 지역구, 사건·사고 유형, 발생건수 추가 */}
        {selectedDistrict && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            closeButton={false}
            className="popup"
          >
            <h1>{selectedDistrict}</h1>
            <div>어린이집 개수 : {hoverInfo.childHouseCnt}</div>
          </Popup>
        )}
        {/* 어린이집 좌표 정보를 통해 마커 표시 */}
        {/* Todo : 사건·사고가 발생한 어린이집의 경우 다른 색상의 마커로 표시 */}
        {childHouseInfo &&
          childHouseInfo.map((childHouse, index) => (
            <Marker
              key={index}
              latitude={Number(childHouse.lat)}
              longitude={Number(childHouse.lng)}
              className="marker"
            />
          ))}
      </ReactMapGL>
      <MapBoxCategory />
    </>
  );
}
export default MapBox;
