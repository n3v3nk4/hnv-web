
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import {
  ArrowLeft,
  Heart,
  RefreshCw,
  Search,
  UserRound,
  Mail,
  CalendarDays,
  Banknote,
  Package,
  AlertCircle,
  HandHeart,
  Wifi,
  WifiOff,
} from 'lucide-react'

type Donacion = {
  id: string | number
  donor_name: string | null
  email: string | null
  amount_clp: number | string | null
  donation_type: string | null
  created_at: string | null
}

const formatoMonto = (monto: number | string | null) => {
  const valor = Number(monto || 0)
  return `$${valor.toLocaleString('es-CL')} CLP`
}

const formatoFecha = (fecha: string | null) => {
  if (!fecha) return 'No disponible'

  const date = new Date(fecha)

  if (Number.isNaN(date.getTime())) return 'Fecha no disponible'

  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function AdminDonaciones() {
  const [donaciones, setDonaciones] = useState<Donacion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [conectado, setConectado] = useState(false)
  const router = useRouter()

  const cargarDonaciones = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setDonaciones((data || []) as Donacion[])
    } catch (err) {
      console.error('Error al cargar donaciones:', err)
      setError('No fue posible cargar las donaciones. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth')

    if (isAuth !== 'true') {
      router.replace('/admin')
      return
    }

    cargarDonaciones()

    const channel = supabase
      .channel('admin-donaciones-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'donations',
        },
        () => {
          cargarDonaciones()
        }
      )
      .subscribe((status) => {
        setConectado(status === 'SUBSCRIBED')
      })

    return () => {
      supabase.removeChannel(channel)
      setConectado(false)
    }
  }, [router, cargarDonaciones])

  const donacionesFiltradas = donaciones.filter((d) => {
    const texto = busqueda.toLowerCase()

    return (
      (d.donor_name || '').toLowerCase().includes(texto) ||
      (d.email || '').toLowerCase().includes(texto) ||
      (d.donation_type || '').toLowerCase().includes(texto) ||
      String(d.amount_clp || '').includes(texto)
    )
  })

  const donacionesDinero = donaciones.filter(
    (d) => d.donation_type === 'money'
  )

  const donacionesEspecie = donaciones.filter(
    (d) => d.donation_type !== 'money'
  )

  const totalDinero = donacionesDinero.reduce(
    (total, d) => total + Number(d.amount_clp || 0),
    0
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="relative overflow-hidden bg-[#101010] text-white">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-red-700/20 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600">
              <Heart size={24} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                HNV · Administración
              </p>
              <h1 className="text-xl font-bold sm:text-2xl">
                Registro de Donaciones
              </h1>
            </div>
          </div>

          <button
            onClick={() => router.push('/admin')}
            className="flex shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/20"
          >
            <ArrowLeft size={17} />
            <span className="hidden sm:inline">Volver al panel</span>
          </button>
        </div>

        <div className="h-1 bg-gradient-to-r from-red-800 via-red-500 to-transparent" />
      </header>

      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-red-600">
              Transparencia y colaboración
            </p>
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Gestión de donaciones
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Consulta las donaciones recibidas y revisa los registros de
              quienes colaboran con nuestra fundación.
            </p>
          </div>

          <button
            onClick={cargarDonaciones}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/15 transition hover:bg-red-700 disabled:opacity-60"
          >
            <RefreshCw size={17} className={loading ? 'animate-spin' : ''} />
            Actualizar
          </button>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total de donaciones
                </p>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {donaciones.length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <HandHeart size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Aportes monetarios registrados
                </p>
                <p className="mt-2 text-2xl font-extrabold text-gray-900">
                  {formatoMonto(totalDinero)}
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Banknote size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Donaciones en especie
                </p>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {donacionesEspecie.length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Package size={23} />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-gray-900">
                Donaciones registradas
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
                placeholder="Buscar donación..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center px-6 py-20">
              <RefreshCw size={30} className="animate-spin text-red-600" />
              <p className="mt-4 text-sm font-medium text-gray-500">
                Cargando donaciones...
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
                onClick={cargarDonaciones}
                className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Reintentar
              </button>
            </div>
          ) : donacionesFiltradas.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                {busqueda ? <Search size={28} /> : <Heart size={28} />}
              </div>
              <h3 className="mt-5 font-bold text-gray-800">
                {busqueda ? 'Sin resultados' : 'Aún no hay donaciones'}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-gray-500">
                {busqueda
                  ? 'No encontramos donaciones que coincidan con tu búsqueda.'
                  : 'Cuando se registren nuevas donaciones, aparecerán aquí.'}
              </p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Donante</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Correo electrónico</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Monto</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Tipo</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Fecha</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {donacionesFiltradas.map((d) => (
                      <tr key={d.id} className="transition hover:bg-red-50/40">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                              <UserRound size={19} />
                            </div>
                            <span className="font-semibold text-gray-800">
                              {d.donor_name || 'Anónimo'}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-sm text-gray-600">
                          {d.email || '-'}
                        </td>

                        <td className="px-6 py-5 text-sm font-bold text-gray-900">
                          {formatoMonto(d.amount_clp)}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                              d.donation_type === 'money'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-blue-50 text-blue-700'
                            }`}
                          >
                            {d.donation_type === 'money' ? 'Dinero' : 'Especie'}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-gray-500">
                          {formatoFecha(d.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-gray-100 md:hidden">
                {donacionesFiltradas.map((d) => (
                  <article key={d.id} className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                          <UserRound size={21} />
                        </div>

                        <div className="min-w-0">
                          <h4 className="break-words font-bold text-gray-900">
                            {d.donor_name || 'Anónimo'}
                          </h4>
                          <span
                            className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                              d.donation_type === 'money'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-blue-50 text-blue-700'
                            }`}
                          >
                            {d.donation_type === 'money' ? 'Dinero' : 'Especie'}
                          </span>
                        </div>
                      </div>

                      <p className="shrink-0 text-sm font-extrabold text-gray-900">
                        {formatoMonto(d.amount_clp)}
                      </p>
                    </div>

                    <div className="mt-4 space-y-3 pl-1 text-sm text-gray-600">
                      <p className="flex items-center gap-2 break-all">
                        <Mail size={16} className="shrink-0 text-red-500" />
                        {d.email || 'Sin correo registrado'}
                      </p>
                      <p className="flex items-center gap-2">
                        <CalendarDays size={16} className="shrink-0 text-red-500" />
                        {formatoFecha(d.created_at)}
                      </p>
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
