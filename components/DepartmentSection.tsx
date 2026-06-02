import Link from 'next/link'
import { ArrowRight, Users, BookOpen, Heart, Zap } from 'lucide-react'

const departments = [
  {
    id: 1,
    name: '组织部',
    icon: Users,
    color: 'from-primary-500 to-primary-600',
    bgColor: 'bg-primary-50',
    textColor: 'text-primary-600',
    description: '负责团员发展、团籍管理、团组织建设等基础团务工作',
  },
  {
    id: 2,
    name: '宣传部',
    icon: BookOpen,
    color: 'from-accent-orange to-red-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    description: '负责活动宣传、新媒体运营、海报设计等宣传推广工作',
  },
  {
    id: 3,
    name: '实践部',
    icon: Heart,
    color: 'from-accent-purple to-primary-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    description: '组织志愿服务、社会实践、公益活动等实践育人项目',
  },
  {
    id: 4,
    name: '科创部',
    icon: Zap,
    color: 'from-accent-yellow to-accent-orange',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    description: '承办编程比赛、技术沙龙、创新创业等科技活动',
  },
]

export default function DepartmentSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">部门介绍</h2>
            <p className="text-gray-500 mt-2">四大部门，各展所长</p>
          </div>
          <Link href="/departments/" className="hidden sm:flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors">
            查看详情 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <div key={dept.id} className="group bg-white rounded-2xl p-6 shadow-sm card-hover border border-gray-100">
              <div className={`w-14 h-14 ${dept.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <dept.icon className={`w-7 h-7 ${dept.textColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{dept.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{dept.description}</p>
              <Link href="/departments/" className={`inline-flex items-center gap-1 text-sm font-medium ${dept.textColor} hover:gap-2 transition-all`}>
                了解更多 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
