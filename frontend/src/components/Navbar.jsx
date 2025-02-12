import React from 'react'

const topCategories = ['综合', '视频', '用户', '直播']
const subCategories = ['全部', '推文', '言情小说', '听书', '漫画', '重生', '推荐', '爽文', '悬疑', '修仙']

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="bg-background shadow">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex justify-between items-center">
            {topCategories.map(cat => (
              <button key={cat} className="text-text-primary hover:text-accent">{cat}</button>
            ))}
          </div>
          <div className="flex space-x-4 overflow-x-auto">
            {subCategories.map(cat => (
              <button key={cat} className="text-text-secondary hover:text-text-primary px-3 py-1 rounded-full">{cat}</button>
            ))}
          </div>
          <div className="flex space-x-8 mt-4">
            <button
              onClick={() => setCurrentPage('search')}
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                currentPage === 'search'
                  ? 'border-accent text-text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              Search
            </button>
            <button
              onClick={() => setCurrentPage('admin')}
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                currentPage === 'admin'
                  ? 'border-accent text-text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
