import React from "react";
import SideBar from "../components/SideBar";
import MapBoxContainer from "../containers/MapBoxContainer";

function Monitoring() {
  return (
    <>
      <SideBar />
      <section className="section">
        <MapBoxContainer />
      </section>
    </>
  );
}
export default Monitoring;
