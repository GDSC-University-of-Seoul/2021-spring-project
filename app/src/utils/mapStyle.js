// 레이블마다 적용할 색상
const categoryColors = [
  "#fab1a0",
  "#d35400",
  "#f1c40f",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#7f8c8d",
  "#2c3e50",
  "#2f3640",
];

/**
 * diff에 기반해 지도 행정구역에 대한 색상 배열 설정
 *
 * @param {Number} diff : 영역 색상 기준
 * @returns {Array} 영역 색상 기준에 따른 색상 배열
 */
const categoryStyle = (diff) => {
  const style = [];
  let current = 0;

  categoryColors.forEach((color) => {
    style.push([current, color]);
    current += diff;
  });
  return style;
};

// Todo : 어린이집 개수 기준을 사건,사고를 기준으로 설정

/**
 * 도·광역시 기본 렌더링 스타일 객체 설정
 *
 * @param {Number} sidoDiff : 도·광역시 영역 색상 기준
 * @returns {Object} 도·광역시 기본 스타일 객체
 */
export const getSidoLayer = (sidoDiff) => {
  return {
    id: "sidoLayer",
    type: "fill",
    paint: {
      "fill-color": {
        property: "sido_cnt",
        stops: categoryStyle(sidoDiff),
      },
      "fill-opacity": 0.7,
    },
  };
};

/**
 * 도·광역시 hover시 적용되는 스타일 객체 설정
 *
 * @param {Number} sidoDiff : 도·광역시 영역 색상 기준
 * @returns {Object} 도·광역시 hover시 적용되는 스타일 객체
 */
export const getSidoHighlightLayer = (sidoDiff) => {
  return {
    id: "sidoHighlightLayer",
    type: "fill",
    paint: {
      "fill-outline-color": "#000000",
      "fill-color": {
        property: "sido_cnt",
        stops: categoryStyle(sidoDiff),
      },
      "fill-opacity": 0.9,
    },
  };
};

/**
 * 시·군·구 기본 렌더링 스타일 객체 설정
 *
 * @param {Number} sggDiff : 시·군·구 영역 색상 기준
 * @returns {Object} 시·군·구 기본 스타일 객체
 */
export const getSggLayer = (sggDiff) => {
  return {
    id: "sggLayer",
    type: "fill",
    paint: {
      "fill-outline-color": "#ffffff",
      "fill-color": {
        property: "sgg_cnt",
        stops: categoryStyle(sggDiff),
      },
      "fill-opacity": 0.7,
    },
  };
};

/**
 * 시·군·구 hover시 적용되는 스타일 객체 설정
 *
 * @param {Number} sggDiff : 시·군·구 영역 색상 기준
 * @returns {Object} 시·군·구 hover시 적용되는 스타일 객체
 */
export const getSggHighlightLayer = (sggDiff) => {
  return {
    id: "sggHighlightLayer",
    type: "fill",
    paint: {
      "fill-outline-color": "#000000",
      "fill-color": {
        property: "sgg_cnt",
        stops: categoryStyle(sggDiff),
      },
      "fill-opacity": 0.9,
    },
  };
};
