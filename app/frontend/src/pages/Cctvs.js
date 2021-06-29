import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlineRetweet,
} from "react-icons/ai";

import Button from "@material-ui/core/Button";
import CctvModalContainer from "../containers/CctvModalContainer";
import CctvTableContainer from "../containers/CctvTableContainer";
import React, { useEffect } from "react";
import { clickCctvData } from "../modules/cctvsTableEvent";
import { openModal } from "../modules/cctvsModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCctvsData } from "../modules/cctvs";

/**
 * `/cctvs` 페이지 렌더링
 *
 * @return {JSX.Element} `/cctvs` 페이지를 구성하는 컴포넌트
 */

function Cctvs() {
  const { cctvsData } = useSelector((state) => state.cctvsReducer);
  const { selectedData, clickedData } = useSelector(
    (state) => state.cctvsTableEventReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCctvsData());
  }, [dispatch]);

  const createHandler = () => {
    dispatch(clickCctvData(null));
    dispatch(openModal("createData"));
  };
  const updateHandler = () => {
    dispatch(openModal("updateData"));
  };
  const deleteHandler = () => {
    dispatch(openModal("deleteData"));
  };

  return (
    <>
      <CctvModalContainer
        selectedData={selectedData}
        clickedData={clickedData}
      />
      <section className="section cctvs">
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
        </div>
        <div className="container cctvs-section">
          {cctvsData && <CctvTableContainer cctvsData={cctvsData} />}
        </div>
      </section>
    </>
  );
}

export default Cctvs;
