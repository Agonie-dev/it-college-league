import Link from 'next/link'
import { ArrowRight, MapPin, Calendar } from 'lucide-react'

const activities = [
  {
    id: 1,
    title: '春季技术分享会',
    date: '2024-06-15',
    location: '信息楼 302 报告厅',
    image: 'bg-gradient-to-br from-primary-400 to-primary-600',
    status: '报名中',
    statusColor: 'bg-green-500',
  },
  {
    id: 2,
    title: '"青春志愿行"社区服务',
    date: '2024-06-22',
    location: '阳光社区服务中心',
    image: 'bg-gradient-to-br from-accent-purple to-primary-500',
    status: '即将开始',
    statusColor: 'bg-accent-yellow text-gray-900',
  },
  {
    id: 3,
    title: '团建户外拓展活动',
    date: '2024-07-05',
    location: '青龙山风景区',
    image: 'bg-gradient-to-br from-accent-orange to-red-500',
    status: '筹备中',
    statusColor: 'bg-gray-500',
  },
]

export default function ActivitySection() {
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
              <div className={`h-48 ${activity.image} relative`}>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${activity.statusColor}`}>
                    {activity.status}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-bold opacity-80">{activity.title}</span>
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
