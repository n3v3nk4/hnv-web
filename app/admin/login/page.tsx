
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  LockKeyhole,
  UserRound,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  LoaderCircle,
  AlertCircle,
} from 'lucide-react'

export default function AdminLogin() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (usuario.toLowerCase().trim() !== 'admin') {
      setError('Usuario no reconocido')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        window.location.href = '/admin'
      } else {
        setError('Contraseña incorrecta')
        setLoading(false)
      }
    } catch {
      setError('No fue posible conectar con el servidor. Intenta nuevamente.')
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#101010] px-4 py-10">

      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-red-700/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />

      <div className="relative w-full max-w-md">

        {/* Identidad HNV */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/30 bg-red-600 shadow-xl shadow-red-900/30">
            <ShieldCheck size={38} className="text-white" />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-red-400">
            Fundación HNV
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Panel Administrativo
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Acceso exclusivo para administración
          </p>
        </div>

        {/* Formulario */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white p-7 shadow-2xl sm:p-9">

          <div className="mb-7">
            <h2 className="text-xl font-extrabold text-gray-900">
              Bienvenida
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Ingresa tus credenciales para continuar.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle size={19} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Usuario */}
            <div>
              <label
                htmlFor="usuario"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Usuario
              </label>

              <div className="relative">
                <UserRound
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="usuario"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  autoComplete="username"
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 disabled:opacity-60"
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Contraseña
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={mostrarPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 disabled:opacity-60"
                  required
                />

                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  disabled={loading}
                  aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-red-600"
                >
                  {mostrarPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 hover:shadow-red-600/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={20} className="animate-spin" />
                  Verificando acceso...
                </>
              ) : (
                <>
                  <LockKeyhole size={19} />
                  Ingresar al panel
                </>
              )}
            </button>
          </form>

          <div className="mt-7 border-t border-gray-100 pt-6 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-red-600"
            >
              <ArrowLeft size={16} />
              Volver al sitio web
            </a>
          </div>
        </div>

        {/* Pie */}
        <p className="mt-7 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Fundación Humanidad Nueva Visión
        </p>
        <p className="mt-1 text-center text-[11px] text-gray-600">
          Acceso protegido · Área administrativa
        </p>
      </div>
    </main>
  )
}
