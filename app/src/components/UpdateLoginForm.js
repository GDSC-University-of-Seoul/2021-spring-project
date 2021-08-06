import { Button, TextField } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { logOut, loginInfoUpdate } from "../modules/login";

import Modal from "./Modal";
import { useDispatch } from "react-redux";

/**
 * 사용자 변경 입력 폼을 담은 모달창
 *
 * @param {Object} props loginInfo: 사용자 정보, history: History 객체, setIsChanged: 사용자 변경창을 닫기 위한 useState의 상태변경 Callback
 * @returns {HTMLElement} 사용자 변경 입력 폼을 담은 모달창
 */
function UpdateLoginForm({ loginInfo, history, setIsChanged }) {
  const dispatch = useDispatch();

  const [confirmUpdate, setConfirmUpdate] = useState(false); // 변경 완료 창 열기
  const [pwMatch, setPwMatch] = useState(true); // 비밀번호 일치여부
  const [pwConfirm, setpwConfirm] = useState({
    userPw: "",
    userPw2: "",
  }); // 변경할 비밀번호

  // 비밀번호 입력값 저장
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

  // 사용자 정보 변경
  const updateLogin = useCallback(
    (e) => {
      e.preventDefault();

      // 변경할 비밀번호 일치 여부 검사
      if (pwConfirm.userPw !== pwConfirm.userPw2) {
        setPwMatch(false);
        return;
      }

      // 사용자 정보 변경
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
        <>
          {/* 사용자 정보 변경 완료 확인창 */}
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
        </>
      ) : (
        <Modal title="사용자 정보 변경">
          {/* 사용자 변경 입력 폼 */}
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
