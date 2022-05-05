import React from "react";
import {
  TextField
} from "@mui/material";

function SearchField(props) {
  const { search, setSearch } = props;
  return (
    <TextField
      id="filled-basic"
      label="Search Custumer Id....."
      variant="filled"
      fullWidth
      style={{ background: "white", borderRadius: "12px", marginRight: "20px" }}
      value={search}
      type="text"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchField;
