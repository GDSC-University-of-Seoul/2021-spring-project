import { Link } from "react-router-dom";
import React from "react";

/**
 * 사이드 메뉴바에 속한 각 메뉴 구성
 *
 * @params {Object} menu: 메뉴명, route: 이동할 URL 주소 , children: 자식 컴포넌트
 * @return {JSX.Element} 메뉴 컴포넌트
 */
function SideMenu({ menu, route, children }) {
  return (
    <ul>
      <li className="sidemenu">
        <Link to={route}>
          {children} {menu}
        </Link>
      </li>
    </ul>
  );
}
export default SideMenu;
