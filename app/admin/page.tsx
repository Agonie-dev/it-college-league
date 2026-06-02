'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, LogOut, Send, Trash2, Loader2, ImagePlus, Newspaper, Users, CalendarDays, Info } from 'lucide-react'

interface Moment {
  id: number
  content: string
  image_url?: string
  created_at: string
}

type Tab = 'moments' | 'news' | 'departments' | 'activities' | 'about'

function useAuth() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    fetch('/api/moments/')
      .then(res => {
        if (res.status === 401) {
          router.push('/admin/login/')
        } else {
          setAuthChecked(true)
        }
      })
      .catch(() => router.push('/admin/login/'))
  }, [router])

  return authChecked
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
}

/* ---------- Moments ---------- */
function MomentsManager() {
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [moments, setMoments] = useState<Moment[]>([])
  const [submitting, setSubmitting] = useState(false)

  const fetchMoments = useCallback(() => {
    fetch('/api/moments/')
      .then(res => res.json())
      .then(data => setMoments(data))
  }, [])

  useEffect(() => {
    fetchMoments()
  }, [fetchMoments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/moments/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, image_url: imageUrl || undefined }),
      })
      if (res.status === 401) { window.location.href = '/admin/login/'; return }
      if (res.ok) {
        setContent('')
        setImageUrl('')
        fetchMoments()
      } else {
        const data = await res.json()
        alert(data.error || '发布失败')
      }
    } catch {
      alert('发布失败')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定删除这条动态吗？')) return
    const res = await fetch(`/api/moments/?id=${id}`, { method: 'DELETE' })
    if (res.ok) fetchMoments()
    else alert('删除失败')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
            placeholder="分享团总支的最新动态..."
            required
          />
          <div className="flex gap-2">
            <input
              type="url"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              placeholder="图片链接（可选）"
            />
          </div>
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="预览" className="w-full max-w-md rounded-xl object-cover" />
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">图片需要上传到图床后粘贴链接</span>
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold
                         hover:from-primary-500 hover:to-primary-400 transition-all active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {submitting ? '发布中...' : '发布动态'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <SectionTitle title="已发布动态" />
        {moments.length === 0 ? (
          <div className="text-center py-8 text-gray-400">暂无动态</div>
        ) : (
          <div className="space-y-4">
            {moments.map(moment => (
              <div key={moment.id} className="flex gap-4 p-4 rounded-xl bg-gray-50 items-start">
                {moment.image_url && (
                  <img src={moment.image_url} alt="" className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 text-sm line-clamp-3">{moment.content}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(moment.created_at).toLocaleString('zh-CN')}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(moment.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- News ---------- */
function NewsManager() {
  const [items, setItems] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('团学动态')
  const [date, setDate] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchData = useCallback(() => {
    fetch('/api/news/').then(r => r.json()).then(setItems)
  }, [])

  useEffect(() => {
    fetchData()
    // Set default date to today
    setDate(new Date().toISOString().split('T')[0])
  }, [fetchData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/news/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category, date, excerpt }),
      })
      if (res.status === 401) { window.location.href = '/admin/login/'; return }
      if (res.ok) {
        setTitle(''); setContent(''); setExcerpt('');
        fetchData()
      } else {
        const data = await res.json()
        alert(data.error || '发布失败')
      }
    } catch {
      alert('发布失败')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定删除这条新闻吗？')) return
    const res = await fetch(`/api/news/?id=${id}`, { method: 'DELETE' })
    if (res.ok) fetchData()
    else alert('删除失败')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <SectionTitle title="发布新闻" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
            placeholder="新闻标题"
            required
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              placeholder="分类"
              required
            />
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              required
            />
          </div>
          <textarea
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
            placeholder="摘要（可选）"
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
            placeholder="新闻正文"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold
                       hover:from-primary-500 hover:to-primary-400 transition-all active:scale-95 disabled:opacity-50"
          >
            {submitting ? '发布中...' : '发布新闻'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <SectionTitle title="新闻列表" />
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-400">暂无新闻</div>
        ) : (
          <div className="space-y-3">
            {items.map((item: any) => (
              <div key={item.id} className="flex items-start justify-between p-4 rounded-xl bg-gray-50">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs">{item.category}</span>
                    <span className="text-gray-400 text-xs">{item.date}</span>
                  </div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                </div>
                <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- Departments ---------- */
function DepartmentsManager() {
  const [items, setItems] = useState<any[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [responsibilities, setResponsibilities] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchData = useCallback(() => {
    fetch('/api/departments/').then(r => r.json()).then(setItems)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const respArray = responsibilities.split('\n').filter(Boolean)
    try {
      const res = await fetch('/api/departments/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, description,
          icon: 'Users',
          color: 'from-primary-500 to-primary-600',
          light_color: 'bg-primary-50',
          text_color: 'text-primary-600',
          responsibilities: respArray,
        }),
      })
      if (res.status === 401) { window.location.href = '/admin/login/'; return }
      if (res.ok) {
        setName(''); setDescription(''); setResponsibilities('');
        fetchData()
      } else {
        const data = await res.json()
        alert(data.error || '添加失败')
      }
    } catch {
      alert('添加失败')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定删除吗？')) return
    const res = await fetch(`/api/departments/?id=${id}`, { method: 'DELETE' })
    if (res.ok) fetchData()
    else alert('删除失败')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <SectionTitle title="添加部门" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            placeholder="部门名称"
            required
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none resize-none"
            placeholder="部门描述"
            required
          />
          <textarea
            value={responsibilities}
            onChange={e => setResponsibilities(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none resize-none"
            placeholder="职责（每行一条）"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {submitting ? '添加中...' : '添加部门'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <SectionTitle title="部门列表" />
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-400">暂无部门</div>
        ) : (
          <div className="space-y-3">
            {items.map((item: any) => (
              <div key={item.id} className="flex items-start justify-between p-4 rounded-xl bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
                <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- Activities ---------- */
function ActivitiesManager() {
  const [items, setItems] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [participants, setParticipants] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [status, setStatus] = useState('报名中')
  const [statusColor, setStatusColor] = useState('bg-green-500')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchData = useCallback(() => {
    fetch('/api/activities/').then(r => r.json()).then(setItems)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/activities/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, date, location, participants, image_url: imageUrl || null,
          status, status_color: statusColor, description,
        }),
      })
      if (res.status === 401) { window.location.href = '/admin/login/'; return }
      if (res.ok) {
        setTitle(''); setDate(''); setLocation(''); setParticipants('')
        setImageUrl(''); setDescription('')
        fetchData()
      } else {
        const data = await res.json()
        alert(data.error || '添加失败')
      }
    } catch {
      alert('添加失败')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定删除吗？')) return
    const res = await fetch(`/api/activities/?id=${id}`, { method: 'DELETE' })
    if (res.ok) fetchData()
    else alert('删除失败')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <SectionTitle title="添加活动" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="活动标题" required />
          <div className="grid sm:grid-cols-3 gap-4">
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" required />
            <input value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="地点" required />
            <input value={participants} onChange={e => setParticipants(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="人数限制（如 50人）" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none">
              <option value="报名中">报名中</option>
              <option value="即将开始">即将开始</option>
              <option value="进行中">进行中</option>
              <option value="已结束">已结束</option>
              <option value="筹备中">筹备中</option>
            </select>
            <select value={statusColor} onChange={e => setStatusColor(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none">
              <option value="bg-green-500">绿色</option>
              <option value="bg-accent-yellow text-gray-900">黄色</option>
              <option value="bg-gray-500">灰色</option>
              <option value="bg-red-500">红色</option>
              <option value="bg-primary-500">蓝色</option>
            </select>
          </div>
          <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="封面图片链接（可选）" />
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none resize-none" placeholder="活动详情" required />
          <button type="submit" disabled={submitting} className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold disabled:opacity-50">
            {submitting ? '添加中...' : '添加活动'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <SectionTitle title="活动列表" />
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-400">暂无活动</div>
        ) : (
          <div className="space-y-3">
            {items.map((item: any) => (
              <div key={item.id} className="flex items-start justify-between p-4 rounded-xl bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.date} · {item.location}</p>
                </div>
                <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- About ---------- */
function AboutManager() {
  const [intro, setIntro] = useState('')
  const [historyText, setHistoryText] = useState('')
  const [contactLocation, setContactLocation] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactHours, setContactHours] = useState('')
  const [recruitment, setRecruitment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/about/').then(r => r.json()).then(data => {
      if (data.intro?.text) setIntro(data.intro.text)
      if (data.history?.events) {
        setHistoryText(data.history.events.map((e: any) => `${e.year}: ${e.event}`).join('\n'))
      }
      if (data.contact) {
        setContactLocation(data.contact.location || '')
        setContactEmail(data.contact.email || '')
        setContactPhone(data.contact.phone || '')
        setContactHours(data.contact.hours || '')
      }
      if (data.recruitment?.text) setRecruitment(data.recruitment.text)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const historyEvents = historyText.split('\n').filter(Boolean).map(line => {
      const [year, ...rest] = line.split(':')
      return { year: year.trim(), event: rest.join(':').trim() }
    })
    try {
      await Promise.all([
        fetch('/api/about/', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ section: 'intro', data: { text: intro } }),
        }),
        fetch('/api/about/', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ section: 'history', data: { events: historyEvents } }),
        }),
        fetch('/api/about/', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ section: 'contact', data: { location: contactLocation, email: contactEmail, phone: contactPhone, hours: contactHours } }),
        }),
        fetch('/api/about/', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ section: 'recruitment', data: { text: recruitment } }),
        }),
      ])
      alert('保存成功')
    } catch {
      alert('保存失败')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <SectionTitle title="编辑关于我们" />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">组织简介</label>
            <textarea value={intro} onChange={e => setIntro(e.target.value)} rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none resize-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">发展历程（每行格式：年份: 事件）</label>
            <textarea value={historyText} onChange={e => setHistoryText(e.target.value)} rows={6} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none resize-none font-mono text-sm" placeholder={`2020: 团总支成立\n2021: 获评优秀称号`} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input value={contactLocation} onChange={e => setContactLocation(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="办公地点" />
            <input value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="邮箱" />
            <input value={contactPhone} onChange={e => setContactPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="电话" />
            <input value={contactHours} onChange={e => setContactHours(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="办公时间" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">招新信息</label>
            <textarea value={recruitment} onChange={e => setRecruitment(e.target.value)} rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none resize-none" />
          </div>
          <button type="submit" disabled={submitting} className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold disabled:opacity-50">
            {submitting ? '保存中...' : '保存关于我们'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ---------- Main Admin Page ---------- */
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('moments')
  const authChecked = useAuth()
  const router = useRouter()

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: 'moments', label: '动态', icon: ImagePlus },
    { key: 'news', label: '新闻', icon: Newspaper },
    { key: 'departments', label: '部门', icon: Users },
    { key: 'activities', label: '活动', icon: CalendarDays },
    { key: 'about', label: '关于我们', icon: Info },
  ]

  const handleLogout = async () => {
    await fetch('/api/logout/', { method: 'POST' })
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">管理后台</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">退出</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap
                    ${activeTab === tab.key
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'moments' && <MomentsManager />}
        {activeTab === 'news' && <NewsManager />}
        {activeTab === 'departments' && <DepartmentsManager />}
        {activeTab === 'activities' && <ActivitiesManager />}
        {activeTab === 'about' && <AboutManager />}
      </div>
    </div>
  )
}
