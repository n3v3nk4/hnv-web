
'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import {
  ArrowLeft,
  Save,
  Type,
  Heading,
  MessageSquareText,
  Eye,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  LayoutDashboard,
} from 'lucide-react'

export default function AdminTextos() {
  const [titulo, setTitulo] = useState('')
  const [subtitulo, setSubtitulo] = useState('')
  const [loading, setLoading] = useState(false)
  const [cargandoDatos, setCargandoDatos] = useState(true)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState<'success' | 'error'>('success')

  const router = useRouter()

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth')

    if (isAuth !== 'true') {
      router.replace('/admin')
      return
    }

    const cargar = async () => {
      try {
        const { data, error } = await supabase
          .from('textos_web')
          .select('*')

        if (error) throw error

        if (data) {
          const t = data.find((d) => d.id === 'hero_titulo')
          const s = data.find((d) => d.id === 'hero_subtitulo')

          if (t) setTitulo(t.contenido ?? '')
          if (s) setSubtitulo(s.contenido ?? '')
        }
      } catch (error) {
        console.error('Error cargando textos:', error)
        setTipoMensaje('error')
        setMensaje('No fue posible cargar los textos. Revisa tu conexión.')
      } finally {
        setCargandoDatos(false)
      }
    }

    cargar()
  }, [router])

  const handleGuardar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMensaje('')

    try {
      const { error: errorTitulo } = await supabase
        .from('textos_web')
        .upsert(
          { id: 'hero_titulo', contenido: titulo },
          { onConflict: 'id' }
        )

      if (errorTitulo) throw errorTitulo

      const { error: errorSubtitulo } = await supabase
        .from('textos_web')
        .upsert(
          { id: 'hero_subtitulo', contenido: subtitulo },
          { onConflict: 'id' }
        )

      if (errorSubtitulo) throw errorSubtitulo

      setTipoMensaje('success')
      setMensaje('¡Textos actualizados correctamente! Ya puedes revisar la portada.')
    } catch (error) {
      console.error('Error guardando textos:', error)
      setTipoMensaje('error')
      setMensaje('No se pudieron guardar los cambios. Revisa los permisos de Supabase.')
    } finally {
      setLoading(false)
    }
  }

  if (cargandoDatos) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoaderCircle className="mx-auto animate-spin text-red-600" size={36} />
          <p className="mt-4 text-sm text-gray-500">
            Cargando textos de la portada...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ENCABEZADO */}
      <header className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-red-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-8 sm:px-8">
          <Link
            href="/admin"
            className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Volver al panel
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-600/20">
              <LayoutDashboard size={27} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                Administración HNV
              </p>
              <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                Editar portada
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                Personaliza los textos principales del sitio web.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">

          {/* FORMULARIO */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Contenido principal
              </span>

              <h2 className="mt-2 text-xl font-extrabold text-gray-900">
                Textos de bienvenida
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Modifica el título y subtítulo que aparecen en la portada de HNV.
              </p>
            </div>

            {mensaje && (
              <div
                className={`mb-6 flex items-start gap-3 rounded-xl border p-4 text-sm ${
                  tipoMensaje === 'success'
                    ? 'border-green-200 bg-green-50 text-green-800'
                    : 'border-red-200 bg-red-50 text-red-700'
                }`}
              >
                {tipoMensaje === 'success' ? (
                  <CheckCircle2 size={20} className="shrink-0" />
                ) : (
                  <AlertCircle size={20} className="shrink-0" />
                )}
                <p>{mensaje}</p>
              </div>
            )}

            <form onSubmit={handleGuardar} className="space-y-6">
              <div>
                <label
                  htmlFor="titulo"
                  className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700"
                >
                  <Heading size={17} className="text-red-600" />
                  Título principal
                </label>

                <input
                  id="titulo"
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  maxLength={120}
                  placeholder="Escribe el título principal..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                  required
                />

                <p className="mt-2 text-right text-xs text-gray-400">
                  {titulo.length}/120 caracteres
                </p>
              </div>

              <div>
                <label
                  htmlFor="subtitulo"
                  className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700"
                >
                  <MessageSquareText size={17} className="text-red-600" />
                  Subtítulo
                </label>

                <textarea
                  id="subtitulo"
                  value={subtitulo}
                  onChange={(e) => setSubtitulo(e.target.value)}
                  maxLength={300}
                  rows={4}
                  placeholder="Escribe el subtítulo de bienvenida..."
                  className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                  required
                />

                <p className="mt-2 text-right text-xs text-gray-400">
                  {subtitulo.length}/300 caracteres
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={20} className="animate-spin" />
                    Guardando cambios...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Guardar cambios
                  </>
                )}
              </button>
            </form>
          </div>

          {/* VISTA PREVIA */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Eye size={19} className="text-red-600" />
              <h2 className="font-bold text-gray-900">
                Vista previa
              </h2>
            </div>

            <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-[#111111] p-7 text-center text-white shadow-lg">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-600/20 blur-3xl" />

              <div className="relative">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                  Fundación HNV
                </span>

                <h3 className="mt-5 break-words text-3xl font-extrabold leading-tight sm:text-4xl">
                  {titulo || 'Tu título aparecerá aquí'}
                </h3>

                <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-red-600" />

                <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-gray-300">
                  {subtitulo || 'Tu subtítulo aparecerá aquí.'}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2 text-red-600">
                  <Type size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Consejo
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Utiliza un título breve y un subtítulo claro para que
                    las personas comprendan rápidamente el propósito de HNV.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-gray-700 transition hover:border-red-200 hover:text-red-600"
            >
              Ver página principal
              <ArrowLeft size={17} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
