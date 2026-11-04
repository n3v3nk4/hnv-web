
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Image,
  Users,
  HandCoins,
  LogOut,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
  AlertCircle,
} from 'lucide-react'

const secciones = [
  {
    titulo: 'Galería de Fotos y Videos',
    descripcion: 'Administra las fotografías y videos de las actividades de nuestra fundación.',
    etiqueta: 'Contenido multimedia',
    href: '/admin/galeria',
    icono: Image,
  },
  {
    titulo: 'Solicitudes de Membresía',
    descripcion: 'Consulta y revisa la información de las personas que desean ser miembros.',
    etiqueta: 'Comunidad HNV',
    href: '/admin/miembros',
    icono: Users,
  },
  {
    titulo: 'Registro de Donaciones',
    descripcion: 'Visualiza los aportes y registros de donaciones recibidas.',
    etiqueta: 'Aportes solidarios',
    href: '/admin/donaciones',
    icono: HandCoins,
  },
]

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

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)

    const passMaestra =
      process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'HNV2026!Admin'

    if (password === passMaestra) {
      sessionStorage.setItem('admin_auth', 'true')
      setAutorizado(true)
      setPassword('')
    } else {
      setError(true)
      setPassword('')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setAutorizado(false)
    setPassword('')
    setError(false)
  }

  // Pantalla de acceso
  if (!autorizado) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111111] px-4 py-12">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-red-600/20 blur-3xl" />
        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />

        <div className="relative w-full max-w-md">
          <div className="mb-8 text-center text-white">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-600/15 text-red-400">
              <ShieldCheck size={34} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              Fundación Humanidad Nueva Visión
            </p>

            <h1 className="mt-3 text-3xl font-extrabold">
              Panel de Administración
            </h1>

            <p className="mt-3 text-sm text-gray-400">
              Ingresa tu contraseña para acceder.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-2xl sm:p-9">
            <div className="mb-7 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <LockKeyhole size={24} />
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Acceso privado
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Área exclusiva para administradores.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle size={18} />
                  Contraseña incorrecta. Inténtalo nuevamente.
                </div>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Contraseña de administrador
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                  required
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 active:scale-[0.98]"
              >
                Ingresar al panel
                <ArrowRight size={19} />
              </button>
            </form>

            <div className="mt-7 border-t border-gray-100 pt-5 text-center">
              <Link
                href="/"
                className="text-sm font-medium text-gray-500 transition hover:text-red-600"
              >
                ← Volver al sitio web
              </Link>
            </div>
          </div>

          <p className="mt-7 text-center text-xs text-gray-500">
            © Fundación Humanidad Nueva Visión
          </p>
        </div>
      </main>
    )
  }

  // Panel principal
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <header className="relative overflow-hidden bg-[#111111] text-white shadow-lg">
        <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-7 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/20">
              <LayoutDashboard size={25} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
                Fundación HNV
              </p>

              <h1 className="text-xl font-extrabold sm:text-2xl">
                Panel de Administración
              </h1>

              <p className="mt-1 text-xs text-gray-400">
                Gestión y administración del sitio web
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-red-500 hover:bg-red-600"
          >
            <LogOut size={17} />
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Contenido */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Administración interna
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Bienvenido al panel
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
            Desde aquí puedes administrar los contenidos y revisar
            la información relacionada con las actividades de la fundación.
          </p>
        </div>

        <div className="mb-7 flex items-center gap-3">
          <div className="h-7 w-1 rounded-full bg-red-600" />

          <h3 className="text-lg font-bold text-gray-900">
            Herramientas de gestión
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {secciones.map((seccion) => {
            const Icono = seccion.icono

            return (
              <Link
                key={seccion.href}
                href={seccion.href}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-red-50 transition group-hover:bg-red-100" />

                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 transition duration-300 group-hover:bg-red-600 group-hover:text-white">
                    <Icono size={28} />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                    {seccion.etiqueta}
                  </span>

                  <h3 className="mt-2 text-xl font-extrabold text-gray-900">
                    {seccion.titulo}
                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500">
                    {seccion.descripcion}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                    <span className="text-sm font-bold text-gray-800 transition group-hover:text-red-600">
                      Administrar sección
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition group-hover:bg-red-600 group-hover:text-white">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Estado de sesión */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
              <ShieldCheck size={21} />
            </div>

            <div>
              <p className="font-bold text-gray-900">
                Sesión iniciada
              </p>

              <p className="text-xs text-gray-500">
                Bienvenido al área de administración HNV.
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="text-sm font-semibold text-red-600 transition hover:text-red-700"
          >
            Ver sitio web →
          </Link>
        </div>
      </section>

      {/* Pie */}
      <footer className="border-t border-gray-200 bg-white px-5 py-6 text-center">
        <p className="text-xs text-gray-500">
          © Fundación Humanidad Nueva Visión · Panel de Administración
        </p>
      </footer>
    </main>
  )
}
