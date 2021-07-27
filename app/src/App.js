import { Redirect, Route } from "react-router-dom";

import Cctvs from "./pages/Cctvs";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logs from "./pages/Logs";
import Monitoring from "./pages/Monitoring";
import React from "react";
import Settings from "./pages/Settings";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";

/**
 * URL에 따라 렌더링할 컴포넌트 결정
 *
 * @return {JSX.Element} 라우팅 컴포넌트
 */
function App() {
  const { loginSuccess } = useSelector((state) => state.loginReducer);

  // Todo : 쿠키를 통해 기존 로그인 정보 저장 => 재접속 시에도 정보 유지

  return (
    <>
      <Route path="/" component={Login} exact />
      {loginSuccess && (
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
      )}
    </>
  );
}
export default App;
