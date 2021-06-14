import React from "react";

/**
 * 로딩 스타일 구성
 *
 * @returns {JSX.Element} 로딩 컴포넌트
 */

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading" />
      <div className="loading-text">로딩중</div>
    </div>
  );
}
export default Loading;
