import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapBox from "../components/MapBox";
import { getData } from "../modules/mapbox";
import xmlParser from "../utils/mapbox/xmlParser";

function MapBoxContainer() {
  let {
    loading,
    data: { area, childHouse },
    error,
  } = useSelector((state) => state.mapboxReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  if (loading) return <div>로딩중 ...</div>;
  if (error) return <div>에러 발생</div>;
  if (!area) return <div>행정 구역 데이터 불러오기 실패</div>;

  // 지역 필터링
  area.features = area.features.filter(
    (element) => element.properties.sidonm === "서울특별시"
  );

  // Todo : geojson 데이터에 어린이집 사건·사고 개수 property 추가
  // geojson 데이터에 어린이집 개수 property 추가
  xmlParser(childHouse).then((data) => {
    const filterData = data.response.item.filter(
      (element) => element.crcargbname[0] === "운영"
    );
    const sigunname = filterData[0].sigunname[0];
    const childHouseCnt = filterData.length;

    area.features.forEach((element) => {
      element.properties.childHouseCnt =
        element.properties.sggnm === sigunname ? childHouseCnt : 0;
    });
  });
  return <MapBox data={area} />;
}
export default MapBoxContainer;
