import Cctvs from "./pages/Cctvs";
import Header from "./components/Header";
import Home from "./pages/Home";
import Logs from "./pages/Logs";
import Monitoring from "./pages/Monitoring";
import React from "react";
import { Route } from "react-router-dom";
import Settings from "./pages/Settings";
import SideBar from "./components/SideBar";

/**
 * URL에 따라 렌더링할 컴포넌트 결정
 *
 * @return {JSX.Element} 라우팅 컴포넌트
 */
function App() {
  return (
    <>
      <Header />
      <SideBar />
      <Route path="/" component={Home} exact />
      <Route path="/monitoring" component={Monitoring} />
      <Route path="/cctvs" component={Cctvs} />
      <Route path="/logs" component={Logs} />
      <Route path="/settings" component={Settings} />
    </>
  );
}
export default App;
