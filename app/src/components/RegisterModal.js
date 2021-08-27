import { Button, TextField } from "@material-ui/core";
import React, { useCallback, useMemo, useState } from "react";

import Modal from "./Modal";

function RegisterModal({ registerUser, closeModal }) {
  const [valid, setValid] = useState({
    password: true,
    phone: true,
  });

  const registerInputs = useMemo(
    () => [
      {
        label: "계정 ID",
        id: "userId",
      },
      {
        label: "비밀번호",
        id: "userPw",
        type: "password",
        onChange: () => setValid({ ...valid, password: true }),
      },
      {
        label: "비밀번호 확인",
        id: "userPw2",
        type: "password",
        onChange: () => setValid({ ...valid, password: true }),
      },
      {
        label: "관리자 명",
        id: "userName",
      },
      {
        label: "연락처",
        id: "userPhone",
        type: "text",
        placeholder: "-를 빼고 입력하세요",
        onChange: () => setValid({ ...valid, phone: true }),
      },
      {
        label: "이메일",
        id: "email",
        type: "email",
      },
    ],
    [valid]
  );

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();

      const registerInfo = {
        member_id: e.target.userId.value,
        password: e.target.userPw.value,
        password2: e.target.userPw2.value,
        member_name: e.target.userName.value,
        member_phone: e.target.userPhone.value,
        email: e.target.email.value,
      };

      // 패스워드 유효성 검사
      if (registerInfo.password !== registerInfo.password2) {
        setValid({ ...valid, password: false });
        return;
      }

      // 전화번호 유효성 검사
      if (!registerInfo.member_phone.match(/^[0-9]{11}$/)) {
        setValid({ ...valid, phone: false });
        return;
      }

      registerUser(registerInfo);
    },
    [registerUser, valid]
  );

  return (
    <>
      <Modal title="사용자 계정 등록">
        <form className="register-form" onSubmit={submitForm}>
          <TextField
            {...registerInputs[0]}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            {...registerInputs[1]}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            {...registerInputs[2]}
            InputLabelProps={{ shrink: true }}
            required
          />
          {!valid.password && (
            <div className="checkValid">비밀번호가 일치하지 않습니다.</div>
          )}
          <TextField
            {...registerInputs[3]}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            {...registerInputs[4]}
            InputLabelProps={{ shrink: true }}
            required
          />
          {!valid.phone && (
            <div className="checkValid">전화번호 형식에 맞지 않습니다.</div>
          )}
          <TextField
            {...registerInputs[5]}
            InputLabelProps={{ shrink: true }}
            required
          />
          <div className="registerForm-button">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
            >
              확인
            </Button>
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              onClick={closeModal}
            >
              취소
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default RegisterModal;
