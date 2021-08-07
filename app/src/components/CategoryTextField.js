import React from "react";
import { TextField } from "@material-ui/core";

function CategoryTextField({ category, data, className }) {
  return Object.keys(category).map((key, index) => {
    return (
      <TextField
        key={index}
        className={className}
        label={category[key]}
        value={data[key] || ""}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        disabled
      />
    );
  });
}
export default CategoryTextField;
