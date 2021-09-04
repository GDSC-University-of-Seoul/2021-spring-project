import { Button, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { logOut, loginInfoUpdate } from "../modules/login";

import Modal from "./Modal";
import { useDispatch } from "react-redux";

/**
 * 사용자 변경 입력 폼을 담은 모달창
 *
 * @param {Object} props loginInfo: 사용자 정보, setIsChanged: 사용자 변경창을 닫기 위한 useState의 상태변경 Callback
 * @returns {HTMLElement} 사용자 변경 입력 폼을 담은 모달창
 */
function UpdateLoginForm({ loginInfo, setIsChanged }) {
  const dispatch = useDispatch();

  const [confirmUpdate, setConfirmUpdate] = useState(false); // 변경 완료 창 열기
  const [valid, setValid] = useState({
    password: true,
    phone: true,
  });

  useEffect(() => {
    return () => loginInfo;
  }, [loginInfo]);

  // 사용자 정보 변경
  const updateLogin = useCallback(
    (e) => {
      e.preventDefault();

      const updateInfo = {
        userName: e.target.userName.value,
        password: e.target.password.value,
        password2: e.target.password2.value,
        userPhone: e.target.userPhone.value,
        email: e.target.email.value,
      };

      // 패스워드 유효성 검사
      if (updateInfo.password !== updateInfo.password2) {
        setValid({ ...valid, password: false });
        return;
      }
      // 전화번호 유효성 검사
      if (!updateInfo.userPhone.match(/^[0-9]{11}$/)) {
        setValid({ ...valid, phone: false });
        return;
      }

      dispatch(loginInfoUpdate(updateInfo, loginInfo.userToken));
      setConfirmUpdate(true);
    },
    [dispatch, loginInfo, valid]
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
                onClick={() => dispatch(logOut())}
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
              id="userName"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={loginInfo.userName}
            />
            <TextField
              label="변경할 비밀번호"
              id="password"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={() => setValid({ ...valid, password: true })}
            />
            <TextField
              label="비밀번호 확인"
              id="password2"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={() => setValid({ ...valid, password: true })}
            />
            {!valid.password && (
              <div className="checkValid">비밀번호가 일치하지 않습니다.</div>
            )}
            <TextField
              label="관리자 연락처"
              id="userPhone"
              type="text"
              placeholder="-를 빼고 입력하세요."
              defaultValue={loginInfo.userPhone}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={() => setValid({ ...valid, phone: true })}
            />
            {!valid.phone && (
              <div className="checkValid">전화번호 형식에 맞지 않습니다.</div>
            )}
            <TextField
              label="관리자 이메일"
              id="email"
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
