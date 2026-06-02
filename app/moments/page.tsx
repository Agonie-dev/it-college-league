'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, MessageCircle, Share2, Calendar, ImageIcon, X, ZoomIn } from 'lucide-react'

interface Moment {
  id: number
  content: string
  image_url?: string
  created_at: string
}

export default function MomentsPage() {
  const [moments, setMoments] = useState<Moment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null)

  useEffect(() => {
    fetch('/api/moments/')
      .then(res => res.json())
      .then(data => {
        setMoments(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">团总支动态</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : moments.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无动态</p>
            <p className="text-gray-400 text-sm mt-1">管理员登录后可以发布</p>
          </div>
        ) : (
          <div className="space-y-4">
            {moments.map(moment => (
              <article 
                key={moment.id} 
                className="bg-white rounded-2xl shadow-sm overflow-hidden card-hover cursor-pointer"
                onClick={() => setSelectedMoment(moment)}
              >
                {/* User info bar */}
                <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-purple rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">团</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">信息工程学院团总支</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Calendar className="w-3 h-3" />
                      {formatDate(moment.created_at)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-3">
                  <p className="text-gray-800 leading-relaxed line-clamp-3">{moment.content}</p>
                </div>

                {/* Image */}
                {moment.image_url && (
                  <div className="px-4 pb-3">
                    <img 
                      src={moment.image_url} 
                      alt="动态图片" 
                      className="w-full rounded-xl object-cover max-h-80"
                    />
                  </div>
                )}

                {/* Click hint */}
                <div className="px-4 py-2 border-t border-gray-50 flex items-center justify-between text-gray-400 text-sm">
                  <span className="flex items-center gap-1">
                    <ZoomIn className="w-4 h-4" />
                    点击查看详情
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </span>
                    <span className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </span>
                    <span className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedMoment && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedMoment(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-purple rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">团</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">信息工程学院团总支</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Calendar className="w-3 h-3" />
                    {formatDate(selectedMoment.created_at)}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMoment(null)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
                {selectedMoment.content}
              </p>

              {selectedMoment.image_url && (
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src={selectedMoment.image_url} 
                    alt="动态图片" 
                    className="w-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-6 text-gray-500">
              <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm">赞</span>
              </button>
              <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">评论</span>
              </button>
              <button className="flex items-center gap-1 hover:text-primary-600 transition-colors ml-auto">
                <Share2 className="w-5 h-5" />
                <span className="text-sm">分享</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
