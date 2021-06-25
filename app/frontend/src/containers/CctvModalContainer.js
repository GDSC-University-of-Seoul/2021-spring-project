import React, { useState } from "react";
import { createCctvsData, updateCctvsData } from "../modules/cctvs";

import CctvInputModal from "../components/CctvInputModal";
import Modal from "../components/Modal";
import { useDispatch } from "react-redux";

function CctvModalContainer({ trigger, setTrigger }) {
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

  const submitCctvForm = (e) => {
    e.preventDefault();

    const targets = e.target;
    let formInfo = {};

    for (let target of targets) {
      if (target.name) formInfo[target.name] = target.value;
    }
    setTrigger({ ...trigger, isOpen: false });

    if (createData) dispatch(createCctvsData(formInfo));
    else if (updateData) dispatch(updateCctvsData(formInfo));
  };

  const closeModal = () => {
    setTrigger({ ...trigger, isOpen: false });
  };

  return (
    <>
      {isOpen && (
        <CctvInputModal
          macValid={macValid}
          submitCctvForm={submitCctvForm}
          checkMacInput={checkMacInput}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default CctvModalContainer;
