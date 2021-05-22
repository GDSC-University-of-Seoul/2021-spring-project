import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MapBox from "../components/MapBox";
import { getData } from "../modules/mapbox";

/**
 * Redux에 저장된 MapBox 상태를 구독하고 상태를 정제. 이후 상태에 따라 렌더링할 컴포넌트를 지정
 *
 * @return {JSX.Element} 상태에 따라 렌더링할 컴포넌트
 */
function MapBoxContainer() {
  // 스토어 구독(Redux 상태 접근)
  let {
    loading,
    data: { districtsGeojson, districts },
    error,
  } = useSelector((state) => state.mapboxReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  // 로딩, 에러, 데이터 상태에 따른 렌더링
  if (loading) return <div>로딩중 ...</div>;
  if (error) return <div>에러 발생{error}</div>;
  if (!districtsGeojson) return <div>행정 구역 데이터 불러오기 실패</div>;
  if (!districts) return <div>API 연결 실패</div>;

  // geojson 데이터에 어린이집 개수 property 추가
  // Todo : geojson 데이터에 어린이집 사건·사고 property 추가
  districtsGeojson.features.forEach((districtGeojson) => {
    districts.forEach((district) => {
      if (districtGeojson.properties.sidonm === district.name)
        districtGeojson.properties.sido_cnt = parseInt(district.count, 10);
    });
  });
  return <MapBox geojson={districtsGeojson} />;
}
export default MapBoxContainer;
