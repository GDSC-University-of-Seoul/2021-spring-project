import { FiMonitor, FiSettings } from "react-icons/fi";

import { AiOutlineFileText } from "react-icons/ai";
import { BiCctv } from "react-icons/bi";
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
      <div className="sidebar-header">Menu</div>

      <SideMenu menu="Home" route="/">
        <FaHome className="menu-icon" />
      </SideMenu>
      <SideMenu menu="Monitoring" route="/monitoring">
        <FiMonitor className="menu-icon" />
      </SideMenu>
      <SideMenu menu="CCTV" route="/cctvs">
        <BiCctv className="menu-icon" />
      </SideMenu>
      <SideMenu menu="Logs" route="/logs">
        <AiOutlineFileText className="menu-icon" />
      </SideMenu>
      <SideMenu menu="Settings" route="/settings">
        <FiSettings className="menu-icon" />
      </SideMenu>
    </nav>
  );
}
export default SideBar;
