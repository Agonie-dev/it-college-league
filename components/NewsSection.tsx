'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

const newsItems = [
  {
    id: 1,
    title: '信息工程学院团总支换届大会圆满举行',
    date: '2024-05-20',
    category: '团学动态',
    excerpt: '新一届团总支成员正式就职，开启服务同学新征程...',
    color: 'bg-primary-500',
  },
  {
    id: 2,
    title: '"代码马拉松"编程比赛报名开启',
    date: '2024-05-18',
    category: '活动预告',
    excerpt: '48小时极限编程挑战，丰厚奖品等你来拿...',
    color: 'bg-accent-orange',
  },
  {
    id: 3,
    title: '志愿服务队走进社区开展电脑维修活动',
    date: '2024-05-15',
    category: '志愿服务',
    excerpt: '为社区居民免费维修电脑，普及网络安全知识...',
    color: 'bg-accent-purple',
  },
]

export default function NewsSection() {
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
              <div className={`h-2 ${item.color}`} />
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className={`px-3 py-1 rounded-full text-white text-xs ${item.color}`}>
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
                <p className="text-gray-600 text-sm leading-relaxed">{item.excerpt}</p>
                <Link href={`/news/`} className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm hover:gap-2 transition-all">
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
