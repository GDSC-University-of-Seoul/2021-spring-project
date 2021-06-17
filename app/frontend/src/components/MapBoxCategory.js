import React, { useCallback } from "react";
import { controlSggDiff, controlSidoDiff } from "../modules/mapboxCategory";
import { useDispatch, useSelector } from "react-redux";

import Slider from "@material-ui/core/Slider";

/**
 * 어린이집 개수에 기반해 범주를 생성
 *
 * @param {Object} level 도, 광역시 / 시,군,구의 기능을 구분
 * @return {JSX.Element} 범주 컴포넌트
 */
function MapBoxCategory({ level }) {
  const { sidoDiff, sggDiff } = useSelector(
    (state) => state.mapboxCategoryReducer
  );
  const dispatch = useDispatch();
  const categoryTitle = level === 1 ? "도·광역시" : "시·군·구";

  /**
   * 슬라이더 조작 이벤트 핸들러
   * - 사용자 입력에 따른 상태 업데이트 수행
   *
   * @param {Object} e 이벤트 객체
   * @param {Number} value 슬라이더를 통한 사용자 입력
   */
  const changeHandler = useCallback(
    (e, value) => {
      level === 1
        ? dispatch(controlSidoDiff(value))
        : dispatch(controlSggDiff(value));
    },
    [level, dispatch]
  );

  return (
    <div className="category">
      {/* Todo : 어린이집 개수가 아닌 사건, 사고에 기반하여 범주 작성 */}
      <h1 className="category-title">{categoryTitle} 어린이집 개수</h1>
      {/* Todo : 컨트롤 옵션 기능 추가 */}
      {/* 영역 색상 변경 슬라이더 */}
      <Slider
        value={level === 1 ? sidoDiff : sggDiff}
        onChange={changeHandler}
        aria-labelledby="diff-control"
        valueLabelDisplay="auto"
        step={level === 1 ? 10 : 1}
        marks
        min={level === 1 ? 10 : 1}
        max={level === 1 ? 100 : 10}
      />
    </div>
  );
}

export default MapBoxCategory;
