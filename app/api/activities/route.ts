import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('date', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data || [])
}

export async function POST(request: Request) {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader?.includes('admin_token=authenticated')) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  const body = await request.json()
  const { data, error } = await supabase.from('activities').insert(body).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader?.includes('admin_token=authenticated')) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: '缺少 ID' }, { status: 400 })
  }

  const { error } = await supabase.from('activities').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
