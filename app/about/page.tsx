import { ArrowLeft, Mail, Phone, MapPin, Clock, Heart } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-primary-600 to-accent-purple text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>
          <h1 className="text-4xl font-bold">关于我们</h1>
          <p className="mt-2 text-white/80">了解信息工程学院团总支</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">组织简介</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            信息工程学院团总支是在学院党委领导和校团委指导下开展工作的学生组织，是连接学院与学生的桥梁纽带。
            我们始终坚持"服务同学、锻炼自我、引领青春"的宗旨，致力于为广大同学搭建成长成才的平台。
          </p>
          <p className="text-gray-600 leading-relaxed">
            团总支下设组织部、宣传部、实践部、科创部四个部门，各部门分工明确、协作紧密，
            共同组织开展思想引领、学风建设、志愿服务、科技创新等各类活动，丰富校园文化生活，
            促进同学全面发展。
          </p>
        </div>

        {/* History */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">发展历程</h2>
          <div className="space-y-6">
            {[
              { year: '2020', event: '信息工程学院团总支正式成立，开启服务同学新征程' },
              { year: '2021', event: '获评校级"优秀团总支"称号，志愿服务项目获省级表彰' },
              { year: '2022', event: '首届"代码马拉松"成功举办，吸引全校200余名同学参与' },
              { year: '2023', event: '新媒体平台粉丝突破5000，团学活动影响力显著提升' },
              { year: '2024', event: '组织架构优化升级，四大部门协同运作，迈向新征程' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-primary-500 rounded-full" />
                  {idx !== 4 && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
                </div>
                <div className="pb-6">
                  <span className="text-primary-600 font-bold">{item.year}</span>
                  <p className="text-gray-600 mt-1">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">联系我们</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">办公地点</h3>
                <p className="text-gray-600 text-sm">信息工程学院大楼 301 室</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">电子邮箱</h3>
                <p className="text-gray-600 text-sm">it_league@example.edu.cn</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">联系电话</h3>
                <p className="text-gray-600 text-sm">010-12345678</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">办公时间</h3>
                <p className="text-gray-600 text-sm">周一至周五 9:00-17:00</p>
              </div>
            </div>
          </div>

          {/* Recruitment */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-bold text-gray-900">招新信息</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              每年秋季学期，团总支都会面向全院新生开展招新工作。如果你对团学工作充满热情，
              希望在大学期间锻炼自己的组织协调能力，欢迎加入我们这个大家庭！
            </p>
            <p className="text-gray-600 leading-relaxed">
              招新时间：每年 9 月
              <br />
              招新对象：信息工程学院全体在校学生
              <br />
              报名方式：关注团总支公众号或前往 301 办公室咨询
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
