import { Button, FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useCallback, useRef, useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";

function SearchBar({ searchCategories, setSearchInfo }) {
  const [searchType, setSearchType] = useState(searchCategories[0].value);
  const [inputType, setInputType] = useState(searchCategories[0].type);

  const input = useRef();

  const changeSearchType = useCallback((e) => {
    setSearchType(e.target.value);
    input.current.value = "";
  }, []);

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();

      setSearchInfo({
        type: searchType,
        keyword: e.target.keyword.value,
      });
    },
    [searchType, setSearchInfo]
  );

  return (
    <div className="searchForm">
      <form onSubmit={submitForm}>
        <FormControl variant="outlined">
          <Select
            defaultValue={searchCategories[0].value}
            onChange={changeSearchType}
          >
            {searchCategories.map((category) => (
              <MenuItem
                id="type"
                data-type={category.type}
                value={category.value}
                key={category.value}
                onClick={(e) => setInputType(e.target.dataset.type)}
              >
                {category.text}
              </MenuItem>
            ))}
          </Select>

          <input
            id="keyword"
            type={inputType}
            className="searchContent"
            placeholder="검색어를 입력하세요"
            ref={input}
          />
          <Button
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
            startIcon={<AiOutlineSearch />}
          >
            검색
          </Button>
        </FormControl>
      </form>
    </div>
  );
}
export default SearchBar;
