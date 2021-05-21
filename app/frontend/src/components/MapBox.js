import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactMapGL, { Layer, Marker, Popup, Source } from "react-map-gl";
import {
  sggHighlightLayer,
  sggLayer,
  sidoHighlightLayer,
  sidoLayer,
} from "../utils/mapbox/mapStyle";

import MapBoxCategory from "./MapBoxCategory";
import axios from "axios";
import districtViewport from "../utils/mapbox/districtViewport";
import { BsArrowCounterclockwise } from "react-icons/bs";

const MapboxAccessToken = process.env.REACT_APP_MAPBOX;

/**
 * `/monitoring`에서 지도를 구성
 *
 * @param {Object} data: KoreaDistrict.geojson 파일에서 Fetch한 행정구역 영역 데이터
 * @return {JSX.element} Mapbox 컴포넌트
 */
function SidoMapBox({ geojsonData }) {
  // 지도 초기화
  const districtArea = geojsonData;

  useEffect(() => {
    return { geojsonData, Layer };
  }, [geojsonData, Layer]);

  const [viewport, setViewport] = useState({
    width: 1200,
    height: 800,
    latitude: districtViewport["대한민국"].lat,
    longitude: districtViewport["대한민국"].lng,
    zoom: districtViewport["대한민국"].zoom,
  });

  /*
   * level : 행정 구역의 도·광역시 / 시·구를 Level로 구분
   * levelStandard : properties 탐색 기준
   */
  const [level, setLevel] = useState(1);
  const levelStandard = useMemo(
    () => ({
      1: { name: "sidonm", code: "sido", count: "sido_cnt" },
      2: { name: "sggnm", code: "sgg", count: "sgg_cnt" },
    }),
    []
  );

  /*
   * 지도 지역구 hover 기능 - hover 중인 지역구 표시
   * hoverInfo - hover 시 지역구 정보 저장
   */
  const [hoverInfo, setHoverInfo] = useState(null);

  // Todo : 지역구 어린이집 사건·사고에 대한 레이블 정보 추가
  const hoverHandler = useCallback(
    (e) => {
      const hoverArea = e.features && e.features[0];
      const nameStandard = levelStandard[level].name;
      const codeStandard = levelStandard[level].code;
      const countStandard = levelStandard[level].count;

      if(hoverArea){
        setHoverInfo({
          longitude: e.lngLat[0],
          latitude: e.lngLat[1],
          districtName: hoverArea.properties[nameStandard],
          districtCode: level === 1 ? hoverArea.properties[codeStandard]+"00000000" : hoverArea.properties[codeStandard]+"00000",
          districtCount: hoverArea.properties[countStandard],
        });
      }
    },
    [levelStandard, level]
  );

  const selectedDistrict = (hoverInfo && hoverInfo.districtName) || "";
  const selectedDistrictCode = (hoverInfo && hoverInfo.districtCode) || "";
  const filter = useMemo(
    () => ["in", levelStandard[level].name, selectedDistrict],
    [levelStandard, level, selectedDistrict]
  );
  /*
   * 지도 지역구 click 기능 - 지역구 내에 있는 어린이집 데이터를 통한 설정
   * childHouseInfo - click 시 어린이집 정보 저장
   */
  const [sggsArea, setSggsArea] = useState(districtArea);
  const [cdrCentersInfo, setCdrCentersInfo] = useState(null);

  const clickHandler = useCallback(async () => {
    if (selectedDistrict) {
      if (level === 1) {
        setViewport({
          width: 1200,
          height: 800,
          latitude: districtViewport[selectedDistrict].lat,
          longitude: districtViewport[selectedDistrict].lng,
          zoom: districtViewport[selectedDistrict].zoom,
        });

        try {
          const sggDistrictData = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/api/districts?parent_code=${selectedDistrictCode}`
          );

          const sggsFeatures = sggsArea.features.filter(
            (sggArea) => sggArea.properties.sidonm === selectedDistrict
           );

          sggDistrictData.data.forEach((data) => {
            sggsFeatures.forEach((sggFeatures) => {
              if (sggFeatures.properties.sggnm === data.name)
                sggFeatures.properties.sgg_cnt = parseInt(data.count, 10);
              if(!sggFeatures.properties.sgg_cnt)
                sggFeatures.properties.sgg_cnt = 0;
            });
          });
 
          setSggsArea({
            ...sggsArea,
            features: sggsFeatures,
          });          
          setLevel(2);
        } catch (e) {
          console.log(e);
        }
      }
      else if(level === 2){
        try{
          const sggCdrCenterData = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/api/centers?code=${selectedDistrictCode}`
          );
          setCdrCentersInfo(sggCdrCenterData.data);          
        }
        catch(e){
          console.log(e);
        }
      }
    }
  }, [sggsArea, level, selectedDistrict]);

  const resetClickHandler = () => {
    setLevel(1);
    setViewport({
      width: 1200,
      height: 800,
      latitude: districtViewport["대한민국"].lat,
      longitude: districtViewport["대한민국"].lng,
      zoom: districtViewport["대한민국"].zoom,
    });
    setSggsArea(districtArea);
    setCdrCentersInfo(null);
  }

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
        <Source type="geojson" data={level === 1 ? districtArea : sggsArea}>
          {level === 1 && <Layer {...sidoLayer} />}
          {level === 1 && <Layer {...sidoHighlightLayer} filter={filter} />}

          {level === 2 && <Layer {...sggLayer} />}
          {level === 2 && <Layer {...sggHighlightLayer} filter={filter} />}
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
            <div>어린이집 개수 : {hoverInfo.districtCount}</div>
          </Popup>
        )}
        {/* 어린이집 좌표 정보를 통해 마커 표시 */}
        {/* Todo : 사건·사고가 발생한 어린이집의 경우 다른 색상의 마커로 표시 */}
        {cdrCentersInfo &&
          cdrCentersInfo.map((cdrCenter, index) => (
            <Marker
              key={index}
              latitude={Number(cdrCenter.lat)}
              longitude={Number(cdrCenter.lng)}
              className="marker"
            />
          ))}
      </ReactMapGL>
      <MapBoxCategory />
      <button onClick={resetClickHandler} className="reset-button"><BsArrowCounterclockwise /></button>
    </>
  );
}
export default SidoMapBox;
