import React, { useState } from "react";

import Table from "../components/Table";

/**
 * 기본 로그 데이터에 기반한 표 구성
 *
 * @returns {JSX.Element} 기본 로그 데이터 기반 표 컴포넌트
 */
function LogTableContainer() {
  /* 
    기본 로그 초기 데이터
    
    Todos: - DB에서 로그 데이터 Fetch
           - ID를 통해 서로 다른 테이블 정보를 연계
           - categories에 해당하는 데이터로 구성 예정
   */
  const initialLogs = [
    {
      center_name: "가나다어린이집",
      type: "폭행",
      start_time: "2021-06-06 12:30",
      address: "서울특별시 은평구 가나다어린이집",
    },
    {
      center_name: "ABC어린이집",
      type: "안전사고",
      start_time: "2021-06-06 11:00",
      address: "서울특별시 동대문구 ABC어린이집",
    },
    {
      center_name: "123어린이집",
      type: "안전사고",
      time: "2021-06-12 10:00",
      address: "대전광역시 서구 ABC어린이집",
    },
  ];

  // 기본 로그 카테고리
  const categories = {
    center_name: "발생 장소",
    type: "의심 유형",
    start_time: "발생 시간",
    address: "상세주소",
  };

  const [logs, setLogs] = useState(initialLogs);

  return <Table data={logs} categories={categories} setData={setLogs} />;
}
export default LogTableContainer;
