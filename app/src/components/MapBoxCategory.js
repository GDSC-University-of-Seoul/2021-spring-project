import React, { useCallback } from "react";
import { controlSgg, controlSido } from "../modules/mapboxCategory";
import { useDispatch, useSelector } from "react-redux";

import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";

/**
 * 어린이집 개수에 기반해 범주를 생성
 *
 * @param {Object} level 도, 광역시 / 시,군,구의 기능을 구분
 * @return {JSX.Element} 범주 컴포넌트
 */
function MapBoxCategory({ level }) {
  const { sidoControl, sggControl } = useSelector(
    (state) => state.mapboxCategoryReducer
  );
  const dispatch = useDispatch();

  const categoryTitle = level === 1 ? "도·광역시" : "시·군·구";
  const sliderControl = {
    min: {
      sido: sidoControl.min,
      sgg: sggControl.min,
    },
    max: {
      sido: sidoControl.max,
      sgg: sggControl.max,
    },
    step: {
      sido: sidoControl.step,
      sgg: sggControl.step,
    },
  };

  /**
   * 설정한 최소값, 최대값이 타당한지 비교
   * - 타당하지 않다면 최소값을 최대값으로 설정
   *
   * @param {String} type return할 값의 기준
   * @return {Number} type에 따른 최소값, 최대값
   */
  const checkMinMax = useCallback(
    (type) => {
      let minVal = level === 1 ? sidoControl.min : sggControl.min;
      let maxVal = level === 1 ? sidoControl.max : sggControl.max;

      if (minVal > maxVal) minVal = maxVal;

      return type === "min" ? minVal : maxVal;
    },
    [level, sidoControl, sggControl]
  );

  /**
   * 슬라이더 조작 이벤트 핸들러
   * - 사용자 입력에 따른 diff 업데이트 수행
   *
   * @param {Object} e 이벤트 객체
   * @param {Number} value 슬라이더를 통한 사용자 입력
   */
  const changeSliderHandler = useCallback(
    (e, value) => {
      level === 1
        ? dispatch(controlSido("diff", value))
        : dispatch(controlSgg("diff", value));
    },
    [level, dispatch]
  );

  /**
   * 슬라이더 컨트롤러 이벤트 핸들러
   * - 사용자 입력에 따른 min,max,step 업데이트 수행
   *
   * @param {Object} e 이벤트 객체
   * @param {String} key 슬라이더 컨트롤러를 통해 변경할 상태 속성
   */
  const changeInputHandler = useCallback(
    (e, key) => {
      let value = e.target.value > 0 ? e.target.value : 1;

      level === 1
        ? dispatch(controlSido(key, parseInt(value, 10)))
        : dispatch(controlSgg(key, parseInt(value, 10)));
    },
    [level, dispatch]
  );

  return (
    <div className="category">
      <h1 className="category-title">{categoryTitle} 사건·사고 개수</h1>
      {/* 영역 색상 변경 슬라이더 */}
      <Slider
        value={level === 1 ? sidoControl.diff : sggControl.diff}
        aria-labelledby="diff-control"
        valueLabelDisplay="auto"
        step={level === 1 ? sidoControl.step : sggControl.step}
        marks
        min={checkMinMax("min")}
        max={checkMinMax("max")}
        onChange={changeSliderHandler}
      />
      {/* 슬라이더 컨트롤러 */}
      <form className="slider-controllers">
        {Object.keys(sliderControl).map((key, index) => {
          return (
            <TextField
              key={index}
              data-id={key}
              className="slider-controller"
              label={key}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={
                level === 1 ? sliderControl[key].sido : sliderControl[key].sgg
              }
              variant="outlined"
              onChange={(e) => changeInputHandler(e, key)}
            />
          );
        })}
      </form>
    </div>
  );
}

export default MapBoxCategory;
