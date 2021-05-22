/* 스타일을 설정하기 위한 기본 옵션
 * - sidoDiff : 도, 광역시 기준 각 레이블 값 차이
 * - sggDiff : 시,군,구 기준 각 레이블 값 차이
 * - colors : 레이블마다 적용할 색상
 */
export const categoryOptions = {
  sidoDiff: 10,
  sggDiff: 50,
  colors: [
    "#fab1a0",
    "#d35400",
    "#f1c40f",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#7f8c8d",
    "#2c3e50",
    "#2f3640",
  ],
};

/**
 * 지도 행정구역에 대한 스타일 설정
 *
 * sidoCategoryStyle : 도, 광역시 기준 스타일 설정
 * sggCategoryStyle : 시,군,구 기준 스타일 설정
 */
const sidoCategoryStyle = [];
const sggCategoryStyle = [];

let sidoCurrent = 0;
let sggCurrent = 0;

categoryOptions.colors.forEach((color) => {
  sidoCategoryStyle.push([sidoCurrent, color]);
  sggCategoryStyle.push([sggCurrent, color]);

  sidoCurrent += categoryOptions.sidoDiff;
  sggCurrent += categoryOptions.sggDiff;
});

// Todo : 어린이집 개수 기준을 사건,사고를 기준으로 설정
// 도, 광역시 기본 렌더링 스타일
export const sidoLayer = {
  id: "sidoLayer",
  type: "fill",
  paint: {
    "fill-color": {
      property: "sido_cnt",
      stops: sidoCategoryStyle,
    },
    "fill-opacity": 0.7,
  },
};

// 도, 광역시 hover시 적용되는 스타일
export const sidoHighlightLayer = {
  id: "sidoHighlightLayer",
  type: "fill",
  paint: {
    "fill-outline-color": "#000000",
    "fill-color": {
      property: "sido_cnt",
      stops: sidoCategoryStyle,
    },
    "fill-opacity": 0.9,
  },
};
// 시,군,구 기본 렌더링 스타일
export const sggLayer = {
  id: "sggLayer",
  type: "fill",
  paint: {
    "fill-outline-color": "#ffffff",
    "fill-color": {
      property: "sgg_cnt",
      stops: sggCategoryStyle,
    },
    "fill-opacity": 0.7,
  },
};

// 시,군,구 hover시 적용되는 스타일
export const sggHighlightLayer = {
  id: "sggHighlightLayer",
  type: "fill",
  paint: {
    "fill-outline-color": "#000000",
    "fill-color": {
      property: "sgg_cnt",
      stops: sggCategoryStyle,
    },
    "fill-opacity": 0.9,
  },
};
