'use client'

import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NewsItem {
  id: number
  title: string
  date: string
  category: string
  excerpt?: string
  content?: string
}

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])

  useEffect(() => {
    fetch('/api/news/')
      .then(res => res.json())
      .then(data => setNewsItems(data?.slice(0, 3) || []))
  }, [])

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">新闻动态</h2>
            <p className="text-gray-500 mt-2">了解团总支最新资讯</p>
          </div>
          <Link href="/news/" className="hidden sm:flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors">
            查看更多 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <article key={item.id} className="group bg-gray-50 rounded-2xl overflow-hidden card-hover">
              <div className="h-2 bg-primary-500" />
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="px-3 py-1 rounded-full text-white text-xs bg-primary-500">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.excerpt || (item.content ? item.content.slice(0, 80) + '...' : '')}
                </p>
                <Link href="/news/" className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm hover:gap-2 transition-all">
                  阅读全文 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/news/" className="inline-flex items-center gap-2 text-primary-600 font-medium">
            查看更多 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
