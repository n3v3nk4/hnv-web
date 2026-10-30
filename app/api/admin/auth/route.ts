import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { signSession } from '@/lib/auth'

export async function POST(request: Request) {
  const { password } = await request.json()
  const adminPassword = process.env.ADMIN_PASSWORD || 'HNV2026!Admin'

  if (password === adminPassword) {
    const token = signSession()
    const cookieStore = await cookies()
    
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 horas
    })

    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
}