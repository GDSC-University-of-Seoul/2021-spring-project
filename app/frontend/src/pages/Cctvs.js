import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlineRetweet,
} from "react-icons/ai";
import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CctvModal from "../components/CctvModal";
import CctvTableContainer from "../containers/CctvTableContainer";

/**
 * `/cctvs` 페이지 렌더링
 *
 * @return {JSX.Element} `/cctvs` 페이지를 구성하는 컴포넌트
 */

function Cctvs() {
  const [isOpen, setIsOpen] = useState(false);

  const createHandler = () => {
    setIsOpen(true);
  };
  const updateHandler = () => {
    setIsOpen(true);
  };
  const deleteHandler = () => {};

  return (
    <>
      <CctvModal isOpen={isOpen} setIsOpen={setIsOpen} />
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
