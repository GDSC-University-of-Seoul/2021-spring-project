import React, { useState } from "react";

import Table from "../components/Table";

/**
 * CCTV 데이터를 통한 표 구성
 *
 * @returns {JSX.Element} CCTV 데이터 표 컴포넌트
 */
function CctvTableContainer() {
  /* 
    CCTV 초기 데이터
    
    Todos: - DB에서 CCTV 데이터 Fetch
           - ID를 통해 서로 다른 테이블 정보를 연계
           - categories에 해당하는 데이터로 구성 예정
   */
  const initialCctvs = [
    {
      area_id: "11001000000",
      area_name: "참새반",
      area_usage: "교실",
      center_id: "11000000000",
      install_date: "2021-06-06 12:30",
      quality: "HD",
      uninstall_date: "2021-06-06 12:30",
    },
    {
      area_id: "11002000000",
      area_name: "까치반",
      area_usage: "교실",
      center_id: "11000000000",
      install_date: "2021-06-06 12:30",
      quality: "HD",
      uninstall_date: "2021-06-06 12:30",
    },
  ];

  // CCTV 데이터 카테고리
  const categories = {
    center_name: "어린이집 명",
    area_name: "설치 장소",
    area_usage: "장소 용도",
    address: "어린이집 주소",
    install_date: "설치 일자",
    quality: "화질",
    uninstall_date: "제거 일자",
  };

  const [cctvs, setCctvs] = useState(initialCctvs);

  return <Table data={cctvs} categories={categories} setData={setCctvs} />;
}
export default CctvTableContainer;
