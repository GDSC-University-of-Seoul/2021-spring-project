import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

import Modal from "./Modal";
import React from "react";

/**
 * 어린이집 검색 모달창
 *
 * @param {Object} isOpen: 모달창 열기/닫기, loading: 데이터 로딩 상태, sido: 도·특별시·광역시 정보 sgg: 시·군·구 정보
 *                 center: 어린이집 정보, sidoSelect ~ : 선택 이벤트
 * @return {JSX.Element} 어린이집 검색 모달창
 */

function SearchCenterModal({
  isOpen,
  loading,
  sido,
  sgg,
  center,
  sidoSelect,
  sggSelect,
  centerSelect,
  submitCenter,
  cancelSearchCenter,
}) {
  return (
    <>
      {isOpen && (
        <Modal title={"어린이집 검색"}>
          {loading && <div>로딩중...</div>}
          <form className="searchCenter-form" onSubmit={submitCenter}>
            <FormControl required>
              <InputLabel id="center-sido-label">도·특별시·광역시</InputLabel>
              <Select
                labelId="center-sido-label"
                name="center-sido"
                defaultValue=""
                onChange={sidoSelect}
              >
                {sido &&
                  sido.map((item, idx) => (
                    <MenuItem key={idx} value={item.district_code}>
                      {item.district_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl required>
              <InputLabel id="center-sgg-label">시·군·구</InputLabel>
              <Select
                labelId="center-sgg-label"
                name="center-sgg"
                defaultValue=""
                onChange={sggSelect}
              >
                {sgg &&
                  sgg.map((item, idx) => (
                    <MenuItem key={idx} value={item.district_code}>
                      {item.district_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl required>
              <InputLabel id="center-label">어린이집</InputLabel>
              <Select
                labelId="center-label"
                name="center"
                defaultValue=""
                onChange={centerSelect}
              >
                {center &&
                  center.map((item, idx) => (
                    <MenuItem key={idx} value={item.center_id}>
                      {item.center_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <div className="searchCenterModal-button">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
              >
                확인
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={cancelSearchCenter}
              >
                취소
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
export default SearchCenterModal;
