import React from "react";
import { categoryOptions } from "../utils/mapbox/mapStyle";

/**
 * 어린이집 개수에 기반해 범주를 생성
 *
 * @param {Object} level 도, 광역시 / 시,군,구의 기능을 구분
 * @return {JSX.Element} 범주 컴포넌트
 */
function MapBoxCategory({ level }) {
  const { sidoDiff, sggDiff, colors } = categoryOptions;
  const categoryTitle = level === 1 ? "도·광역시" : "시·구";
  const diff = level === 1 ? sidoDiff : sggDiff;

  let current = -diff;

  return (
    <div className="category">
      {/* Todo : 어린이집 개수가 아닌 사건, 사고에 기반하여 범주 작성 */}
      <div className="category-title">{categoryTitle} 어린이집 개수</div>
      {/* Todo : 컨트롤 옵션 기능 추가 */}
      <ul>
        {colors.map((color, idx) => {
          current += diff;
          return (
            <li key={idx} className="category-item">
              <div className="colorbox" style={{ backgroundColor: color }} />
              {current} ~ {idx !== colors.length - 1 ? current + diff : ""}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MapBoxCategory;
