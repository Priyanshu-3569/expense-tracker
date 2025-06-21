import React from "react";
import DatePicker from "react-datepicker";

function Filters({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  dateFilter,
  setDateFilter,
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Utilities">Utilities</option>
        <option value="Other">Other</option>
      </select>

      <DatePicker
        selected={dateFilter}
        onChange={(date) => setDateFilter(date)}
        placeholderText="Filter by Date"
        isClearable
      />
    </div>
  );
}

export default Filters;
