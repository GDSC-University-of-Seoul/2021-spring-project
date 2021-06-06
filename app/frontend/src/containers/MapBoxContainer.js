import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MapBox from "../components/MapBox";
import { fetchData } from "../modules/mapbox";

/**
 * Redux에 저장된 MapBox 상태를 구독하고 상태를 정제. 이후 상태에 따라 렌더링할 컴포넌트를 지정
 *
 * @return {JSX.Element} 상태에 따라 렌더링할 컴포넌트
 */
function MapBoxContainer() {
  // 스토어 구독(Redux 상태 접근)
  const {
    loading,
    data: { districtsGeojson, districts },
    error,
  } = useSelector((state) => state.mapboxReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!districtsGeojson || districts.length === 0) dispatch(fetchData());
  }, [districtsGeojson, districts, dispatch]);

  // 로딩, 에러, 데이터 상태에 따른 렌더링
  if (loading) return <div>로딩중 ...</div>;
  if (error) return <div>에러 발생 </div>;
  if (!districtsGeojson) return <div>행정 구역 데이터 불러오기 실패</div>;
  if (!districts) return <div>API 연결 실패</div>;

  return <MapBox geojson={districtsGeojson} />;
}
export default MapBoxContainer;
