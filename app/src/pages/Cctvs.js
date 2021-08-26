import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlineRetweet,
} from "react-icons/ai";
import React, { useEffect, useMemo } from "react";
import {
  cctvsPagination,
  checkCctvsError,
  fetchCctvsData,
  searchCctvs,
} from "../modules/cctvs";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import CctvModalContainer from "../containers/CctvModalContainer";
import CctvTableContainer from "../containers/CctvTableContainer";
import ErrorModal from "../components/ErrorModal";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import { clickCctvData } from "../modules/cctvsTableEvent";
import { openModal } from "../modules/cctvsModal";

/**
 * `/cctvs` 페이지 렌더링
 *
 * @return {JSX.Element} `/cctvs` 페이지를 구성하는 컴포넌트
 */

function Cctvs() {
  const CCTVS_LIST_SIZE = 20;

  const cctvSearchCategories = useMemo(
    () => [
      {
        value: "center_name",
        text: "어린이집 명",
        type: "text",
      },
      {
        value: "address",
        text: "어린이집 주소",
        type: "text",
      },
      {
        value: "cctv_mac",
        text: "MAC 주소",
        type: "text",
      },
      {
        value: "quality",
        text: "화질",
        type: "text",
      },
      {
        value: "install_date",
        text: "설치 일자",
        type: "date",
      },
    ],
    []
  );

  const { loading, pagination, cctvsData, count, searchInfo, error } =
    useSelector((state) => state.cctvsReducer);
  const { selectedData, clickedData } = useSelector(
    (state) => state.cctvsTableEventReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // /cctvs 페이지 렌더링 시 CCTV 리듀서 초기화
    const initPagination = {
      listSize: CCTVS_LIST_SIZE,
      range: 1,
      page: 1,
    };
    const initSearchInfo = {
      type: cctvSearchCategories[0].value,
      keyword: "",
    };
    dispatch(cctvsPagination(initPagination));
    dispatch(searchCctvs(initSearchInfo));
    dispatch(fetchCctvsData(initPagination, searchInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 검색어 변경에 따른 데이터 Fetch
  useEffect(() => {
    const initPagination = {
      listSize: CCTVS_LIST_SIZE,
      range: 1,
      page: 1,
    };

    dispatch(cctvsPagination(initPagination));
    dispatch(fetchCctvsData(initPagination, searchInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInfo]);

  // 생성 버튼 이벤트
  const createHandler = () => {
    dispatch(clickCctvData(null));
    dispatch(openModal("createData"));
  };
  // 변경 버튼 이벤트
  const updateHandler = () => {
    dispatch(openModal("updateData"));
  };
  // 삭제 버튼 이벤트
  const deleteHandler = () => {
    dispatch(openModal("deleteData"));
  };

  return (
    <>
      {/* CCTV 모달창 */}
      <CctvModalContainer
        cctvsListSize={CCTVS_LIST_SIZE}
        selectedData={selectedData}
        clickedData={clickedData}
      />
      <section className="section cctvs">
        {/* CCTV 기능 버튼 셋 */}
        <div className="cctvs-menu">
          <Button
            data-id="create"
            variant="outlined"
            startIcon={<AiOutlinePlusSquare />}
            onClick={createHandler}
          >
            추가
          </Button>
          <Button
            data-id="update"
            variant="outlined"
            color="primary"
            startIcon={<AiOutlineRetweet />}
            onClick={updateHandler}
          >
            변경
          </Button>
          <Button
            data-id="delete"
            variant="outlined"
            color="secondary"
            startIcon={<AiOutlineMinusSquare />}
            onClick={deleteHandler}
          >
            삭제
          </Button>
          <SearchBar
            searchCategories={cctvSearchCategories}
            setSearchInfo={(searchInfo) => dispatch(searchCctvs(searchInfo))}
          />
        </div>
        {/* CCTV 데이터 표 */}
        <div className="container cctvs-section">
          {loading ? (
            <Loading />
          ) : (
            cctvsData && (
              <CctvTableContainer
                pagination={pagination}
                cctvsData={cctvsData}
                count={count}
                searchInfo={searchInfo}
              />
            )
          )}
        </div>
      </section>
      {error && (
        <ErrorModal closeModal={() => dispatch(checkCctvsError())}>
          {error}
        </ErrorModal>
      )}
    </>
  );
}

export default Cctvs;
