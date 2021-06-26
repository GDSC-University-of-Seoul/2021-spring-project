import React, { useState } from "react";
import {
  clickCctvData,
  selectCctvData,
  selectOffCctvData,
} from "../modules/cctvsTableEvent";

import Table from "../components/Table";
import { openModal } from "../modules/cctvsModal";
import { useDispatch } from "react-redux";

/**
 * CCTV 데이터에 기반한 표 구성
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
      center_name: "가나다어린이집",
      cctv_name: "참새반",
      address: "서울특별시 동대문구",
      cctv_mac: "12345678",
      quality: "HD",
      install_date: "2021-06-06",
      uninstall_date: "2021-06-06",
    },
    {
      center_name: "123 어린이집",
      cctv_name: "까치반",
      address: "대전광역시 서구",
      cctv_mac: "abcdef12",
      quality: "HD",
      install_date: "2021-06-06",
      uninstall_date: "2021-06-06",
    },
  ];
  const [cctvs, setCctvs] = useState(initialCctvs);
  const dispatch = useDispatch();

  // CCTV 데이터 카테고리
  const categories = {
    center_name: "어린이집 명",
    cctv_name: "설치 장소",
    address: "어린이집 주소",
    cctv_mac: "MAC 주소",
    quality: "화질",
    install_date: "설치 일자",
    uninstall_date: "제거 일자",
  };

  const itemCheckHandler = (e) => {};
  const itemClickHandler = (e) => {
    const tr = e.target.closest("tr");
    if (!tr) return;

    const cctvId = tr.dataset.id;
    const clickData = cctvs.find((cctv) => cctv.cctv_mac === cctvId);

    dispatch(clickCctvData(clickData));
    dispatch(openModal("updateData", clickData));
  };

  return (
    <Table
      data={cctvs}
      categories={categories}
      itemId={"cctv_mac"}
      itemCheckHandler={itemCheckHandler}
      itemClickHandler={itemClickHandler}
    />
  );
}
export default CctvTableContainer;
