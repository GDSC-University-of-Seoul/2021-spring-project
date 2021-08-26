import React, { useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { getLoginCookie, logOut } from "./modules/login";
import { useDispatch, useSelector } from "react-redux";

import Cctvs from "./pages/Cctvs";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logs from "./pages/Logs";
import Monitoring from "./pages/Monitoring";
import Settings from "./pages/Settings";
import SideBar from "./components/SideBar";

/**
 * URL에 따라 렌더링할 컴포넌트 결정
 *
 * @return {JSX.Element} 라우팅 컴포넌트
 */
function App() {
  const { loginSuccess } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  // 로그인 쿠키 여부 확인
  useEffect(() => {
    dispatch(getLoginCookie());
  }, [dispatch]);

  // 웹 페이지를 닫을 때 로그아웃
  useEffect(() => {
    const clearCookie = document.body.addEventListener(
      "unload",
      dispatch(logOut(history))
    );
    return () => clearCookie;
  }, [dispatch, history]);

  return (
    <>
      {/* 비로그인 라우팅 */}
      <Route path="/" component={Login} exact>
        {loginSuccess && <Redirect to="/home" />}
      </Route>
      {/* 로그인 이후 라우팅 */}
      {loginSuccess ? (
        <>
          <Route component={Header} />
          <SideBar />
          <Route path="/home" component={Home} />
          <Route path="/monitoring" component={Monitoring} />
          <Route path="/cctvs" component={Cctvs} />
          <Route path="/logs" component={Logs} />
          <Route path="/settings" component={Settings} />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}
export default App;
