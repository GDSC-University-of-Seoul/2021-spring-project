import { cctvsPagination, fetchCctvsData } from "@modules/cctvs";
import {
  clickCctvData,
  selectCctvData,
  selectOffCctvData,
} from "@modules/cctvsTableEvent";

import React from "react";
import Table from "@components/Table";
import { openModal } from "@modules/cctvsModal";
import { useDispatch } from "react-redux";

/**
 * CCTV 데이터에 기반한 표 구성
 *
 * @param {Object} - pagination: 현재 페이지네이션 정보 cctvsData : CCTV 데이터 count: 전체 페이지네이션 정보 searchInfo : 검색 키워드
 * @returns {JSX.Element} CCTV 데이터 표 컴포넌트
 */
function CctvTableContainer({ pagination, cctvsData, count, searchInfo }) {
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

  /*
   * 표 아이템 체크 이벤트 핸들러
   * 1. CCTV MAC 기준으로 clickedData 설정 (신규 생성데이터에 대해 cctv_id를 획득할 수 없으므로)
   * 2. selectedCctvData를 Toggle적으로 설정 (push || pop)
   */
  const itemCheckHandler = (e) => {
    const tr = e.target.closest("tr");
    if (!tr) return;

    const cctvId = tr.dataset.id;
    const selectedData = cctvsData.find((cctv) => cctv.cctv_mac === cctvId);

    e.target.checked
      ? dispatch(selectCctvData(selectedData))
      : dispatch(selectOffCctvData(cctvId));
  };

  /*
   * 표 아이템 클릭 이벤트 핸들러
   * 1. CCTV MAC 기준으로 clickedData 설정 (신규 생성데이터에 대해 cctv_id를 획득할 수 없으므로)
   * 2. 모달창 오픈
   */
  const itemClickHandler = (e) => {
    const tr = e.target.closest("tr");
    if (!tr) return;

    const cctvId = tr.dataset.id;
    const clickData = cctvsData.find((cctv) => cctv.cctv_mac === cctvId);

    dispatch(clickCctvData(clickData));
    dispatch(openModal("updateData"));
  };

  return (
    <Table
      pagination={pagination}
      data={cctvsData}
      count={count}
      categories={categories}
      itemId={"cctv_mac"}
      searchInfo={searchInfo}
      setPagination={(pagination) => dispatch(cctvsPagination(pagination))}
      fetchData={(pagination, searchInfo) =>
        dispatch(fetchCctvsData(pagination, searchInfo))
      }
      itemCheckHandler={itemCheckHandler}
      itemClickHandler={itemClickHandler}
    />
  );
}
export default CctvTableContainer;
