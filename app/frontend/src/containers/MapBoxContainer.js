import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MapBox from "../components/MapBox";
import { getData } from "../modules/mapbox";

function MapBoxContainer() {
  let {
    loading,
    data: { district, regions },
    error,
  } = useSelector((state) => state.mapboxReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  if (loading) return <div>로딩중 ...</div>;
  if (error) return <div>에러 발생{error}</div>;
  if (!district) return <div>행정 구역 데이터 불러오기 실패</div>;

  // 지역 필터링
  district.features = district.features.filter(
    (element) => element.properties.sidonm === "서울특별시"
  );

  // Todo : geojson 데이터에 어린이집 사건·사고 개수 property 추가
  // geojson 데이터에 어린이집 개수 property 추가

  district.features.forEach((element) => {
    regions.forEach((region) => {
      // Todo : 구에 맞는 개수 삽입 100 -> region.childHountCnt
      element.properties.childHouseCnt =
        element.properties.sggnm === region.region_name ? 100 : 0;
    });
  });

  return <MapBox data={district} />;
}
export default MapBoxContainer;
