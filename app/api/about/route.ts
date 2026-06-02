import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('about_content')
    .select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Convert array to object keyed by section
  const result: Record<string, any> = {}
  data?.forEach((item: any) => {
    result[item.section] = item.data
  })

  return NextResponse.json(result)
}

export async function POST(request: Request) {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader?.includes('admin_token=authenticated')) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  const { section, data } = await request.json()

  if (!section || !data) {
    return NextResponse.json({ error: '缺少参数' }, { status: 400 })
  }

  const { error } = await supabase
    .from('about_content')
    .upsert({ section, data }, { onConflict: 'section' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
