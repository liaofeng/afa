import React from 'react'

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-surface-dark text-text-primary rounded-md disabled:opacity-50 hover:bg-opacity-80"
      >
        上一页
      </button>
      <span className="px-4 py-2 text-text-primary">
        第 {currentPage} 页，共 {totalPages} 页
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-surface-dark text-text-primary rounded-md disabled:opacity-50 hover:bg-opacity-80"
      >
        下一页
      </button>
    </div>
  )
}

export default Pagination
