import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cctvs from "./pages/Cctvs";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logs from "./pages/Logs";
import Monitoring from "./pages/Monitoring";
import Settings from "./pages/Settings";
import SideBar from "./components/SideBar";
import { getLoginCookie } from "./modules/login";

/**
 * URL에 따라 렌더링할 컴포넌트 결정
 *
 * @return {JSX.Element} 라우팅 컴포넌트
 */
function App() {
  const { loginSuccess } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();

  // 쿠키 여부 확인
  useEffect(() => {
    dispatch(getLoginCookie());
  }, [dispatch]);

  return (
    <>
      <Route path="/" component={Login} exact />
      {loginSuccess ? (
        <>
          <Header />
          <SideBar />
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/monitoring" component={Monitoring} />
          <Route path="/cctvs" component={Cctvs} />
          <Route path="/logs" component={Logs} />
          <Route path="/settings" component={Settings} />
        </>
      ) : (
        <>
          <Redirect exact from="/*" to="/" />
          <Route path="/" component={Login} exact />
        </>
      )}
    </>
  );
}
export default App;
