import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function SearchBar({ onSearch, onFilterChange }) {
  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="w-full bg-surface-dark text-text-primary placeholder-gray-400 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </button>
      </div>
      <div className="flex space-x-4 justify-center">
        <input
          type="date"
          className="bg-surface-dark text-text-primary rounded-md border-0 focus:ring-2 focus:ring-accent"
          onChange={(e) => onFilterChange('startDate', e.target.value)}
        />
        <input
          type="date"
          className="bg-surface-dark text-text-primary rounded-md border-0 focus:ring-2 focus:ring-accent"
          onChange={(e) => onFilterChange('endDate', e.target.value)}
        />
        <select
          className="bg-surface-dark text-text-primary rounded-md border-0 focus:ring-2 focus:ring-accent"
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
