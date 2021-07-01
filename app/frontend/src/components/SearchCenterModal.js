import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

import Modal from "./Modal";
import React from "react";

function SearchCenterModal({ isOpen, sido, sgg, center, closeSearchCenter }) {
  return (
    <>
      {isOpen && (
        <Modal title={"어린이집 검색"}>
          <form className="searchCenter-form">
            <FormControl required>
              <InputLabel id="center-sido-label">도·특별시·광역시</InputLabel>
              <Select labelId="center-sido-label" name="center-sido">
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
              <Select labelId="center-sgg-label" name="center-sgg">
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
              <Select labelId="center-label" name="center">
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
                onClick={closeSearchCenter}
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
