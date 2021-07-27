import React, { useState } from "react";

import Cctvs from "./pages/Cctvs";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logs from "./pages/Logs";
import Monitoring from "./pages/Monitoring";
import { Route } from "react-router-dom";
import Settings from "./pages/Settings";
import SideBar from "./components/SideBar";

/**
 * URL에 따라 렌더링할 컴포넌트 결정
 *
 * @return {JSX.Element} 라우팅 컴포넌트
 */
function App() {
  const [login] = useState(false);

  return (
    <>
      <Route path="/" component={Login} exact />
      {login && (
        <>
          <Header />
          <SideBar />
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
