'use client'

import { Users, BookOpen, Heart, Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const iconMap: Record<string, any> = { Users, BookOpen, Heart, Zap }

interface Department {
  id: number
  name: string
  icon: string
  color: string
  light_color: string
  text_color: string
  description: string
  responsibilities: string[]
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/departments/')
      .then(res => res.json())
      .then(data => {
        setDepartments(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    )
  }

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
          {departments.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>暂无部门信息</p>
            </div>
          ) : (
            departments.map((dept) => {
              const Icon = iconMap[dept.icon] || Users
              return (
                <div key={dept.id} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover">
                  <div className={`h-2 bg-gradient-to-r ${dept.color}`} />
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-16 h-16 ${dept.light_color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-8 h-8 ${dept.text_color}`} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{dept.name}</h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">{dept.description}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">主要职责</h3>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {(dept.responsibilities || []).map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full ${dept.text_color.replace('text-', 'bg-')} mt-2`} />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
