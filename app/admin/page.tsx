'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function AdminPanel() {
  const [loading, setLoading] = useState(true)
  const [autorizado, setAutorizado] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Obtener el usuario actual
      const { data: { user } } = await supabase.auth.getUser()
      
      // 2. Si no hay usuario, redirigir inmediatamente
      if (!user) {
        router.replace('/admin/login')
        return
      }

      // 3. Verificar si está en la tabla de admins
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', user.email)
        .single()

      // 4. Si hay error o no es admin, cerrar sesión y redirigir
      if (error || !data) {
        await supabase.auth.signOut()
        router.replace('/admin/login')
        return
      }

      // 5. Todo correcto, mostrar el panel
      setUser(data)
      setAutorizado(true)
      setLoading(false)
    }

    // Ejecutar la verificación
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  if (!autorizado) return null

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-black text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Panel de Administración</h1>
            <p className="text-xs text-gray-400">
              {user?.nombre} — {user?.cargo}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Link href="/admin/galeria" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition group">
            <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-100 transition">
              <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-black mb-1">Galería</h2>
            <p className="text-gray-600 text-sm">Subir fotos y videos</p>
          </Link>

          <Link href="/admin/miembros" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition group">
            <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-100 transition">
              <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-black mb-1">Miembros</h2>
            <p className="text-gray-600 text-sm">Ver solicitudes</p>
          </Link>

          <Link href="/admin/donaciones" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition group">
            <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-100 transition">
              <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-black mb-1">Donaciones</h2>
            <p className="text-gray-600 text-sm">Ver registros</p>
          </Link>

          <Link href="/admin/textos" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition group">
            <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-100 transition">
              <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-black mb-1">Editar Textos</h2>
            <p className="text-gray-600 text-sm">Cambiar portada</p>
          </Link>

        </div>
      </div>
    </div>
  )
}