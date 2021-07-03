import Button from "@material-ui/core/Button";
import Modal from "./Modal";
import React from "react";

function CctvDeleteModal({ deleteCnt, deleteCctvData, closeModal }) {
  return (
    <Modal>
      <div className="cctvModal-delete">
        총 <span>{deleteCnt}</span>건의 데이터를 삭제하시겠습니까?
      </div>
      <div className="cctvModal-button">
        <Button
          variant="contained"
          color="primary"
          onClick={deleteCctvData}
          disableElevation
        >
          삭제
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={closeModal}
          disableElevation
        >
          취소
        </Button>
      </div>
    </Modal>
  );
}
export default CctvDeleteModal;
