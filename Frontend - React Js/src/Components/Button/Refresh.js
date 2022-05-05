import React from "react";
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Refresh(props) {
  const { setSearchedData } = props;
  return (
    <>
      <Button
        variant="outlined"
        style={{ height:"37px", marginRight:"10px" }}
        onClick={() => setSearchedData([])}
      >
        <RefreshIcon />
      </Button>
    </>
  );
}
