import React, { useState } from 'react';

function Sidebar({ onSearchChange, onPriceChangeFilter, onVolumeFilter, priceChangeFilter }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [volumeFilter, setVolumeFilter] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
    onSearchChange(event.target.value);
  };

  const handlePriceChangeFilter = value => {
    onPriceChangeFilter(value);
    setIsDropdownOpen(false);
  };

  const handleVolumeFilter = event => {
    setVolumeFilter(Number(event.target.value));
    onVolumeFilter(Number(event.target.value));
  };

  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search by coin name (e.g., Bitcoin)"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div
        className="custom-filter"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => {
          setTimeout(() => {
            setIsDropdownOpen(false);
          }, 200);
        }}
      >
        <div className="filter-selected">
          {priceChangeFilter}
          <span className="filter-arrow">▼</span>
        </div>
        {isDropdownOpen && (
          <div className="filter-options">
            <div
              className="filter-option"
              onClick={() => handlePriceChangeFilter('All Price Changes')}
            >
              All Price Changes
            </div>
            <div
              className="filter-option"
              onClick={() => handlePriceChangeFilter('Positive Change')}
            >
              Positive Change
            </div>
            <div
              className="filter-option"
              onClick={() => handlePriceChangeFilter('Negative Change')}
            >
              Negative Change
            </div>
          </div>
        )}
      </div>
      <div className="volume-filter">
        <label>Min 24h Volume: ${volumeFilter.toLocaleString()}</label>
        <input
          type="range"
          min="0"
          max="500000000"
          step="1000000"
          value={volumeFilter}
          onChange={handleVolumeFilter}
        />
      </div>
    </div>
  );
}

export default Sidebar;