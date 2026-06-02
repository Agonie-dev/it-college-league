import Link from 'next/link'
import { ArrowRight, Sparkles, Users, Calendar, Award } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-purple/5">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent-purple/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              青春正当时，奋斗新征程
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-gray-900">信息工程学院</span>
              <br />
              <span className="gradient-text">团总支</span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              服务同学、锻炼自我、引领青春。在这里，每一个想法都能发光，每一份热情都有舞台。
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/activities/" className="btn-primary flex items-center gap-2">
                探索活动
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/about/" className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-full font-semibold 
                                               hover:border-primary-500 hover:text-primary-600 transition-all duration-300">
                了解我们
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[
                { icon: Users, label: '成员', value: '200+' },
                { icon: Calendar, label: '活动', value: '50+' },
                { icon: Award, label: '荣誉', value: '30+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-6 h-6 text-primary-500 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side illustration */}
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-primary-500 to-accent-purple rounded-3xl rotate-6 opacity-20 absolute" />
              <div className="w-80 h-80 bg-white rounded-3xl shadow-2xl flex items-center justify-center relative">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-purple rounded-2xl mx-auto 
                                  flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">凝聚青春力量</h3>
                    <p className="text-gray-500">共创精彩未来</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
