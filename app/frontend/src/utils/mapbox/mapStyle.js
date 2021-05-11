// 카테고리 스타일
export const categoryStyle = [
  [0, "#e74c3c"],
  [50, "#e67e22"],
  [100, "#2ecc71"],
  [150, "#1abc9c"],
  [200, "#3498db"],
  [250, "#9b59b6"],
  [300, "#bdc3c7"],
  [350, "#95a5a6"],
  [400, "#34495e"],
];

// 기본 렌더링 스타일
export const areaLayer = {
  id: "area",
  type: "fill",
  paint: {
    "fill-outline-color": "#d0ff00",
    "fill-color": {
      property: "childHouseCnt",
      stops: categoryStyle
    },
    "fill-opacity": 0.5,
  },
};

// hover 시 적용되는 스타일
export const highlightLayer = {
  id: "area-highlighted",
  type: "fill",
  paint: {
    "fill-outline-color": "#d0ff00",
    "fill-color": {
      property: "childHouseCnt",
      stops: categoryStyle,
    },
    "fill-opacity": 0.8,
  },
};
