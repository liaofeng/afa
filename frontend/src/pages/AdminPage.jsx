import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AdminPage() {
  const [videos, setVideos] = useState([])
  const [editingVideo, setEditingVideo] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    cover_url: '',
    video_length: 0,
    like_count: 0,
    view_count: 0
  })

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const params = new URLSearchParams({
        page: 1,
        page_size: 50
      })
      const response = await axios.get(`http://localhost:8080/api/videos?${params}`)
      setVideos(response.data)
    } catch (error) {
      console.error('Error fetching videos:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingVideo) {
        await axios.put(`http://localhost:8080/api/videos/${editingVideo.id}`, {
          ...formData,
          id: editingVideo.id
        })
      } else {
        await axios.post('http://localhost:8080/api/videos', formData)
      }
      fetchVideos()
      setEditingVideo(null)
      setFormData({
        title: '',
        author: '',
        cover_url: '',
        video_length: 0,
        like_count: 0,
        view_count: 0
      })
    } catch (error) {
      console.error('Error saving video:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/videos/${id}`)
      fetchVideos()
    } catch (error) {
      console.error('Error deleting video:', error)
    }
  }

  const handleEdit = (video) => {
    setEditingVideo(video)
    setFormData(video)
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">
          {editingVideo ? 'Edit Video' : 'Add New Video'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="rounded-md border-gray-300"
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
            className="rounded-md border-gray-300"
            required
          />
          <input
            type="text"
            placeholder="Cover URL"
            value={formData.cover_url}
            onChange={(e) => setFormData(prev => ({ ...prev, cover_url: e.target.value }))}
            className="rounded-md border-gray-300"
            required
          />
          <input
            type="number"
            placeholder="Video Length (seconds)"
            value={formData.video_length}
            onChange={(e) => setFormData(prev => ({ ...prev, video_length: parseInt(e.target.value) }))}
            className="rounded-md border-gray-300"
            required
          />
          <input
            type="number"
            placeholder="Like Count"
            value={formData.like_count}
            onChange={(e) => setFormData(prev => ({ ...prev, like_count: parseInt(e.target.value) }))}
            className="rounded-md border-gray-300"
            required
          />
          <input
            type="number"
            placeholder="View Count"
            value={formData.view_count}
            onChange={(e) => setFormData(prev => ({ ...prev, view_count: parseInt(e.target.value) }))}
            className="rounded-md border-gray-300"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          {editingVideo && (
            <button
              type="button"
              onClick={() => {
                setEditingVideo(null)
                setFormData({
                  title: '',
                  author: '',
                  cover_url: '',
                  video_length: 0,
                  like_count: 0,
                  view_count: 0
                })
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {editingVideo ? 'Update' : 'Add'} Video
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Length</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {videos.map(video => (
              <tr key={video.id}>
                <td className="px-6 py-4 whitespace-nowrap">{video.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{video.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">{video.video_length}s</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-4">
                  <button
                    onClick={() => handleEdit(video)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPage
