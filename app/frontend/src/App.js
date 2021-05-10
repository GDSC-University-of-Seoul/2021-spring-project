import React from "react";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Monitoring from "./pages/Monitoring";
import Settings from "./pages/Settings";
import "./styles/main.scss";

function App() {
  return (
    <>
      <Route path="/" component={Home} exact />
      <Route path="/monitoring" component={Monitoring} />
      <Route path="/settings" component={Settings} />
    </>
  );
}
export default App;
