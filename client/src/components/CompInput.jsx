import React from "react";
import TextField from "@mui/material/TextField";

export function CompInput(props) {
  const { spanText, labelText, type, name, color } = props;
  return (
    <>
      <div className="input-apply">
        <span style={{marginBottom: "4%", display: "block", color: color}}>{spanText}</span>
        <TextField
          // required
          id="outlined-required"
          name={name}
          label={labelText}
          type={type}
          InputProps={{ style: { color: color } }}
          style={{ display: "flex", flexDirection: "column", width: "95%" }}
        />
      </div>
    </>
  );
}
