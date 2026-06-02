import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('moments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  // Check auth
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader?.includes('admin_token=authenticated')) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  const { content, image_url } = await request.json()

  if (!content?.trim()) {
    return NextResponse.json({ error: '内容不能为空' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('moments')
    .insert({ content, image_url })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
