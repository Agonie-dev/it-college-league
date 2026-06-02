'use client'

import { Calendar, ArrowLeft, X, ZoomIn } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface NewsItem {
  id: number
  title: string
  date: string
  category: string
  content: string
}

export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  useEffect(() => {
    fetch('/api/news/')
      .then(res => res.json())
      .then(data => {
        setNewsList(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>
          <h1 className="text-4xl font-bold">新闻动态</h1>
          <p className="mt-2 text-white/80">了解团总支最新资讯与活动报道</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {newsList.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>暂无新闻</p>
            </div>
          ) : (
            newsList.map((news) => (
              <article 
                key={news.id} 
                className="bg-white rounded-2xl p-6 shadow-sm card-hover cursor-pointer"
                onClick={() => setSelectedNews(news)}
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {news.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    {news.date}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{news.title}</h2>
                <p className="text-gray-600 leading-relaxed line-clamp-3">{news.content}</p>
                <div className="mt-3 flex items-center gap-1 text-gray-400 text-sm">
                  <ZoomIn className="w-4 h-4" />
                  点击查看详情
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedNews && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedNews(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {selectedNews.category}
                </span>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {selectedNews.date}
                </div>
              </div>
              <button 
                onClick={() => setSelectedNews(null)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedNews.title}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedNews.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}