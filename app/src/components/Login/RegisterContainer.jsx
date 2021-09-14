import React, { useState } from "react";

import AlertModal from "@components/Modal/AlertModal";
import RegisterModal from "@components/Login/RegisterModal";
import { postUserRegister } from "@api/userInfo";

function RegisterContainer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState(null);

  const registerUser = async (registerInfo) => {
    try {
      await postUserRegister(registerInfo);

      setResult("✅ 회원가입에 성공하였습니다.");
      setModalOpen(false);
    } catch (e) {
      if (e.response.status === 401)
        setResult("⚠️ 이미 등록된 계정 ID 입니다.");
    }
  };

  return (
    <>
      <div className="userRegister">
        저희 사이트에 처음 방문하시나요?
        <span onClick={() => setModalOpen(true)}> 회원가입하기</span>
      </div>
      {modalOpen && (
        <RegisterModal
          registerUser={registerUser}
          closeModal={() => setModalOpen(false)}
        />
      )}
      {result && (
        <AlertModal closeModal={() => setResult(null)}>{result}</AlertModal>
      )}
    </>
  );
}
export default RegisterContainer;
