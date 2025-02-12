import React from 'react'

function VideoCardSkeleton() {
  return (
    <div className="bg-surface-dark rounded-lg overflow-hidden animate-pulse">
      <div className="relative aspect-video bg-gray-700"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  )
}

export default VideoCardSkeleton
