import React from "react";
import { FaHome } from "react-icons/fa";
import { FiMonitor, FiSettings } from "react-icons/fi";
import SideMenu from "./SideMenu";

function SideBar() {
  return (
    <nav className="sidebar">
      <header>Menu</header>

      <SideMenu menu="Home" route="/">
        <FaHome className="menu-icon" />
      </SideMenu>
      <SideMenu menu="Monitoring" route="/monitoring">
        <FiMonitor className="menu-icon" />
      </SideMenu>
      <SideMenu menu="Settings" route="/settings">
        <FiSettings className="menu-icon" />
      </SideMenu>
    </nav>
  );
}
export default SideBar;
