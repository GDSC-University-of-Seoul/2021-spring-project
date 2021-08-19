import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactMapGL, { Layer, Marker, Popup, Source } from "react-map-gl";
import {
  getSggHighlightLayer,
  getSggLayer,
  getSidoHighlightLayer,
  getSidoLayer,
} from "../utils/mapStyle";
import {
  markerClick,
  resetDistrict,
  setGeojsonData,
  sggClick,
  sggHover,
  sidoClick,
  sidoHover,
} from "../modules/mapboxEvent";
import { resetCdrCenter, setCdrCenter } from "../modules/cdrCenter";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Button } from "@material-ui/core";
import MapBoxCategory from "./MapBoxCategory";
import districtViewport from "../utils/districtViewport";

const MapboxAccessToken = process.env.REACT_APP_MAPBOX;

/**
 * `/monitoring`에서 지도를 구성
 *
 * @param {Object} data KoreaDistrict.geojson 파일에서 Fetch한 행정구역 영역 데이터
 * @return {JSX.element} Mapbox 컴포넌트
 */
function MapBox({ geojson }) {
  // 지도 초기화 (props 할당, Redux 상태 구독, ViewPort 초기화)

  const [districtArea] = useState(geojson);
  /*
   * MapBox 컴포넌트에서 사용하는 상태
   * - level : 도, 광역시 / 시,군,구의 기능을 구분
   * - popupInfo : hover 이벤트 간 발생하는 정보
   * - geojsonData : 행정구역을 렌더링하기 위핸 geojson 데이터
   * - cdrCentersInfo : 시,군,구 내에 있는 어린이집 정보
   * - error : 발생한 에러
   */
  const {
    data: { level, popupInfo, geojsonData, cdrCentersInfo },
    error,
  } = useSelector((state) => state.mapboxEventReducer, shallowEqual);
  const dispatch = useDispatch();

  /*
   * 사용자 영역 기준 변경 정보 → 영역 색상 렌더링에 사용
   * - sidoControl : 도,광역시 영역 기준
   * - sggControl : 시,군,구 영역 기준
   */
  const { sidoControl, sggControl } = useSelector(
    (state) => state.mapboxCategoryReducer
  );

  const [viewport, setViewport] = useState({
    width: 770,
    height: 800,
    latitude: districtViewport["대한민국"].lat,
    longitude: districtViewport["대한민국"].lng,
    zoom: districtViewport["대한민국"].zoom,
  });

  // geojsonData 를 dependency 배열에 넣으면 시군구 기능이 정상적으로 동작하지 않음
  /* eslint-disable */
  useEffect(() => {
    dispatch(resetDistrict(districtArea));
    if (!geojsonData) dispatch(setGeojsonData(districtArea));

    return {
      geojson,
      Layer,
    };
  }, [dispatch, districtArea, geojson]);

  /*
   * 지도 지역구 hover 이벤트 핸들러
   * - level 1 : 도, 광역시 지역구 정보 표시
   * - level 2 : 시,군,구 정보 표시
   * - 이벤트 처리 후 popupInfo와 level을 기반으로 선택중인 지역구에 대한 정보(selectedDistrictInfo)와 필터링할 내용(filter) 업데이트
   */
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
      name: (popupInfo && popupInfo.districtName) || "",
      code: (popupInfo && popupInfo.districtCode) || "",
    };
  }, [popupInfo]);

  const filter = useMemo(
    () => ["in", level === 1 ? "sidonm" : "sggnm", selectedDistrictInfo.name],
    [level, selectedDistrictInfo]
  );

  /*
   * 지도 지역구 click 이벤트 핸들러
   * - level 1 : 도, 광역시 내에 있는 시,군,구만 선택한 후 level 2 로 설정
   * - level 2 : 시,군,구 내에 있는 어린이집 정보 설정
   */
  const districtClickHandler = useCallback(() => {
    try {
      if (selectedDistrictInfo.name !== "") {
        if (level === 1) {
          dispatch(sidoClick(districtArea, selectedDistrictInfo));

          setViewport({
            width: 770,
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

  const markerClickHandler = useCallback(
    (e) => {
      if (e.target) {
        const cdrCenterId = e.target.classList[2];
        const markerInfo = cdrCentersInfo.filter(
          (data) => data.center_id === cdrCenterId
        );
        dispatch(markerClick(markerInfo[0]));
        dispatch(setCdrCenter(markerInfo[0]));
      }
    },
    [dispatch, cdrCentersInfo]
  );
  /*
   * Reset 버튼 click 이벤트 핸들러
   * - level과 geojson 데이터를 도, 광역시 기준으로 초기화
   */
  const resetClickHandler = useCallback(() => {
    setViewport({
      width: 770,
      height: 800,
      latitude: districtViewport["대한민국"].lat,
      longitude: districtViewport["대한민국"].lng,
      zoom: districtViewport["대한민국"].zoom,
    });
    dispatch(resetDistrict(districtArea));
    dispatch(resetCdrCenter());
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
        onClick={districtClickHandler}
        mapboxApiAccessToken={MapboxAccessToken}
      >
        {/* geojson 데이터를 통해 영역 설정 및 스타일 설정 */}
        {geojsonData && level && (
          <Source type="geojson" data={geojsonData}>
            {level === 1 && <Layer {...getSidoLayer(sidoControl.diff)} />}
            {level === 1 && (
              <Layer
                {...getSidoHighlightLayer(sidoControl.diff)}
                filter={filter}
              />
            )}

            {(level === 2 || level == 3) && (
              <Layer {...getSggLayer(sggControl.diff)} />
            )}
            {(level === 2 || level == 3) && (
              <Layer
                {...getSggHighlightLayer(sggControl.diff)}
                filter={filter}
              />
            )}
          </Source>
        )}
        {/* 팝업 메세지로 행정구역의 정보 표시 */}
        {selectedDistrictInfo.name !== "" && popupInfo && (
          <Popup
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            closeButton={false}
            className="popup"
          >
            <h2>{popupInfo.districtName}</h2>
            {level == 3 ? (
              <ul className="popup-content">
                <li>사건·사고 건수 : {popupInfo.anomalyCount}건</li>
                <li>폭행 건수 : {popupInfo.assualtCount}건</li>
                <li>싸움 건수 : {popupInfo.fightCount}건</li>
                <li>실신 건수 : {popupInfo.swoonCount}건</li>
              </ul>
            ) : (
              <ul className="popup-content">
                <li>사건·사고 건수 : {popupInfo.districtCount}건</li>
              </ul>
            )}
          </Popup>
        )}
        {/* 어린이집 좌표 정보를 통해 마커 표시 */}
        <div className="marker-set" onClick={markerClickHandler}>
          {cdrCentersInfo &&
            cdrCentersInfo.map((cdrCenterInfo, index) => (
              <Marker
                key={index}
                latitude={Number(cdrCenterInfo.latitude)}
                longitude={Number(cdrCenterInfo.longitude)}
                className={`marker ${cdrCenterInfo.center_id}`}
              />
            ))}
        </div>
      </ReactMapGL>
      {/* 어린이집 개수에 기반한 범주 */}
      {level && (
        <>
          {/* 도, 광역시 기준으로 초기화하는 버튼 */}
          <MapBoxCategory level={level}>
            <Button
              className="reset-button"
              variant="contained"
              color="primary"
              disableElevation
              onClick={resetClickHandler}
            >
              검색 초기화
            </Button>
          </MapBoxCategory>
        </>
      )}
    </>
  );
}
export default MapBox;
