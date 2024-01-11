import React from "react";
import "./style/SearchBar.css";

const SearchBar = ({ setSearchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city..."
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
