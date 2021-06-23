import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactMapGL, { Layer, Marker, Popup, Source } from "react-map-gl";
import {
  reset,
  setGeojsonData,
  sggClick,
  sggHover,
  sidoClick,
  sidoHover,
} from "../modules/mapboxEvent";
import {
  sggHighlightLayer,
  sggLayer,
  sidoHighlightLayer,
  sidoLayer,
} from "../utils/mapbox/mapStyle";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import MapBoxCategory from "./MapBoxCategory";
import districtViewport from "../utils/mapbox/districtViewport";

const MapboxAccessToken = process.env.REACT_APP_MAPBOX;

/**
 * `/monitoring`에서 지도를 구성
 *
 * @param {Object} data KoreaDistrict.geojson 파일에서 Fetch한 행정구역 영역 데이터
 * @return {JSX.element} Mapbox 컴포넌트
 */
function MapBox({ geojson }) {
  // 지도 초기화 (props 할당, Redux 상태 구독, ViewPort 초기화)
  const districtArea = geojson;

  /*
   * MapBox 컴포넌트에서 사용하는 상태
   * - level : 도, 광역시 / 시,군,구의 기능을 구분
   * - hoverInfo : hover 이벤트 간 발생하는 정보
   * - geojsonData : 행정구역을 렌더링하기 위핸 geojson 데이터
   * - cdrCentersInfo : 시,군,구 내에 있는 어린이집 정보
   * - error : 발생한 에러
   */
  const {
    data: { level, hoverInfo, geojsonData, cdrCentersInfo },
    error,
  } = useSelector((state) => state.mapboxEventReducer, shallowEqual);
  const dispatch = useDispatch();

  const [viewport, setViewport] = useState({
    width: "100%",
    height: 800,
    latitude: districtViewport["대한민국"].lat,
    longitude: districtViewport["대한민국"].lng,
    zoom: districtViewport["대한민국"].zoom,
  });

  useEffect(() => {
    dispatch(reset(districtArea));
    return {
      geojson,
      Layer,
    };
  }, [dispatch, districtArea, geojson]);

  if (!geojsonData) dispatch(setGeojsonData(districtArea));

  /*
   * 지도 지역구 hover 이벤트 핸들러
   * - level 1 : 도, 광역시 지역구 정보 표시
   * - level 2 : 시,군,구 정보 표시
   * - 이벤트 처리 후 hoverInfo와 level을 기반으로 선택중인 지역구에 대한 정보(selectedDistrictInfo)와 필터링할 내용(filter) 업데이트
   */

  // Todo : 지역구 어린이집 사건·사고에 대한 레이블 정보 추가
  const hoverHandler = useCallback(
    (e) => {
      if (e.features.length !== 0) {
        if (level === 1) dispatch(sidoHover(e));
        else if (level === 2) dispatch(sggHover(e));
      }
    },
    [level, dispatch]
  );
  const selectedDistrictInfo = useMemo(() => {
    return {
      name: (hoverInfo && hoverInfo.districtName) || "",
      code: (hoverInfo && hoverInfo.districtCode) || "",
    };
  }, [hoverInfo]);

  const filter = useMemo(
    () => ["in", level === 1 ? "sidonm" : "sggnm", selectedDistrictInfo.name],
    [level, selectedDistrictInfo]
  );

  /*
   * 지도 지역구 click 이벤트 핸들러
   * - level 1 : 도, 광역시 내에 있는 시,군,구만 선택한 후 level 2 로 설정
   * - level 2 : 시,군,구 내에 있는 어린이집 정보 설정
   */
  const clickHandler = useCallback(() => {
    try {
      if (selectedDistrictInfo.name !== "") {
        if (level === 1) {
          dispatch(sidoClick(districtArea, selectedDistrictInfo));

          setViewport({
            width: "100%",
            height: 800,
            latitude: districtViewport[selectedDistrictInfo.name].lat,
            longitude: districtViewport[selectedDistrictInfo.name].lng,
            zoom: districtViewport[selectedDistrictInfo.name].zoom,
          });
        } else if (level === 2) {
          const sggnmFind = geojsonData.features.find(
            (data) => data.properties.sggnm === selectedDistrictInfo.name
          );
          if (sggnmFind) dispatch(sggClick(selectedDistrictInfo));
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [selectedDistrictInfo, level, dispatch, districtArea, geojsonData]);

  /*
   * Reset 버튼 click 이벤트 핸들러
   * - level과 geojson 데이터를 도, 광역시 기준으로 초기화
   */
  const resetClickHandler = useCallback(() => {
    setViewport({
      width: "100%",
      height: 800,
      latitude: districtViewport["대한민국"].lat,
      longitude: districtViewport["대한민국"].lng,
      zoom: districtViewport["대한민국"].zoom,
    });
    dispatch(reset(districtArea));
  }, [dispatch, districtArea]);

  if (error) <div>지도 오류 발생</div>;

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
        {geojsonData && level && (
          <Source type="geojson" data={geojsonData}>
            {level === 1 && <Layer {...sidoLayer} />}
            {level === 1 && <Layer {...sidoHighlightLayer} filter={filter} />}

            {level === 2 && <Layer {...sggLayer} />}
            {level === 2 && <Layer {...sggHighlightLayer} filter={filter} />}
          </Source>
        )}
        {/* 팝업 메세지로 행정구역의 정보 표시 */}
        {/* Todo : 툴팁 메세지 정보 - 지역구, 사건·사고 유형, 발생건수 추가 */}
        {selectedDistrictInfo.name !== "" && hoverInfo && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            closeButton={false}
            className="popup"
          >
            <h1>{selectedDistrictInfo.name}</h1>
            <div>어린이집 개수 : {hoverInfo.districtCount}</div>
          </Popup>
        )}
        {/* 어린이집 좌표 정보를 통해 마커 표시 */}
        {/* Todo : 사건·사고가 발생한 어린이집의 경우 다른 색상의 마커로 표시 */}
        {cdrCentersInfo &&
          cdrCentersInfo.map((cdrCenter, index) => (
            <Marker
              key={index}
              latitude={Number(cdrCenter.latitude)}
              longitude={Number(cdrCenter.longitude)}
              className="marker"
            />
          ))}
      </ReactMapGL>
      {/* 어린이집 개수에 기반한 범주 */}
      {level && <MapBoxCategory level={level} />}
      {/* 도, 광역시 기준으로 초기화하는 버튼 */}
      <button onClick={resetClickHandler} className="reset-button">
        Reset
      </button>
    </>
  );
}
export default MapBox;
