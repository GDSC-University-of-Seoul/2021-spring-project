import { Button, TextField } from "@material-ui/core";
import React, { useCallback } from "react";
import { checkLoginError, loginSubmit } from "@modules/login";
import { useDispatch, useSelector } from "react-redux";

import AlertModal from "@components/Modal/AlertModal";
import RegisterContainer from "@components/Login/RegisterContainer";

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
          <AlertModal closeModal={() => dispatch(checkLoginError())}>
            {error}
          </AlertModal>
        )}
      </div>
      <RegisterContainer />
    </section>
  );
}
export default Login;
