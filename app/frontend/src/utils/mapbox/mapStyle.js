// 카테고리 스타일
export const categoryStyle = [
  [0, "#fab1a0"],
  [50, "#d35400"],
  [100, "#f1c40f"],
  [150, "#27ae60"],
  [200, "#2980b9"],
  [250, "#8e44ad"],
  [300, "#7f8c8d"],
  [350, "#2c3e50"],
  [400, "#2f3640"],
];

// 기본 렌더링 스타일
export const areaLayer = {
  id: "area",
  type: "fill",
  paint: {
    "fill-outline-color": "#ffffff",
    "fill-color": {
      property: "childHouseCnt",
      stops: categoryStyle
    },
    "fill-opacity": 0.7,
  },
};

// hover 시 적용되는 스타일
export const highlightLayer = {
  id: "area-highlighted",
  type: "fill",
  paint: {
    "fill-outline-color": "#000000",
    "fill-color": {
      property: "childHouseCnt",
      stops: categoryStyle,
    },
    "fill-opacity": 0.9,
  },
};
