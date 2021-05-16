import { Link } from "react-router-dom";
import React from "react";

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
