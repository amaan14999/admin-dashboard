// SearchBar.js
import React from "react";
import "./assets/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
