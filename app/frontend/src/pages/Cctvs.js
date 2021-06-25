import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlineRetweet,
} from "react-icons/ai";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import CctvModalContainer from "../containers/CctvModalContainer";
import CctvTableContainer from "../containers/CctvTableContainer";

/**
 * `/cctvs` 페이지 렌더링
 *
 * @return {JSX.Element} `/cctvs` 페이지를 구성하는 컴포넌트
 */

function Cctvs() {
  const cctvDataState = {
    isOpen: false,
    func: {
      createData: false,
      updateData: false,
      deleteData: false,
    },
  };
  const [trigger, setTrigger] = useState(cctvDataState);

  const createHandler = () => {
    setTrigger({ ...trigger, isOpen: true, func: { createData: true } });
  };
  const updateHandler = () => {
    setTrigger({ ...trigger, isOpen: true, func: { updateData: true } });
  };
  const deleteHandler = () => {
    setTrigger({ ...trigger, isOpen: true, func: { deleteData: true } });
  };

  return (
    <>
      <CctvModalContainer
        trigger={trigger}
        selectedCctvs={[]}
        setTrigger={setTrigger}
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
          <CctvTableContainer />
        </div>
      </section>
    </>
  );
}

export default Cctvs;
