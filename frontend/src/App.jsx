import React, { useState } from 'react'
import Navbar from './components/Navbar'
import SearchPage from './pages/SearchPage'
import AdminPage from './pages/AdminPage'

function App() {
  const [currentPage, setCurrentPage] = useState('search')

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'search' ? <SearchPage /> : <AdminPage />}
      </main>
    </div>
  )
}

export default App
