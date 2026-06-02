import { MapPin, Calendar, Users, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const activities = [
  {
    id: 1,
    title: '春季技术分享会',
    date: '2024-06-15 14:00',
    location: '信息楼 302 报告厅',
    participants: '不限',
    image: 'bg-gradient-to-br from-primary-400 to-primary-600',
    status: '报名中',
    statusColor: 'bg-green-500',
    description: '邀请学院优秀学长学姐分享技术学习经验，涵盖前端开发、后端架构、人工智能等多个方向。现场设有问答环节，欢迎携带技术问题前来交流。',
  },
  {
    id: 2,
    title: '"青春志愿行"社区电脑维修服务',
    date: '2024-06-22 09:00',
    location: '阳光社区服务中心',
    participants: '20人',
    image: 'bg-gradient-to-br from-accent-purple to-primary-500',
    status: '即将开始',
    statusColor: 'bg-accent-yellow text-gray-900',
    description: '走进社区，为居民提供免费电脑维修和网络安全咨询服务。实践部组织，欢迎有计算机基础的同学报名参加。',
  },
  {
    id: 3,
    title: '团建户外拓展活动',
    date: '2024-07-05 08:00',
    location: '青龙山风景区',
    participants: '50人',
    image: 'bg-gradient-to-br from-accent-orange to-red-500',
    status: '筹备中',
    statusColor: 'bg-gray-500',
    description: '全体成员户外拓展，增进团队凝聚力。活动包括徒步登山、团队游戏、野餐等环节，是认识新朋友的绝佳机会。',
  },
  {
    id: 4,
    title: '"代码马拉松"编程比赛',
    date: '2024-07-15 09:00',
    location: '计算机中心实验室',
    participants: '不限',
    image: 'bg-gradient-to-br from-accent-yellow to-accent-orange',
    status: '报名中',
    statusColor: 'bg-green-500',
    description: '48小时极限编程挑战！3人一组，围绕给定主题开发完整项目。评委由学院老师和业界工程师组成，一等奖奖金 3000 元。',
  },
]

export default function ActivitiesPage() {
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
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover">
              <div className={`h-48 ${activity.image} relative`}>
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-1.5 rounded-full text-white text-sm font-medium ${activity.statusColor}`}>
                    {activity.status}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-3xl font-bold text-white">{activity.title}</h2>
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
          ))}
        </div>
      </div>
    </div>
  )
}
