import { Button, FormControl, MenuItem, Select } from "@material-ui/core";

import { AiOutlineSearch } from "react-icons/ai";
import React from "react";

function SearchBar({ searchCategories }) {
  return (
    <div className="searchForm">
      <FormControl variant="outlined">
        <Select defaultValue={searchCategories[0].value}>
          {searchCategories.map((category) => (
            <MenuItem value={category.value} key={category.value}>
              {category.text}
            </MenuItem>
          ))}
        </Select>
        <input type="text" className="searchContent" />
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
    </div>
  );
}
export default SearchBar;
