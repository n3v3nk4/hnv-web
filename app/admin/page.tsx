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

    // Esta es la contraseña que configuramos en Vercel
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
            <p className="text-gray-600 text-sm mt-2">Ingresa la contraseña de administrador</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg text-center">
                Contraseña incorrecta
              </div>
            )}
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition"
            >
              Ingresar al Panel
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-500 hover:text-red-600">← Volver al inicio</a>
          </div>
        </div>
      </div>
    )
  }

  // ... (Aquí va el resto del panel con las tarjetas de Galería, Miembros, etc.)
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
            <h2 className="text-xl font-bold text-black mb-2">Galería de Fotos</h2>
            <p className="text-gray-500 text-sm">Sube imágenes y videos para la sección pública.</p>
          </Link>
          {/* ... las otras 3 tarjetas ... */}
        </div>
      </div>
    </div>
  )
}