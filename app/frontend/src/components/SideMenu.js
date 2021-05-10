import React from "react";
import { Link } from "react-router-dom";

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
