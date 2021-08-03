import { Button, TextField } from "@material-ui/core";
import React, { useCallback } from "react";
import { initLogin, loginSubmit } from "../modules/login";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../components/Modal";

function Login() {
  const { error } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  // 로그인
  const loginHandler = useCallback(
    (e) => {
      e.preventDefault();
      const userId = e.target.userId.value;
      const userPw = e.target.userPw.value;

      dispatch(loginSubmit(userId, userPw));
    },
    [dispatch]
  );

  // 모달창 닫기
  const closeHandler = () => {
    dispatch(initLogin());
  };

  return (
    <section className="login">
      <div className="login-container">
        <div className="logo"></div>
        <form className="login-form" onSubmit={loginHandler}>
          <TextField id="userId" label="ID" variant="outlined" required />
          <TextField
            id="userPw"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            로그인
          </Button>
        </form>
        {/* 로그인 실패 */}
        {error && (
          <Modal>
            <div className="loginFail-modal">
              ⚠️ 로그인에 실패하였습니다.
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
        )}
      </div>
    </section>
  );
}
export default Login;
