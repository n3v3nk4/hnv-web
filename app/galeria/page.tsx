
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Image as ImageIcon,
  Video,
  Images,
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface Imagen {
  id: string
  titulo: string
  descripcion: string | null
  imagen_url: string
  created_at: string
}

type Filtro = 'todos' | 'fotos' | 'videos'

export default function GaleriaPublica() {
  const [imagenes, setImagenes] = useState<Imagen[]>([])
  const [loading, setLoading] = useState(true)
  const [fotoSeleccionada, setFotoSeleccionada] = useState<Imagen | null>(null)
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const [error, setError] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const esVideo = (url: string) =>
    /\.(mp4|webm|ogg)(?:$|[?#])/i.test(url)

  useEffect(() => {
    const cargar = async () => {
      const { data, error } = await supabase
        .from('galeria')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error al cargar galería:', error)
        setError(true)
      } else {
        setImagenes((data || []) as Imagen[])
      }

      setLoading(false)
    }

    cargar()
  }, [])

  const fotos = imagenes.filter((item) => !esVideo(item.imagen_url))
  const videos = imagenes.filter((item) => esVideo(item.imagen_url))

  const contenidoModal = fotoSeleccionada
    ? imagenes.filter(
        (item) =>
          esVideo(item.imagen_url) ===
          esVideo(fotoSeleccionada.imagen_url)
      )
    : []

  const indiceModal = fotoSeleccionada
    ? contenidoModal.findIndex((item) => item.id === fotoSeleccionada.id)
    : -1

  const navegar = (direccion: 'anterior' | 'siguiente') => {
    if (indiceModal < 0) return

    const nuevoIndice =
      direccion === 'siguiente' ? indiceModal + 1 : indiceModal - 1

    if (nuevoIndice >= 0 && nuevoIndice < contenidoModal.length) {
      setFotoSeleccionada(contenidoModal[nuevoIndice])
    }
  }

  const manejarDeslizamiento = (finX: number) => {
    if (touchStartX.current === null) return

    const diferencia = finX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(diferencia) < 55) return

    if (diferencia < 0) {
      navegar('siguiente')
    } else {
      navegar('anterior')
    }
  }

  useEffect(() => {
    if (!fotoSeleccionada) return

    const cerrarConTeclado = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFotoSeleccionada(null)
      if (e.key === 'ArrowRight') navegar('siguiente')
      if (e.key === 'ArrowLeft') navegar('anterior')
    }

    window.addEventListener('keydown', cerrarConTeclado)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', cerrarConTeclado)
      document.body.style.overflow = ''
    }
  }, [fotoSeleccionada, indiceModal, contenidoModal])

  const renderTarjetas = (lista: Imagen[], tipo: 'foto' | 'video') => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {lista.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setFotoSeleccionada(item)}
          aria-label={`Abrir ${tipo}: ${item.titulo}`}
          className="group relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-black text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {tipo === 'video' ? (
            <video
              src={item.imagen_url}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={item.imagen_url}
              alt={item.titulo}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />

          {tipo === 'video' && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-red-600">
                <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          )}

          <span className="absolute left-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {tipo === 'video' ? 'Video' : 'Foto'}
          </span>

          <span className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
            <span className="line-clamp-2 block text-sm font-bold text-white sm:text-base">
              {item.titulo}
            </span>
          </span>
        </button>
      ))}
    </div>
  )

  const filtros = [
    { id: 'todos', nombre: 'Todo', cantidad: imagenes.length },
    { id: 'fotos', nombre: 'Fotografías', cantidad: fotos.length },
    { id: 'videos', nombre: 'Videos', cantidad: videos.length },
  ] as const

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* PORTADA */}
      <section className="relative isolate overflow-hidden bg-[#090909] px-4 py-24 text-center text-white md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border-[50px] border-red-600/10" />
          <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full border-[50px] border-red-600/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Fundación HNV
          </span>

          <h1 className="text-5xl font-black tracking-tight md:text-7xl">
            Nuestra <span className="text-red-600">Galería.</span>
          </h1>

          <div className="mx-auto my-7 h-1 w-20 rounded-full bg-red-600" />

          <p className="mx-auto max-w-2xl text-base leading-8 text-gray-300 md:text-xl">
            Momentos, experiencias e historias que reflejan nuestro compromiso
            con la comunidad y las ganas de ayudar a quienes más lo necesitan.
          </p>

          <a
            href="#contenido"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-red-600 px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-red-700"
          >
            Explorar galería
            <ChevronDown size={19} />
          </a>
        </div>
      </section>

      {/* CONTENIDO */}
      <section
        id="contenido"
        className="mx-auto max-w-7xl scroll-mt-8 px-4 py-16 md:py-20"
      >
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Recuerdos que nos unen
            </span>
            <h2 className="mt-3 text-3xl font-black text-gray-900 md:text-4xl">
              Momentos de nuestra comunidad
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-gray-500">
              Fotografías y videos de nuestras actividades, encuentros y
              experiencias.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                <ImageIcon size={15} />
                Fotografías
              </div>
              <p className="mt-1 text-2xl font-black text-gray-900">
                {fotos.length}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                <Video size={15} />
                Videos
              </div>
              <p className="mt-1 text-2xl font-black text-gray-900">
                {videos.length}
              </p>
            </div>
          </div>
        </div>

        {/* FILTROS */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-gray-200 pb-6">
          {filtros.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFiltro(item.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
                filtro === item.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-red-300 hover:text-red-600'
              }`}
            >
              {item.nombre}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  filtro === item.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {item.cantidad}
              </span>
            </button>
          ))}
        </div>

        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-white p-12 text-center">
            <p className="font-bold text-red-600">
              No pudimos cargar la galería.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Intenta nuevamente más tarde.
            </p>
          </div>
        )}

        {!loading && !error && imagenes.length === 0 && (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center">
            <Images className="mx-auto mb-4 text-gray-300" size={45} />
            <h3 className="text-xl font-extrabold text-gray-900">
              Aún no hay publicaciones
            </h3>
            <p className="mt-2 text-gray-500">
              Pronto compartiremos nuevos momentos con nuestra comunidad.
            </p>
          </div>
        )}

        {!loading && !error && imagenes.length > 0 && (
          <div className="space-y-14">
            {(filtro === 'todos' || filtro === 'fotos') && (
              <section>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <ImageIcon size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900">
                      Fotografías
                    </h3>
                    <p className="text-sm text-gray-500">
                      {fotos.length} publicación(es)
                    </p>
                  </div>
                </div>

                {fotos.length > 0 ? (
                  renderTarjetas(fotos, 'foto')
                ) : (
                  <p className="rounded-xl bg-white p-6 text-sm text-gray-500">
                    Todavía no hay fotografías publicadas.
                  </p>
                )}
              </section>
            )}

            {(filtro === 'todos' || filtro === 'videos') && (
              <section>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Video size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900">
                      Videos
                    </h3>
                    <p className="text-sm text-gray-500">
                      {videos.length} publicación(es)
                    </p>
                  </div>
                </div>

                {videos.length > 0 ? (
                  renderTarjetas(videos, 'video')
                ) : (
                  <p className="rounded-xl bg-white p-6 text-sm text-gray-500">
                    Todavía no hay videos publicados.
                  </p>
                )}
              </section>
            )}
          </div>
        )}
      </section>

      {/* VISUALIZADOR */}
      {fotoSeleccionada && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-md sm:p-6"
          onClick={() => setFotoSeleccionada(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Visualización de galería"
        >
          <button
            type="button"
            onClick={() => setFotoSeleccionada(null)}
            aria-label="Cerrar visualizador"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-red-600"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              navegar('anterior')
            }}
            disabled={indiceModal <= 0}
            aria-label="Contenido anterior"
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-red-600 disabled:opacity-20 sm:left-5 sm:h-12 sm:w-12"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="flex max-h-[92vh] w-full max-w-6xl flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX
            }}
            onTouchEnd={(e) => {
              manejarDeslizamiento(e.changedTouches[0].clientX)
            }}
          >
            <div className="flex min-h-0 w-full flex-1 items-center justify-center">
              {esVideo(fotoSeleccionada.imagen_url) ? (
                <video
                  key={fotoSeleccionada.id}
                  src={fotoSeleccionada.imagen_url}
                  className="max-h-[72vh] max-w-full rounded-xl object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={fotoSeleccionada.imagen_url}
                  alt={fotoSeleccionada.titulo}
                  className="max-h-[72vh] max-w-full rounded-xl object-contain"
                  draggable={false}
                />
              )}
            </div>

            <div className="mt-4 w-full max-w-3xl rounded-2xl bg-white p-4 text-center sm:p-6">
              <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                {esVideo(fotoSeleccionada.imagen_url)
                  ? 'Video'
                  : 'Fotografía'}{' '}
                · Fundación HNV
              </span>
              <h3 className="mt-2 text-lg font-extrabold text-gray-900 sm:text-2xl">
                {fotoSeleccionada.titulo}
              </h3>
              {fotoSeleccionada.descripcion && (
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {fotoSeleccionada.descripcion}
                </p>
              )}
              <p className="mt-3 text-xs font-semibold text-gray-400">
                Desliza hacia los lados para ver el siguiente contenido ·{' '}
                {indiceModal + 1} de {contenidoModal.length}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              navegar('siguiente')
            }}
            disabled={indiceModal >= contenidoModal.length - 1}
            aria-label="Contenido siguiente"
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-red-600 disabled:opacity-20 sm:right-5 sm:h-12 sm:w-12"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}

      {/* CIERRE */}
      <section className="bg-[#090909] px-4 py-14 text-center text-white">
        <div className="mx-auto h-1 w-14 rounded-full bg-red-600" />
        <h2 className="mt-6 text-2xl font-extrabold md:text-3xl">
          Juntos podemos hacer la diferencia
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">
          Cada fotografía cuenta una historia y cada experiencia refleja el
          valor de ayudar, compartir y construir una comunidad más solidaria.
        </p>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-gray-600">
          Fundación Humanidad Nueva Visión
        </p>
      </section>
    </main>
  )
}
