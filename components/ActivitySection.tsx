'use client'

import Link from 'next/link'
import { ArrowRight, MapPin, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Activity {
  id: number
  title: string
  date: string
  location: string
  status: string
  status_color: string
  image_url: string | null
}

export default function ActivitySection() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    fetch('/api/activities/')
      .then(res => res.json())
      .then(data => setActivities(data?.slice(0, 3) || []))
  }, [])

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">活动风采</h2>
            <p className="text-gray-500 mt-2">精彩纷呈，等你参与</p>
          </div>
          <Link href="/activities/" className="hidden sm:flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors">
            全部活动 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div key={activity.id} className="group rounded-2xl overflow-hidden shadow-lg card-hover">
              <div className={`h-48 ${activity.image_url ? '' : 'bg-gradient-to-br from-primary-400 to-primary-600'} relative`}>
                {activity.image_url && (
                  <img src={activity.image_url} alt={activity.title} className="w-full h-full object-cover" />
                )}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${activity.status_color}`}>
                    {activity.status}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-bold opacity-80 drop-shadow-lg">{activity.title}</span>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {activity.title}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary-500" />
                    {activity.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary-500" />
                    {activity.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
