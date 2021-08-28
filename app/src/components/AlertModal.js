import { Button } from "@material-ui/core";
import Modal from "./Modal";
import React from "react";

function AlertModal({ closeModal, children }) {
  return (
    <Modal>
      {children}
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={closeModal}
      >
        확인
      </Button>
    </Modal>
  );
}

export default AlertModal;
