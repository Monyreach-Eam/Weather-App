import React, { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(query);
    setQuery("");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center", width: "100%" }}
      >
        <TextField
          label="Search City"
          variant="outlined"
          value={query}
          onChange={handleInputChange}
          style={{ flex: 1, marginRight: "10px" }}
          InputProps={{
            style: {
              padding: "10px",
              borderRadius: "20px",
            },
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
