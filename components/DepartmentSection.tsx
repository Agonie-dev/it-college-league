'use client'

import Link from 'next/link'
import { ArrowRight, Users, BookOpen, Heart, Zap } from 'lucide-react'
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
}

export default function DepartmentSection() {
  const [departments, setDepartments] = useState<Department[]>([])

  useEffect(() => {
    fetch('/api/departments/')
      .then(res => res.json())
      .then(data => setDepartments(data?.slice(0, 4) || []))
  }, [])

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
          {departments.map((dept) => {
            const Icon = iconMap[dept.icon] || Users
            return (
              <div key={dept.id} className="group bg-white rounded-2xl p-6 shadow-sm card-hover border border-gray-100">
                <div className={`w-14 h-14 ${dept.light_color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${dept.text_color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{dept.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{dept.description}</p>
                <Link href="/departments/" className={`inline-flex items-center gap-1 text-sm font-medium ${dept.text_color} hover:gap-2 transition-all`}>
                  了解更多 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
