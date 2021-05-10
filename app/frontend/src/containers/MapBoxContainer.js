import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapBox from "../components/MapBox";
import { getData } from "../modules/mapbox";

function MapBoxContainer() {
  let { loading, data, error } = useSelector((state) => state.mapboxReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  if (loading) return <div>로딩중 ...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return <div>행정 구역 데이터 불러오기 실패</div>;

  data.features = data.features.filter(
    (element) => element.properties.sidonm === "서울특별시"
  );
  return <MapBox data={data} />;
}
export default MapBoxContainer;
