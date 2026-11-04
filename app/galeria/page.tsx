
'use client'

import { useState, useEffect } from 'react'
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

  // IDENTIFICAR VIDEOS
  const esVideo = (url: string) => {
    return /\.(mp4|webm|ogg)(?:$|[?#])/i.test(url)
  }

  // CARGAR GALERÍA
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
        setImagenes(data || [])
      }

      setLoading(false)
    }

    cargar()
  }, [])

  // CONTADORES
  const totalFotos = imagenes.filter(
    img => !esVideo(img.imagen_url)
  ).length

  const totalVideos = imagenes.filter(
    img => esVideo(img.imagen_url)
  ).length

  // FILTRAR CONTENIDO
  const imagenesFiltradas = imagenes.filter(img => {
    if (filtro === 'fotos') return !esVideo(img.imagen_url)
    if (filtro === 'videos') return esVideo(img.imagen_url)
    return true
  })

  // CERRAR VISUALIZADOR CON ESCAPE
  useEffect(() => {
    const cerrar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFotoSeleccionada(null)
      }

      if (e.key === 'ArrowRight' && fotoSeleccionada) {
        const indice = imagenesFiltradas.findIndex(
          img => img.id === fotoSeleccionada.id
        )

        if (indice < imagenesFiltradas.length - 1) {
          setFotoSeleccionada(imagenesFiltradas[indice + 1])
        }
      }

      if (e.key === 'ArrowLeft' && fotoSeleccionada) {
        const indice = imagenesFiltradas.findIndex(
          img => img.id === fotoSeleccionada.id
        )

        if (indice > 0) {
          setFotoSeleccionada(imagenesFiltradas[indice - 1])
        }
      }
    }

    window.addEventListener('keydown', cerrar)

    return () => window.removeEventListener('keydown', cerrar)
  }, [fotoSeleccionada, imagenesFiltradas])

  // BLOQUEAR SCROLL CUANDO SE ABRE EL VISUALIZADOR
  useEffect(() => {
    document.body.style.overflow = fotoSeleccionada ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [fotoSeleccionada])

  const filtros = [
    { id: 'todos', nombre: 'Todo', cantidad: imagenes.length },
    { id: 'fotos', nombre: 'Fotografías', cantidad: totalFotos },
    { id: 'videos', nombre: 'Videos', cantidad: totalVideos }
  ] as const

  return (
    <main className="min-h-screen bg-[#fafafa]">

      {/* PORTADA */}
      <section className="relative bg-[#111111] text-white overflow-hidden">

        {/* DECORACIÓN */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full border-[50px] border-red-600" />
          <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full border-[50px] border-red-600" />
        </div>

        <div className="relative container mx-auto max-w-6xl px-6 py-24 md:py-32 text-center">

          <span className="inline-flex items-center gap-2 border border-white/20 bg-white/5 rounded-full px-5 py-2 text-xs uppercase tracking-[0.25em] text-gray-300 mb-8">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            Fundación HNV
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Nuestra <span className="text-red-600">Galería</span>
          </h1>

          <div className="w-20 h-1 bg-red-600 mx-auto mb-8 rounded-full" />

          <p className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            Momentos, experiencias e historias que reflejan nuestro compromiso
            con la comunidad y las ganas de ayudar a quienes más lo necesitan.
          </p>

          <a
            href="#contenido"
            className="inline-flex items-center gap-2 mt-10 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-red-600/20"
          >
            Explorar galería
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>

        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section
        id="contenido"
        className="container mx-auto max-w-7xl px-5 py-16 md:py-20"
      >

        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">

          <div>
            <span className="text-red-600 uppercase tracking-[0.2em] font-bold text-xs">
              Recuerdos que nos unen
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
              Momentos de nuestra comunidad
            </h2>

            <p className="text-gray-500 mt-3 max-w-xl leading-relaxed">
              Conoce nuestras actividades, encuentros y experiencias
              a través de imágenes y videos.
            </p>
          </div>

          {/* CONTADORES */}
          <div className="flex gap-3">

            <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 min-w-[115px] shadow-sm">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm0 10l4-4 4 4 3-3 5 5" />
                </svg>
                <span className="text-xs font-semibold">Fotos</span>
              </div>
              <p className="text-3xl font-extrabold text-gray-900">
                {totalFotos}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 min-w-[115px] shadow-sm">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l5-3v10l-5-3M4 6h10v12H4z" />
                </svg>
                <span className="text-xs font-semibold">Videos</span>
              </div>
              <p className="text-3xl font-extrabold text-gray-900">
                {totalVideos}
              </p>
            </div>

          </div>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6 mb-10">

          <div className="flex flex-wrap gap-2">

            {filtros.map((item) => (
              <button
                key={item.id}
                onClick={() => setFiltro(item.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all ${
                  filtro === item.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-600'
                }`}
              >
                {item.nombre}

                <span className={`text-xs rounded-full px-2 py-0.5 ${
                  filtro === item.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {item.cantidad}
                </span>
              </button>
            ))}

          </div>

          <p className="text-sm text-gray-400">
            {imagenesFiltradas.length} elementos
          </p>

        </div>

        {/* CARGANDO */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
              >
                <div className="h-64 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}

          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="bg-white border border-red-100 rounded-2xl p-12 text-center">
            <p className="text-red-600 font-bold text-lg">
              No pudimos cargar la galería.
            </p>
            <p className="text-gray-500 mt-2">
              Intenta nuevamente más tarde.
            </p>
          </div>
        )}

        {/* GALERÍA */}
        {!loading && !error && imagenesFiltradas.length > 0 && (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

            {imagenesFiltradas.map((img) => {
              const video = esVideo(img.imagen_url)

              return (
                <article
                  key={img.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >

                  {/* IMAGEN O VIDEO */}
                  <button
                    type="button"
                    onClick={() => setFotoSeleccionada(img)}
                    aria-label={`Ver ${video ? 'video' : 'fotografía'}: ${img.titulo}`}
                    className="relative block w-full h-64 md:h-72 bg-gray-200 overflow-hidden text-left"
                  >

                    {video ? (

                      <>
                        <video
                          src={img.imagen_url}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          preload="metadata"
                          muted
                          playsInline
                        />

                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">

                          <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">

                            <svg className="w-8 h-8 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>

                          </div>

                        </div>

                        <span className="absolute top-4 left-4 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                          VIDEO
                        </span>
                      </>

                    ) : (

                      <>
                        <img
                          src={img.imagen_url}
                          alt={img.titulo}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                        <span className="absolute top-4 left-4 bg-black/65 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                          FOTO
                        </span>
                      </>

                    )}

                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        Ver contenido
                      </span>
                    </div>

                  </button>

                  {/* INFORMACIÓN */}
                  <div className="p-6">

                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
                      {img.titulo}
                    </h3>

                    {img.descripcion ? (
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {img.descripcion}
                      </p>
                    ) : (
                      <p className="text-gray-400 text-sm italic">
                        Fundación HNV
                      </p>
                    )}

                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">

                      <span className="text-xs text-gray-400 font-medium">
                        {video ? 'Contenido audiovisual' : 'Fotografía'}
                      </span>

                      <button
                        type="button"
                        onClick={() => setFotoSeleccionada(img)}
                        className="text-red-600 hover:text-red-700 text-sm font-bold inline-flex items-center gap-2"
                      >
                        Ver más
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                    </div>

                  </div>

                </article>
              )
            })}

          </div>
        )}

        {/* GALERÍA VACÍA */}
        {!loading && !error && imagenesFiltradas.length === 0 && (
          <div className="bg-white rounded-3xl border border-gray-200 py-20 px-6 text-center">

            <div className="w-20 h-20 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-6">

              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm0 10l4-4 4 4 3-3 4 4" />
              </svg>

            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Aún no hay contenido
            </h3>

            <p className="text-gray-500 max-w-md mx-auto">
              En esta sección todavía no tenemos publicaciones.
              ¡Pronto compartiremos nuevos momentos con nuestra comunidad!
            </p>

            {filtro !== 'todos' && (
              <button
                onClick={() => setFiltro('todos')}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition"
              >
                Ver toda la galería
              </button>
            )}

          </div>
        )}

      </section>

      {/* VISUALIZADOR AMPLIADO */}
      {fotoSeleccionada && (

        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-md"
          onClick={() => setFotoSeleccionada(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Visualización de contenido"
        >

          <div
            className="relative w-full max-w-6xl max-h-[95vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CERRAR */}
            <button
              type="button"
              onClick={() => setFotoSeleccionada(null)}
              aria-label="Cerrar"
              className="absolute -top-12 right-0 md:-right-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-3xl transition"
            >
              ×
            </button>

            {/* MULTIMEDIA */}
            <div className="w-full flex items-center justify-center min-h-0">

              {esVideo(fotoSeleccionada.imagen_url) ? (

                <video
                  key={fotoSeleccionada.id}
                  src={fotoSeleccionada.imagen_url}
                  className="max-w-full max-h-[72vh] rounded-xl shadow-2xl"
                  controls
                  autoPlay
                  playsInline
                />

              ) : (

                <img
                  src={fotoSeleccionada.imagen_url}
                  alt={fotoSeleccionada.titulo}
                  className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"
                />

              )}

            </div>

            {/* INFORMACIÓN */}
            <div className="w-full max-w-3xl mt-5 bg-white rounded-2xl p-5 md:p-7 text-center">

              <span className="text-red-600 text-xs font-bold uppercase tracking-widest">
                Fundación HNV
              </span>

              <h3 className="font-extrabold text-gray-900 text-xl md:text-2xl mt-2">
                {fotoSeleccionada.titulo}
              </h3>

              {fotoSeleccionada.descripcion && (
                <p className="text-gray-500 text-sm md:text-base mt-3 leading-relaxed">
                  {fotoSeleccionada.descripcion}
                </p>
              )}

              {/* NAVEGACIÓN */}
              <div className="flex items-center justify-center gap-4 mt-5">

                <button
                  type="button"
                  disabled={
                    imagenesFiltradas.findIndex(
                      img => img.id === fotoSeleccionada.id
                    ) === 0
                  }
                  onClick={() => {
                    const indice = imagenesFiltradas.findIndex(
                      img => img.id === fotoSeleccionada.id
                    )
                    if (indice > 0) {
                      setFotoSeleccionada(imagenesFiltradas[indice - 1])
                    }
                  }}
                  className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 text-gray-700 font-bold text-sm transition"
                >
                  ← Anterior
                </button>

                <span className="text-xs text-gray-400 font-medium">
                  {imagenesFiltradas.findIndex(
                    img => img.id === fotoSeleccionada.id
                  ) + 1} / {imagenesFiltradas.length}
                </span>

                <button
                  type="button"
                  disabled={
                    imagenesFiltradas.findIndex(
                      img => img.id === fotoSeleccionada.id
                    ) === imagenesFiltradas.length - 1
                  }
                  onClick={() => {
                    const indice = imagenesFiltradas.findIndex(
                      img => img.id === fotoSeleccionada.id
                    )
                    if (indice < imagenesFiltradas.length - 1) {
                      setFotoSeleccionada(imagenesFiltradas[indice + 1])
                    }
                  }}
                  className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 text-gray-700 font-bold text-sm transition"
                >
                  Siguiente →
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* PIE DE GALERÍA */}
      <section className="bg-[#111111] text-white py-14 px-6">

        <div className="container mx-auto max-w-5xl text-center">

          <div className="w-12 h-1 bg-red-600 mx-auto mb-6 rounded-full" />

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Juntos podemos hacer la diferencia
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Cada fotografía cuenta una historia y cada experiencia
            refleja el valor de ayudar, compartir y construir una
            comunidad más solidaria.
          </p>

          <p className="text-gray-600 text-xs mt-10">
            Fundación HNV · Nuestra comunidad en acción
          </p>

        </div>

      </section>

    </main>
  )
}
