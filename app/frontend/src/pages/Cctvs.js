import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlineRetweet,
} from "react-icons/ai";

import Button from "@material-ui/core/Button";
import CctvTableContainer from "../containers/CctvTableContainer";
import React from "react";

/**
 * `/cctvs` 페이지 렌더링
 *
 * @return {JSX.Element} `/cctvs` 페이지를 구성하는 컴포넌트
 */

function Cctvs() {
  const createHandler = () => {};
  const updateHandler = () => {};
  const deleteHandler = () => {};

  const menuHandler = (e) => {
    const select = e.target.dataset.id;

    switch (select) {
      case "create":
        createHandler();
        break;
      case "update":
        updateHandler();
        break;
      case "delete":
        deleteHandler();
        break;
      default:
        return;
    }
  };

  return (
    <>
      <section className="section cctvs">
        <div className="cctvs-menu" onClick={menuHandler}>
          <Button
            data-id="create"
            variant="outlined"
            startIcon={<AiOutlinePlusSquare />}
          >
            추가
          </Button>
          <Button
            data-id="update"
            variant="outlined"
            color="primary"
            startIcon={<AiOutlineRetweet />}
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
