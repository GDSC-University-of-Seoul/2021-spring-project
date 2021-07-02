import { clickCctvData, initSelectCctvData } from "../modules/cctvsTableEvent";
import { closeModal, setMacValid } from "../modules/cctvsModal";
import {
  closeSearchModal,
  fetchCenter,
  fetchSgg,
  fetchSido,
  initSearchModal,
  openSearchModal,
  selectCenter,
} from "../modules/searchCenterModal";
import {
  createCctvsData,
  deleteCctvsData,
  updateCctvsData,
} from "../modules/cctvs";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@material-ui/core";
import CctvDeleteModal from "../components/CctvDeleteModal";
import CctvInputModal from "../components/CctvInputModal";
import Modal from "../components/Modal";
import React from "react";
import SearchCenterModal from "../components/searchCenterModal";

/**
 * CCTV 모달창 컨테이너 컴포넌트
 *
 * @param {Object} selectedData: 체크된 데이터, clickedData: 클릭한 데이터
 * @returns {JSX.Element} CCTV 모달창 컨테이너
 */
function CctvModalContainer({ selectedData, clickedData }) {
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

    const befInfo = clickedData || selectedData[0];
    const targets = e.target;
    let submitInfo = {};

    for (let target of targets) {
      if (target.name) submitInfo[target.name] = target.value;
    }
    submitInfo.cctv_mac = submitInfo.cctv_mac.split("-").join("");
    submitInfo["center_id"] = selectedCenter.center_id;

    // Todo : center_id 변경, cctv_mac 변경에 따른 기능 구분
    if (createData) dispatch(createCctvsData(submitInfo));
    else if (updateData) {
      if (submitInfo.cctv_mac !== befInfo.cctv_mac) {
        dispatch(deleteCctvsData(befInfo));
        dispatch(createCctvsData(submitInfo));
      } else {
        dispatch(updateCctvsData(submitInfo));
      }
    }
    closeHandler();
  };

  // CCTV 데이터 제거 (제거)
  const deleteCctvData = () => {
    dispatch(deleteCctvsData(selectedData));
    dispatch(initSelectCctvData([]));
    closeHandler();
  };

  const openSearchCenter = () => {
    dispatch(openSearchModal());
    dispatch(fetchSido());
  };
  const closeSearchCenter = () => {
    dispatch(closeSearchModal());
  };
  const sidoSelect = (e) => {
    dispatch(fetchSgg(e.target.value));
  };
  const sggSelect = (e) => {
    dispatch(fetchCenter(e.target.value));
  };
  const centerSelect = (e) => {
    dispatch(selectCenter(e.target.value));
  };
  const submitCenter = (e) => {
    e.preventDefault();
    closeSearchCenter();
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
            closeSearchCenter={closeSearchCenter}
          />
        </>
      ) : (updateData || deleteData) && selectedData.length === 0 ? (
        <>
          {/* 에러 모달창 1 */}
          <Modal>
            <div className="cctvModal-warning">
              ⚠️ 데이터를 선택해주세요
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={closeHandler}
              >
                확인
              </Button>
            </div>
          </Modal>
        </>
      ) : updateData && selectedData.length >= 2 ? (
        <>
          {/* 에러 모달창 2 */}
          <Modal>
            <div className="cctvModal-warning">
              ⚠️ 1개의 데이터만 선택해주세요
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={closeHandler}
              >
                확인
              </Button>
            </div>
          </Modal>
        </>
      ) : (
        deleteData && (
          <>
            {/* 삭제 확인창 */}
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
