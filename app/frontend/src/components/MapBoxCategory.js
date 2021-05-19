import React from "react";
import { categoryStyle } from "../utils/mapbox/mapStyle";

/**
 * 어린이집 개수에 기반해 범주를 생성
 *
 * @return {JSX.Element} 범주 컴포넌트
 */
function MapBoxCategory() {
  return (
    <div className="category">
      {/* Todo : 어린이집 개수가 아닌 사건, 사고에 기반하여 범주 작성 */}
      <div className="category-title">어린이집 개수</div>
      {/* Todo : 컨트롤 옵션 기능 추가 */}
      <ul>
        {categoryStyle.map((element, idx) => (
          <li key={idx} className="category-item">
            <div className="colorbox" style={{ backgroundColor: element[1] }} />
            {element[0]} ~
            {idx !== categoryStyle.length - 1 ? element[0] + 49 : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapBoxCategory;
