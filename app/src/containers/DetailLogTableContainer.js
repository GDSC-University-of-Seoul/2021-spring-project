import React, { useState } from "react";

import Table from "../components/Table";

/**
 * 상세 로그 데이터에 기반한 표 구성
 *
 * @returns {JSX.Element} 상세 로그 데이터 기반 표 컴포넌트
 */

function DetailLogTableContainer() {
  /* 
    상세 로그 초기 데이터
    
    Todos: - DB에서 로그 데이터 Fetch
           - ID를 통해 서로 다른 테이블 정보를 연계
           - categories에 해당하는 데이터로 구성 예정
   */
  const initialDetailLogs = [
    {
      center_name: "ABC어린이집",
      area_name: "거실",
      anomaly_type: "폭행",
      start_time: "2021-06-06 11:00",
      sido: "서울특별시",
      sgg: "동대문구",
      address: "서울특별시 동대문구 ABC어린이집",
    },
    {
      center_name: "123어린이집",
      area_name: "식당",
      anomaly_type: "안전사고",
      start_time: "2021-06-12 10:00",
      sido: "대전광역시",
      sgg: "서구",
      address: "대전광역시 서구 ABC어린이집",
    },
  ];

  // 상세 로그 카테고리
  const categories = {
    center_name: "어린이집 명",
    area_name: "공간명",
    anomaly_type: "의심 유형",
    start_time: "발생 시간",
    sido: "도·광역시",
    sgg: "시·군·구",
    address: "상세주소",
  };

  const [logs, setLogs] = useState(initialDetailLogs);

  return <Table data={logs} categories={categories} setData={setLogs} />;
}
export default DetailLogTableContainer;
