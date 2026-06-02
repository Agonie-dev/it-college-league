'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, LogOut, Send, ImagePlus, X, Loader2, Trash2 } from 'lucide-react'

interface Moment {
  id: number
  content: string
  image_url?: string
  created_at: string
}

export default function AdminPage() {
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [moments, setMoments] = useState<Moment[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const router = useRouter()

  // Check auth on mount
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

  // Fetch moments
  const fetchMoments = useCallback(() => {
    setLoading(true)
    fetch('/api/moments/')
      .then(res => res.json())
      .then(data => {
        setMoments(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (authChecked) fetchMoments()
  }, [authChecked, fetchMoments])

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

      if (res.status === 401) {
        router.push('/admin/login/')
        return
      }

      const data = await res.json()
      if (data.error) {
        alert(data.error)
      } else {
        setContent('')
        setImageUrl('')
        fetchMoments()
      }
    } catch {
      alert('发布失败')
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/logout/', { method: 'POST' })
    router.push('/')
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">发布动态</h1>
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

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Publish Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                动态内容
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                placeholder="分享团总支的最新动态..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                图片链接（可选）
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  placeholder="https://example.com/image.jpg"
                />
                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                )}
              </div>
              {imageUrl && (
                <div className="mt-3">
                  <img src={imageUrl} alt="预览" className="w-full max-w-md rounded-xl object-cover" />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-gray-500">
                提示：图片需要上传到图床后粘贴链接
              </div>
              <button
                type="submit"
                disabled={submitting || !content.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold
                           hover:from-primary-500 hover:to-primary-400 transition-all duration-300
                           active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {submitting ? '发布中...' : '发布动态'}
              </button>
            </div>
          </form>
        </div>

        {/* Moments List */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">已发布动态</h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
          ) : moments.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <ImagePlus className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>还没有发布过动态</p>
            </div>
          ) : (
            <div className="space-y-4">
              {moments.map(moment => (
                <div key={moment.id} className="flex gap-4 p-4 rounded-xl bg-gray-50">
                  {moment.image_url && (
                    <img
                      src={moment.image_url}
                      alt=""
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-sm line-clamp-3">{moment.content}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(moment.created_at).toLocaleString('zh-CN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
