import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, onSearch }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
      setInputValue("");
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange(event);
  };

  const handleSearchClick = () => {
    onSearch();
    setInputValue("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="form-control"
      />
      <button onClick={handleSearchClick} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
