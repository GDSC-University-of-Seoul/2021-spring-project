import { closeModal, setMacValid } from "../modules/cctvsModal";
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

function CctvModalContainer() {
  const {
    isOpen,
    macValid,
    inputData,
    func: { createData, updateData, deleteData },
  } = useSelector((state) => state.cctvsModalReducer);

  const dispatch = useDispatch();

  const checkMacInput = (e, macAddress) => {
    const macRegex = new RegExp(`^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$`);

    macRegex.test(macAddress)
      ? dispatch(setMacValid(true))
      : dispatch(setMacValid(false));
  };

  const closeHandler = () => {
    dispatch(closeModal());
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const targets = e.target;
    let formInfo = {};

    for (let target of targets) {
      if (target.name) formInfo[target.name] = target.value;
    }
    if (createData) dispatch(createCctvsData(formInfo));
    else if (updateData) dispatch(updateCctvsData(formInfo));

    dispatch(closeModal());
  };
  const deleteCctvData = () => {
    dispatch(deleteCctvsData());
    dispatch(closeModal());
  };

  return (
    <>
      {isOpen &&
        (!createData && !inputData ? (
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
        ) : !deleteData ? (
          updateData && !inputData ? (
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
          ) : (
            <CctvInputModal
              macValid={macValid}
              inputData={inputData}
              submitCctvForm={submitHandler}
              checkMacInput={checkMacInput}
              closeModal={closeHandler}
            />
          )
        ) : (
          <CctvDeleteModal
            deleteCnt={1}
            deleteCctvData={deleteCctvData}
            closeModal={closeHandler}
          ></CctvDeleteModal>
        ))}
    </>
  );
}

export default CctvModalContainer;
