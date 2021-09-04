import { clickCctvData, initSelectCctvData } from "@modules/cctvsTableEvent";
import { closeModal, setMacValid } from "@modules/cctvsModal";
import {
  closeSearchModal,
  fetchCenter,
  fetchSgg,
  fetchSido,
  initSearchModal,
  openSearchModal,
  selectCenter,
} from "@modules/searchCenterModal";
import {
  createCctvsData,
  deleteCctvsData,
  updateCctvsData,
} from "@modules/cctvs";
import { useDispatch, useSelector, useStore } from "react-redux";

import AlertModal from "@components/Modal/AlertModal";
import CctvDeleteModal from "@components/Cctvs/CctvDeleteModal";
import CctvInputModal from "@components/Cctvs/CctvInputModal";
import React from "react";
import SearchCenterModal from "@components/Cctvs/SearchCenterModal";

/**
 * CCTV 모달창 컨테이너 컴포넌트
 *
 * @param {Object} - selectedData: 체크된 데이터, clickedData: 클릭한 데이터
 * @returns {JSX.Element} CCTV 모달창 컨테이너
 */
function CctvModalContainer({ selectedData, clickedData }) {
  const { pagination, searchInfo } = useSelector((state) => state.cctvsReducer);

  const {
    isOpen,
    macValid,
    func: { createData, updateData, deleteData },
  } = useSelector((state) => state.cctvsModalReducer);

  const {
    searchModalOpen,
    loading,
    searchData: { sido, sgg, center, selectedCenter },
  } = useSelector((state) => state.searchCenterReducer);

  const dispatch = useDispatch();

  const store = useStore();

  // CCTV MAC 주소 유효성 검사 함수
  const checkMacInput = (e, macAddress) => {
    const macRegex = new RegExp(`^([0-9A-F]{2}[-]){5}([0-9A-F]{2})$`);

    macRegex.test(macAddress)
      ? dispatch(setMacValid(true))
      : dispatch(setMacValid(false));
  };

  // 모달창 닫기 함수
  const closeHandler = () => {
    dispatch(closeModal());
    dispatch(clickCctvData(null));
    dispatch(initSearchModal());
  };

  // 모달창 폼 제출 이벤트 처리 함수 (생성, 변경)
  const submitHandler = (e) => {
    e.preventDefault();

    const targets = e.target;
    const befInfo = clickedData || selectedData[0];
    let submitInfo = {};

    // 어린이집명, 주소가 없는 경우 에러 메세지 출력, 제출 실패
    if (targets[0].value === "" || targets[1].value === "") {
      alert("어린이집 정보를 입력하세요!");
      return;
    }

    for (let target of targets) {
      if (target.name) submitInfo[target.name] = target.value;
    }
    submitInfo.center_id = selectedCenter ? selectedCenter.center_id : null;
    submitInfo.uninstall_date =
      submitInfo.uninstall_date !== "" ? submitInfo.uninstall_date : null;

    // MAC 주소 중복 체크 이후 CCTV 데이터 생성 (Create)
    if (createData) {
      dispatch(createCctvsData(submitInfo, pagination, searchInfo)).then(() => {
        if (!checkDuplicatedMac()) closeHandler();
      });
    }
    // CCTV 데이터 변경 (Update)
    else if (updateData) {
      // 1. center_id 나 cctv_mac 이 변경된 경우 (MAC 주소 중복 체크 이후 새로 CCTV 정보 등록, 기존 CCTV 정보 삭제)
      if (
        (submitInfo.center_id && submitInfo.center_id !== befInfo.center_id) ||
        submitInfo.cctv_mac !== befInfo.cctv_mac
      ) {
        if (!submitInfo.center_id) submitInfo.center_id = befInfo.center_id;

        dispatch(createCctvsData(submitInfo, pagination, searchInfo)).then(
          () => {
            if (!checkDuplicatedMac()) {
              dispatch(deleteCctvsData([befInfo], pagination, searchInfo));
              closeHandler();
            }
          }
        );
      }
      // 2. center_id, cctv_mac 모두 변경되지 않은 경우 (기존 CCTV 정보 변경)
      else {
        dispatch(updateCctvsData(submitInfo, pagination, searchInfo)).then(() =>
          closeHandler()
        );
      }
    }
  };

  // 중복 MAC 주소 체크 (중복 MAC 주소 등록 시 409 상태코드 반환)
  const checkDuplicatedMac = () => {
    const { error } = store.getState().cctvsReducer;
    if (error && error.response.status === 409) {
      alert("중복된 MAC 주소입니다.");
      return true;
    }
    return false;
  };

  // CCTV 데이터 제거 (Delete)
  const deleteCctvData = () => {
    dispatch(deleteCctvsData(selectedData, pagination, searchInfo));
    dispatch(initSelectCctvData());
    closeHandler();
  };

  // 어린이집 검색 모달창 열기
  const openSearchCenter = () => {
    dispatch(openSearchModal());
    dispatch(fetchSido());
  };

  // 어린이집 검색 모달창 취소 선택
  const cancelSearchCenter = () => {
    dispatch(initSearchModal());
  };

  // 어린이집 검색 모달창 도·특별시·광역시 선택
  const sidoSelect = (e) => {
    dispatch(fetchSgg(e.target.value));
  };

  // 어린이집 검색 모달창 시·군·구 선택
  const sggSelect = (e) => {
    dispatch(fetchCenter(e.target.value));
  };

  // 어린이집 검색 모달창 어린이집 선택
  const centerSelect = (e) => {
    dispatch(selectCenter(e.target.value));
  };

  // 어린이집 검색 모달창 폼 정보 제출
  const submitCenter = (e) => {
    e.preventDefault();
    dispatch(closeSearchModal());
  };

  return (
    <>
      {isOpen &&
      (createData ||
        (updateData && (clickedData || selectedData.length === 1))) ? (
        <>
          {/* CCTV 데이터 입력 모달창 */}
          <CctvInputModal
            macValid={macValid}
            centerInfo={selectedCenter}
            inputData={
              createData ? null : clickedData ? clickedData : selectedData[0]
            }
            submitCctvForm={submitHandler}
            openSearchCenter={openSearchCenter}
            checkMacInput={checkMacInput}
            closeModal={closeHandler}
          />
          {/* 어린이집 검색 모달창 */}
          <SearchCenterModal
            isOpen={searchModalOpen}
            loading={loading}
            sido={sido}
            sgg={sgg}
            center={center}
            sidoSelect={sidoSelect}
            sggSelect={sggSelect}
            centerSelect={centerSelect}
            submitCenter={submitCenter}
            cancelSearchCenter={cancelSearchCenter}
          />
        </>
      ) : (updateData || deleteData) && selectedData.length === 0 ? (
        <>
          {/* 에러 모달창 1 - 데이터 선택 안함 */}
          <AlertModal closeModal={closeHandler}>
            ⚠️ 데이터를 선택해주세요
          </AlertModal>
        </>
      ) : updateData && selectedData.length >= 2 ? (
        <>
          {/* 에러 모달창 2 - 복수 데이터 선택 */}
          <AlertModal closeModal={closeHandler}>
            ⚠️ 1개의 데이터만 선택해주세요
          </AlertModal>
        </>
      ) : (
        deleteData && (
          <>
            {/* CCTV 데이터 삭제 확인창 */}
            <CctvDeleteModal
              deleteCnt={selectedData.length}
              deleteCctvData={deleteCctvData}
              closeModal={closeHandler}
            ></CctvDeleteModal>
          </>
        )
      )}
    </>
  );
}

export default CctvModalContainer;
