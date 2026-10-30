'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminPanel() {
  const [password, setPassword] = useState('')
  const [autorizado, setAutorizado] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth')
    if (isAuth === 'true') {
      setAutorizado(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    const passMaestra = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'HNV2026!Admin'
    if (password === passMaestra) {
      sessionStorage.setItem('admin_auth', 'true')
      setAutorizado(true)
    } else {
      setError(true)
      setPassword('')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setAutorizado(false)
  }

  if (!autorizado) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-black">Panel de Administración</h1>
            <p className="text-gray-600 text-sm mt-2">Ingresa la contraseña</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg text-center">Contraseña incorrecta</div>}
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" required />
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition">Ingresar</button>
          </form>
          <div className="mt-6 text-center"><a href="/" className="text-sm text-gray-500 hover:text-red-600">← Volver al inicio</a></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Panel de Administración</h1>
            <p className="text-xs text-gray-400">Bienvenido</p>
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
            <h2 className="text-xl font-bold text-black mb-2">Galería de Fotos y Videos</h2>
            <p className="text-gray-500 text-sm">Sube archivos para la sección pública.</p>
          </Link>

          <Link href="/admin/miembros" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all group hover:-translate-y-1">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-black mb-2">Solicitudes de Membresía</h2>
            <p className="text-gray-500 text-sm">Revisa los datos de las personas.</p>
          </Link>

          <Link href="/admin/donaciones" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all group hover:-translate-y-1">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-black mb-2">Registro de Donaciones</h2>
            <p className="text-gray-500 text-sm">Visualiza los montos y aportes.</p>
          </Link>

          <Link href="/admin/textos" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all group hover:-translate-y-1">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-black mb-2">Editar Textos</h2>
            <p className="text-gray-500 text-sm">Modifica la portada de la web.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}