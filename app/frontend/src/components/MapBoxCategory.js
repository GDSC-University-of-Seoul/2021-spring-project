import React from "react";
import { categoryStyle } from "../utils/mapbox/mapStyle";

function MapBoxCategory() {
  // Todo : 컨트롤 옵션 기능 추가
  return (
    <div className="category">
      <div className="category-title">어린이집 개수</div>
      <ul>
        {categoryStyle.map((element, idx) => (
          <li key={idx} className="category-item">
            <div className="colorbox" style={{ backgroundColor: element[1] }} />
            {element[0]} ~{" "}
            {idx !== categoryStyle.length - 1 ? element[0] + 49 : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapBoxCategory;
