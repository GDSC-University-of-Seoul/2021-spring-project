import { FiMonitor, FiSettings } from "react-icons/fi";

import { FaHome } from "react-icons/fa";
import React from "react";
import SideMenu from "./SideMenu";

/**
 * 사이드 메뉴바를 구성
 *
 * @return {JSX.Element} 사이드 메뉴바 컴포넌트
 */
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
