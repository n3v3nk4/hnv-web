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
      // Usamos getUser() para verificar la sesión de forma segura
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.replace('/admin/login')
        return
      }

      // Verificamos que esté en la tabla de admins
      const { data, error: dbError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', user.email)
        .single()

      if (dbError || !data) {
        await supabase.auth.signOut()
        router.replace('/admin/login')
        return
      }

      setUser(data)
      setAutorizado(true)
      setLoading(false)
    }

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
      <header className="bg-black text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Panel de Administración</h1>
            <p className="text-xs text-gray-400">Bienvenida, {user?.nombre}</p>
          </div>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition">Cerrar Sesión</button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link href="/admin/galeria" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all group hover:-translate-y-1">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-black mb-2">Galería de Fotos</h2>
            <p className="text-gray-500 text-sm">Sube imágenes y videos para la sección pública.</p>
          </Link>

          <Link href="/admin/miembros" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all group hover:-translate-y-1">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-black mb-2">Solicitudes de Membresía</h2>
            <p className="text-gray-500 text-sm">Revisa los datos de las personas que quieren unirse.</p>
          </Link>

          <Link href="/admin/donaciones" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all group hover:-translate-y-1">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-black mb-2">Registro de Donaciones</h2>
            <p className="text-gray-500 text-sm">Visualiza quiénes han donado y los montos.</p>
          </Link>

          <Link href="/admin/textos" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all group hover:-translate-y-1">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-black mb-2">Editar Textos</h2>
            <p className="text-gray-500 text-sm">Modifica el título y subtítulo de la portada.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}