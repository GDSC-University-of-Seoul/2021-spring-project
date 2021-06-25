import React, { useState } from "react";
import {
  createCctvsData,
  deleteCctvsData,
  updateCctvsData,
} from "../modules/cctvs";

import { Button } from "@material-ui/core";
import CctvDeleteModal from "../components/CctvDeleteModal";
import CctvInputModal from "../components/CctvInputModal";
import Modal from "../components/Modal";
import { useDispatch } from "react-redux";

function CctvModalContainer({ trigger, selectedCctvs, setTrigger }) {
  const {
    isOpen,
    func: { createData, updateData, deleteData },
  } = trigger;

  const [macValid, setMacValid] = useState(true);
  const dispatch = useDispatch();

  const checkMacInput = (e, macAddress) => {
    const macRegex = new RegExp(`^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$`);

    macRegex.test(macAddress) ? setMacValid(true) : setMacValid(false);
  };
  const closeModal = () => {
    setTrigger({ ...trigger, isOpen: false });
  };

  const submitCctvForm = (e) => {
    e.preventDefault();

    const targets = e.target;
    let formInfo = {};

    for (let target of targets) {
      if (target.name) formInfo[target.name] = target.value;
    }
    if (createData) dispatch(createCctvsData(formInfo));
    else if (updateData) dispatch(updateCctvsData(formInfo));

    closeModal();
  };
  const deleteCctvData = () => {
    dispatch(deleteCctvsData());
    closeModal();
  };

  return (
    <>
      {isOpen &&
        (!createData && selectedCctvs.length === 0 ? (
          <Modal>
            <div className="cctvModal-warning">
              ⚠️ 데이터를 선택해주세요
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={closeModal}
              >
                확인
              </Button>
            </div>
          </Modal>
        ) : !deleteData ? (
          updateData && selectedCctvs.length > 1 ? (
            <Modal>
              <div className="cctvModal-warning">
                ⚠️ 1개의 데이터만 선택해주세요
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={closeModal}
                >
                  확인
                </Button>
              </div>
            </Modal>
          ) : (
            <CctvInputModal
              macValid={macValid}
              selectedCctvs={selectedCctvs}
              submitCctvForm={submitCctvForm}
              checkMacInput={checkMacInput}
              closeModal={closeModal}
            />
          )
        ) : (
          <CctvDeleteModal
            deleteCnt={selectedCctvs.length}
            deleteCctvData={deleteCctvData}
            closeModal={closeModal}
          ></CctvDeleteModal>
        ))}
    </>
  );
}

export default CctvModalContainer;
