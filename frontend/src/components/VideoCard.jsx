import React from 'react'
import dayjs from 'dayjs'

function VideoCard({ video }) {
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative">
        <img src={video.cover_url} alt={video.title} className="w-full h-48 object-cover" />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
          {formatDuration(video.video_length)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{video.title}</h3>
        <p className="text-sm text-gray-500">{video.author}</p>
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>{dayjs(video.created_at).format('YYYY-MM-DD')}</span>
          <div className="flex space-x-4">
            <span>{video.like_count} likes</span>
            <span>{video.view_count} views</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
