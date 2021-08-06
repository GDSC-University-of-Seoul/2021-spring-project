import { Button, TextField } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { logOut, loginInfoUpdate } from "../modules/login";

import Modal from "./Modal";
import { useDispatch } from "react-redux";

function UpdateLoginForm({ loginInfo, history, setIsChanged }) {
  const dispatch = useDispatch();

  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [pwMatch, setPwMatch] = useState(true);
  const [pwConfirm, setpwConfirm] = useState({
    userPw: "",
    userPw2: "",
  });

  const changePassword = useCallback(
    (e) => {
      setPwMatch(true);

      const { id, value } = e.target;
      const pwInput = { ...pwConfirm };
      pwInput[id] = value;

      setpwConfirm(pwInput);
    },
    [pwConfirm]
  );

  const updateLogin = useCallback(
    (e) => {
      e.preventDefault();

      if (pwConfirm.userPw !== pwConfirm.userPw2) {
        setPwMatch(false);
        return;
      }

      setPwMatch(true);
      const { userId, userName, password, email } = e.target;
      const updateInfo = {
        userId,
        userName,
        password,
        email,
      };
      dispatch(loginInfoUpdate(updateInfo)).then(() => setConfirmUpdate(true));
    },
    [pwConfirm, dispatch]
  );

  return (
    <>
      {confirmUpdate ? (
        <Modal>
          <div className="updateUserInfo-confirm">
            ✅ 사용자 정보가 변경되었습니다
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => dispatch(logOut(history))}
            >
              확인
            </Button>
          </div>
        </Modal>
      ) : (
        <Modal title="사용자 정보 변경">
          <form className="updateLogin-form" onSubmit={updateLogin}>
            <TextField
              label="계정 ID"
              id="userId"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={loginInfo.userId}
              disabled
            />
            <TextField
              label="관리자"
              id="userId"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={loginInfo.userName}
            />
            <TextField
              label="변경할 비밀번호"
              id="userPw"
              type="password"
              onChange={changePassword}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="비밀번호 확인"
              id="userPw2"
              type="password"
              onChange={changePassword}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {!pwMatch && (
              <div className="pw-notMatch">비밀번호가 일치하지 않습니다.</div>
            )}
            <TextField
              label="관리자 이메일"
              id="userEmail"
              type="email"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={loginInfo.email}
            />
            <div className="updateUserForm-button">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
              >
                수정
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={() => setIsChanged(false)}
              >
                취소
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default UpdateLoginForm;
