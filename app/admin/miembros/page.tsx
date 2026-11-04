
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import {
  ArrowLeft,
  Users,
  Mail,
  Phone,
  Crown,
  RefreshCw,
  Search,
  UserRound,
  CalendarDays,
  AlertCircle,
  Wifi,
  WifiOff,
} from 'lucide-react'

type Miembro = {
  id: string | number
  full_name: string | null
  email: string | null
  plan_type: string | null
  phone: string | null
  created_at?: string | null
}

export default function AdminMiembros() {
  const [miembros, setMiembros] = useState<Miembro[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [conectado, setConectado] = useState(false)
  const router = useRouter()

  const cargarMiembros = useCallback(async () => {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error cargando miembros:', error)
      setError('No fue posible cargar las solicitudes. Intenta nuevamente.')
    } else {
      setMiembros((data || []) as Miembro[])
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth')

    if (isAuth !== 'true') {
      router.replace('/admin')
      return
    }

    cargarMiembros()

    const channel = supabase
      .channel('admin-miembros-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'members',
        },
        () => {
          cargarMiembros()
        }
      )
      .subscribe((status) => {
        setConectado(status === 'SUBSCRIBED')
      })

    return () => {
      supabase.removeChannel(channel)
      setConectado(false)
    }
  }, [router, cargarMiembros])

  const miembrosFiltrados = miembros.filter((m) => {
    const texto = busqueda.toLowerCase()

    return (
      (m.full_name || '').toLowerCase().includes(texto) ||
      (m.email || '').toLowerCase().includes(texto) ||
      (m.plan_type || '').toLowerCase().includes(texto) ||
      (m.phone || '').toLowerCase().includes(texto)
    )
  })

  const planes = new Set(
    miembros.map((m) => m.plan_type).filter(Boolean)
  ).size

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="relative overflow-hidden bg-[#101010] text-white">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-red-700/20 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600">
              <Users size={24} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                HNV · Administración
              </p>
              <h1 className="text-xl font-bold sm:text-2xl">
                Solicitudes de Membresía
              </h1>
            </div>
          </div>

          <button
            onClick={() => router.push('/admin')}
            className="flex shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/20"
          >
            <ArrowLeft size={17} />
            <span className="hidden sm:inline">Volver</span>
          </button>
        </div>

        <div className="h-1 bg-gradient-to-r from-red-800 via-red-500 to-transparent" />
      </header>

      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-red-600">
              Gestión de miembros
            </p>
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Registro de solicitudes
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Consulta y revisa las personas que han enviado solicitudes para
              formar parte de nuestra comunidad.
            </p>
          </div>

          <button
            onClick={cargarMiembros}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/15 transition hover:bg-red-700 disabled:opacity-60"
          >
            <RefreshCw size={17} className={loading ? 'animate-spin' : ''} />
            Actualizar
          </button>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total de solicitudes
                </p>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {miembros.length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Users size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Planes registrados
                </p>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {planes}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Crown size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Resultados visibles
                </p>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {miembrosFiltrados.length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                <Search size={22} />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-gray-900">
                Miembros registrados
              </h3>
              <div className="mt-2 flex items-center gap-2">
                {conectado ? (
                  <>
                    <Wifi size={14} className="text-green-600" />
                    <span className="text-xs font-medium text-green-600">
                      Actualización en tiempo real activa
                    </span>
                  </>
                ) : (
                  <>
                    <WifiOff size={14} className="text-amber-600" />
                    <span className="text-xs font-medium text-amber-600">
                      Conectando con actualizaciones...
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar miembro..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center px-6 py-20">
              <RefreshCw size={30} className="animate-spin text-red-600" />
              <p className="mt-4 text-sm font-medium text-gray-500">
                Cargando solicitudes...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <AlertCircle size={36} className="text-red-500" />
              <p className="mt-4 font-semibold text-gray-800">
                No se pudieron cargar los datos
              </p>
              <p className="mt-2 text-sm text-gray-500">{error}</p>
              <button
                onClick={cargarMiembros}
                className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Reintentar
              </button>
            </div>
          ) : miembrosFiltrados.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                {busqueda ? <Search size={28} /> : <Users size={28} />}
              </div>
              <h3 className="mt-5 font-bold text-gray-800">
                {busqueda ? 'Sin resultados' : 'Aún no hay solicitudes'}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-gray-500">
                {busqueda
                  ? 'No encontramos miembros que coincidan con tu búsqueda.'
                  : 'Cuando las personas envíen sus solicitudes, aparecerán aquí.'}
              </p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Miembro</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Correo electrónico</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Plan</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Teléfono</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {miembrosFiltrados.map((m) => (
                      <tr key={m.id} className="transition hover:bg-red-50/40">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                              <UserRound size={19} />
                            </div>
                            <span className="font-semibold text-gray-800">
                              {m.full_name || 'Sin nombre'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-600">
                          {m.email || 'No informado'}
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                            {m.plan_type || 'Sin plan'}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-600">
                          {m.phone || 'No informado'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-gray-100 md:hidden">
                {miembrosFiltrados.map((m) => (
                  <article key={m.id} className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <UserRound size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="break-words font-bold text-gray-900">
                          {m.full_name || 'Sin nombre'}
                        </h4>
                        <span className="mt-2 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                          {m.plan_type || 'Sin plan'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3 pl-1 text-sm text-gray-600">
                      <p className="flex items-center gap-2 break-all">
                        <Mail size={16} className="shrink-0 text-red-500" />
                        {m.email || 'No informado'}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={16} className="shrink-0 text-red-500" />
                        {m.phone || 'No informado'}
                      </p>
                      {m.created_at && (
                        <p className="flex items-center gap-2">
                          <CalendarDays size={16} className="shrink-0 text-red-500" />
                          {new Date(m.created_at).toLocaleDateString('es-CL')}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Fundación Humanidad Nueva Visión · Panel de administración
        </p>
      </section>
    </main>
  )
}
