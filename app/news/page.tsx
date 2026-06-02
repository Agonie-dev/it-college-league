import { Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const newsList = [
  {
    id: 1,
    title: '信息工程学院团总支换届大会圆满举行',
    date: '2024-05-20',
    category: '团学动态',
    content: '5月18日下午，信息工程学院团总支换届大会在学院报告厅隆重举行。上一届团总支书记总结了过去一年的工作成果，新一届团总支成员正式就职，并发表了就职演讲。学院领导对团总支工作给予了充分肯定，并对新一届成员提出了殷切期望...',
  },
  {
    id: 2,
    title: '"代码马拉松"编程比赛报名开启',
    date: '2024-05-18',
    category: '活动预告',
    content: '由科创部承办的第二届"代码马拉松"编程比赛正式启动报名！本次比赛为期48小时，参赛选手需要在规定时间内完成指定主题的软件开发任务。比赛设置一等奖、二等奖、三等奖及优秀奖若干，奖品丰厚，欢迎全院同学踊跃报名...',
  },
  {
    id: 3,
    title: '志愿服务队走进社区开展电脑维修活动',
    date: '2024-05-15',
    category: '志愿服务',
    content: '5月12日，团总支实践部组织的志愿服务队走进阳光社区，为社区居民提供免费电脑维修服务。活动期间，志愿者们共维修电脑30余台，并为居民普及了网络安全知识，受到了社区居民的一致好评...',
  },
  {
    id: 4,
    title: '宣传部开展新媒体运营培训会',
    date: '2024-05-10',
    category: '部门动态',
    content: '为提高团总支成员的新媒体运营能力，宣传部于5月8日组织了专题培训会。培训内容包括微信公众号运营、海报设计、视频剪辑等内容，由学院具有丰富经验的同学担任主讲，培训效果良好...',
  },
  {
    id: 5,
    title: '团总支获评校级"优秀团总支"称号',
    date: '2024-05-05',
    category: '荣誉表彰',
    content: '在2023-2024年度共青团工作评优中，信息工程学院团总支凭借扎实的工作和突出的成绩，荣获校级"优秀团总支"称号。这是对我院团学工作的充分肯定，也是全体成员共同努力的结果...',
  },
]

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>
          <h1 className="text-4xl font-bold">新闻动态</h1>
          <p className="mt-2 text-white/80">了解团总支最新资讯与活动报道</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {newsList.map((news) => (
            <article key={news.id} className="bg-white rounded-2xl p-6 shadow-sm card-hover">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {news.category}
                </span>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {news.date}
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors cursor-pointer">
                {news.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {news.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
