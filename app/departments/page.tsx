import { Users, BookOpen, Heart, Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const departments = [
  {
    id: 1,
    name: '组织部',
    icon: Users,
    color: 'from-primary-500 to-primary-600',
    lightColor: 'bg-primary-50',
    textColor: 'text-primary-600',
    responsibilities: [
      '负责团员发展、团籍管理工作',
      '组织开展团组织生活',
      '负责团费收缴与团籍注册',
      '开展团员思想政治教育',
    ],
    description: '组织部是团总支的核心职能部门，负责团组织建设和团员管理。在这里，你将学会如何组织一场活动，如何与人沟通协调，如何管理一个团队。',
  },
  {
    id: 2,
    name: '宣传部',
    icon: BookOpen,
    color: 'from-accent-orange to-red-500',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    responsibilities: [
      '运营团总支新媒体平台',
      '设计制作活动海报与宣传品',
      '撰写新闻稿与活动报道',
      '拍摄记录活动精彩瞬间',
    ],
    description: '宣传部是团总支的"门面担当"，负责对外宣传和形象展示。在这里，你可以发挥创意，学习新媒体运营、平面设计、摄影摄像等实用技能。',
  },
  {
    id: 3,
    name: '实践部',
    icon: Heart,
    color: 'from-accent-purple to-primary-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    responsibilities: [
      '组织志愿服务活动',
      '开展社会实践活动',
      '对接校内外公益项目',
      '管理志愿者队伍',
    ],
    description: '实践部是团总支的"爱心窗口"，负责组织和开展各类志愿服务和社会实践活动。在这里，你可以奉献爱心、服务社会，收获满满的成就感。',
  },
  {
    id: 4,
    name: '科创部',
    icon: Zap,
    color: 'from-accent-yellow to-accent-orange',
    lightColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    responsibilities: [
      '承办编程比赛与技术竞赛',
      '组织技术沙龙与分享会',
      '协助学院创新创业项目',
      '搭建技术交流平台',
    ],
    description: '科创部是团总支的"技术引擎"，负责组织和开展科技创新活动。在这里，你可以与志同道合的技术爱好者一起交流切磋，提升专业技能。',
  },
]

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-accent-purple to-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>
          <h1 className="text-4xl font-bold">部门介绍</h1>
          <p className="mt-2 text-white/80">四大部门，各展所长，等你加入</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover">
              <div className={`h-2 bg-gradient-to-r ${dept.color}`} />
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 ${dept.lightColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <dept.icon className={`w-8 h-8 ${dept.textColor}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{dept.name}</h2>
                    <p className="text-gray-600 mt-2 leading-relaxed">{dept.description}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">主要职责</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {dept.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full ${dept.textColor.replace('text-', 'bg-')} mt-2`} />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
