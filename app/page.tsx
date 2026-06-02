import Hero from '@/components/Hero'
import NewsSection from '@/components/NewsSection'
import DepartmentSection from '@/components/DepartmentSection'
import ActivitySection from '@/components/ActivitySection'
import Link from 'next/link'
import { Heart, Target, Lightbulb, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Mission */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">我们的宗旨</h2>
            <p className="text-gray-500 mt-2">以青春之名，践行使命担当</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: '服务同学',
                desc: '想同学之所想，急同学之所急，做同学身边的贴心人',
                color: 'text-red-500',
                bg: 'bg-red-50',
              },
              {
                icon: Target,
                title: '锻炼自我',
                desc: '在实践中成长，在奉献中收获，打造更好的自己',
                color: 'text-primary-600',
                bg: 'bg-primary-50',
              },
              {
                icon: Lightbulb,
                title: '引领青春',
                desc: '传递正能量，树立好榜样，带动身边同学积极向上',
                color: 'text-accent-purple',
                bg: 'bg-purple-50',
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 bg-white rounded-2xl shadow-sm card-hover">
                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsSection />
      <DepartmentSection />
      <ActivitySection />

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary-600 to-accent-purple rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">加入我们</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            如果你也想在大学期间锻炼能力、结交朋友、收获成长，欢迎加入信息工程学院团总支！
          </p>
          <Link href="/about/" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-full font-bold 
                                         hover:bg-white/90 transition-all duration-300 hover:shadow-lg">
            了解招新信息 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
