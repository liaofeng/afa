import React from 'react'
import dayjs from 'dayjs'
import { HeartIcon } from '@heroicons/react/24/solid'

function VideoCard({ video }) {
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-surface-dark rounded-lg overflow-hidden">
      <div className="relative aspect-video">
        <img src={video.cover_url} alt={video.title} className="w-full h-full object-cover" />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
          {formatDuration(video.video_length)}
        </span>
        <span className="absolute bottom-2 left-2 flex items-center text-white text-sm">
          <HeartIcon className="h-4 w-4 text-accent mr-1" />
          {video.like_count}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-primary truncate">{video.title}</h3>
        <p className="text-sm text-text-secondary">{video.author}</p>
        <div className="mt-2 flex justify-between text-sm text-text-secondary">
          <span>{dayjs(video.created_at).format('YYYY-MM-DD')}</span>
          <span>{video.view_count} views</span>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
