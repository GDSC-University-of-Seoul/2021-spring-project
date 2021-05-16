import MapBoxContainer from "../containers/MapBoxContainer";
import React from "react";
import SideBar from "../components/SideBar";

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
