import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import VideoCard from '../components/VideoCard'
import Pagination from '../components/Pagination'

function SearchPage() {
  const [videos, setVideos] = useState([])
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    startDate: '',
    endDate: '',
    sortByLikes: false,
    page: 1,
    pageSize: 12
  })
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchVideos()
  }, [filters])

  const fetchVideos = async () => {
    try {
      const params = new URLSearchParams({
        ...filters,
        sort_by_likes: filters.sortByLikes
      })
      const response = await axios.get(`http://localhost:8080/api/videos?${params}`)
      setVideos(response.data)
      // In a real app, we'd get total pages from backend
      setTotalPages(Math.ceil(response.data.length / filters.pageSize))
    } catch (error) {
      console.error('Error fetching videos:', error)
    }
  }

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({
      ...prev,
      title: searchTerm,
      author: searchTerm,
      page: 1
    }))
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }))
  }

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }))
  }

  return (
    <div className="space-y-8">
      <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default SearchPage
