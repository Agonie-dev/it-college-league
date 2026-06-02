'use client'

import { MapPin, Calendar, Users, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Activity {
  id: number
  title: string
  date: string
  location: string
  participants: string
  image_url: string | null
  status: string
  status_color: string
  description: string
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/activities/')
      .then(res => res.json())
      .then(data => {
        setActivities(data)
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
      <div className="bg-gradient-to-b from-accent-orange to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>
          <h1 className="text-4xl font-bold">活动风采</h1>
          <p className="mt-2 text-white/80">精彩纷呈，等你参与</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {activities.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>暂无活动</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover">
                <div className={`h-48 ${activity.image_url ? '' : 'bg-gradient-to-br from-primary-400 to-primary-600'} relative`}>
                  {activity.image_url && (
                    <img src={activity.image_url} alt={activity.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 rounded-full text-white text-sm font-medium ${activity.status_color}`}>
                      {activity.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-white drop-shadow-lg">{activity.title}</h2>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">{activity.description}</p>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      {activity.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4 text-primary-500" />
                      {activity.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-4 h-4 text-primary-500" />
                      人数：{activity.participants}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
