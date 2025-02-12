import React from 'react'

function SearchBar({ onSearch, onFilterChange }) {
  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex space-x-4">
        <input
          type="date"
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => onFilterChange('startDate', e.target.value)}
        />
        <input
          type="date"
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => onFilterChange('endDate', e.target.value)}
        />
        <select
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => onFilterChange('sortByLikes', e.target.value === 'likes')}
        >
          <option value="date">Sort by date</option>
          <option value="likes">Sort by likes</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar
