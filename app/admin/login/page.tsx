'use client'
import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'

export default function AdminLogin() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Convertimos el usuario a un correo interno para Supabase
    const emailInterno = `${usuario.toLowerCase().trim()}@hnv.local`

    const { error } = await supabase.auth.signInWithPassword({
      email: emailInterno,
      password
    })

    if (error) {
      setError('Usuario o contraseña incorrectos')
      setLoading(false)
    } else {
      // Forzamos la recarga completa para que el servidor detecte la sesión
      window.location.href = '/admin'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image src="/logo.jpg" alt="HNV" fill sizes="80px" className="object-contain rounded-full" />
          </div>
          <h1 className="text-2xl font-bold text-black">Acceso Administrativo</h1>
          <p className="text-gray-600 text-sm mt-2">Ingresa tus credenciales para gestionar la página</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
            <input
              type="text"
              placeholder="Ej: jesula"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar al Panel'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-500 hover:text-red-600 transition">
            ← Volver a la página principal
          </a>
        </div>
      </div>
    </div>
  )
}