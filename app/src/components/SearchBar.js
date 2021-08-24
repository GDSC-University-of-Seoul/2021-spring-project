import { Button, FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useCallback, useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";

function SearchBar({ searchCategories, setSearchInfo }) {
  const [searchType, setType] = useState(searchCategories[0].value);

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
            onChange={(e) => setType(e.target.value)}
          >
            {searchCategories.map((category) => (
              <MenuItem id="type" value={category.value} key={category.value}>
                {category.text}
              </MenuItem>
            ))}
          </Select>

          <input
            id="keyword"
            type="text"
            className="searchContent"
            placeholder="검색어를 입력하세요"
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
