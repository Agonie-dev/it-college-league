'use client'

import { Calendar, ArrowLeft } from 'lucide-react'
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
              <article key={news.id} className="bg-white rounded-2xl p-6 shadow-sm card-hover">
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
                <p className="text-gray-600 leading-relaxed">{news.content}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
