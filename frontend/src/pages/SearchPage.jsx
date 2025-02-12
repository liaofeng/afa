import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import VideoCard from '../components/VideoCard'
import VideoCardSkeleton from '../components/VideoCardSkeleton'
import Pagination from '../components/Pagination'

function SearchPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
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
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        ...filters,
        sort_by_likes: filters.sortByLikes
      })
      const response = await axios.get(`https://user:94d02708eef25742110923ad34c83682@douyin-search-app-tunnel-gipcnwxb.devinapps.com/api/videos?${params}`)
      setVideos(response.data)
      // In a real app, we'd get total pages from backend
      setTotalPages(Math.ceil(response.data.length / filters.pageSize))
    } catch (error) {
      console.error('Error fetching videos:', error)
      setError('获取视频失败，请稍后重试')
    } finally {
      setLoading(false)
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
        {error && (
          <div className="text-red-500 text-center mt-4 bg-surface-dark rounded-lg p-4">
            {error}
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-6">
          {loading
            ? Array(12).fill(0).map((_, i) => <VideoCardSkeleton key={i} />)
            : videos.map(video => <VideoCard key={video.id} video={video} />)
          }
        </div>
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default SearchPage
