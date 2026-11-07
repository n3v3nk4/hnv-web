'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  { id: 1, titulo: 'Galería', subtitulo: 'Nuestra comunidad en acción', imagen: '/galeria.jpg', link: '/galeria' },
  { id: 2, titulo: 'Nuestro Proyecto', subtitulo: 'Campus Comunitarios HNV', imagen: '/proyecto.jpg', link: '/proyecto' },
  { id: 3, titulo: 'Ser Voluntario', subtitulo: 'Aporta tu talento a la comunidad', imagen: '/voluntario.jpg', link: '/voluntariado' },
  { id: 4, titulo: 'Donar', subtitulo: 'Transforma vidas con tu aporte', imagen: '/donar.jpg', link: '/donar' },
  { id: 5, titulo: 'Hazte Miembro', subtitulo: 'Únete a la comunidad HNV', imagen: '/hazte-miembro.jpg', link: '/hazte-miembro' }
]

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const [puedeIzquierda, setPuedeIzquierda] = useState(false)
  const [puedeDerecha, setPuedeDerecha] = useState(true)

  // ACTUALIZAR FLECHAS
  const actualizarFlechas = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setPuedeIzquierda(scrollLeft > 10)
      setPuedeDerecha(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  // MOVER CARRUSEL
  const mover = (direccion: 'izq' | 'der') => {
    if (scrollRef.current) {
      const anchoTarjeta = 280
      scrollRef.current.scrollBy({
        left: direccion === 'der' ? anchoTarjeta : -anchoTarjeta,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    actualizarFlechas()
    window.addEventListener('resize', actualizarFlechas)
    return () => window.removeEventListener('resize', actualizarFlechas)
  }, [])

  return (
    <div className="min-h-screen bg-white">

      {/* ================================= */}
      {/* PORTADA PRINCIPAL */}
      {/* ================================= */}

      <section className="relative w-full h-[85vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        
        {/* IMAGEN ORIGINAL DE PORTADA */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/portada.jpg')" }}
        />

        {/* CAPA OSCURA SUAVE */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENIDO */}
        <div className="relative z-10 px-4 py-6 max-w-3xl mx-auto flex flex-col items-center justify-end h-full pb-12">
          
          {/* Título más pequeño */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-3 drop-shadow-xl leading-tight">
            Fundación Humanidad Nueva Visión
          </h1>

          <div className="w-16 h-0.5 bg-red-600 rounded-full mb-3" />

          {/* Subtítulo más pequeño */}
          <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-6 drop-shadow-md tracking-wide">
            Capacitar · Acompañar · Bienestar · Éxito
          </p>

          {/* BOTONES MÁS PEQUEÑOS */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 w-full max-w-sm sm:max-w-none">
            <Link
              href="/hazte-miembro"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300 hover:scale-105 shadow-md w-full sm:w-auto text-center"
            >
              Hazte Miembro
            </Link>

            <Link
              href="/donar"
              className="bg-white hover:bg-gray-200 text-black px-6 py-2.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300 hover:scale-105 shadow-md w-full sm:w-auto text-center"
            >
              Donar
            </Link>

            <Link
              href="/proyecto"
              className="bg-black/60 hover:bg-black/80 text-white border border-white/30 px-6 py-2.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300 hover:scale-105 backdrop-blur-sm w-full sm:w-auto text-center"
            >
              Nuestro Proyecto
            </Link>
          </div>
        </div>
      </section>


      {/* ================================= */}
      {/* CARRUSEL EXPLORA HNV */}
      {/* ================================= */}

      <section className="container mx-auto py-16 md:py-20 px-4">
        <div className="text-center mb-10">
          <span className="text-red-600 uppercase tracking-[0.2em] text-xs font-bold">
            Conoce nuestra fundación
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black mt-3 mb-3">
            Explora HNV
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* FLECHA IZQUIERDA */}
          <button
            type="button"
            onClick={() => mover('izq')}
            aria-label="Anterior"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2.5 rounded-full shadow-lg border border-gray-200 hover:bg-red-600 hover:text-white transition-all ${
              puedeIzquierda ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft size={26} className="text-red-600" />
          </button>

          {/* FLECHA DERECHA */}
          <button
            type="button"
            onClick={() => mover('der')}
            aria-label="Siguiente"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2.5 rounded-full shadow-lg border border-gray-200 hover:bg-red-600 transition-all ${
              puedeDerecha ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight size={26} className="text-red-600" />
          </button>

          {/* TARJETAS */}
          <div
            ref={scrollRef}
            onScroll={actualizarFlechas}
            className="flex overflow-x-auto gap-6 pb-5 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {slides.map((slide) => (
              <Link
                key={slide.id}
                href={slide.link}
                className="group relative shrink-0 w-72 h-52 md:h-60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl snap-center bg-black transition-all duration-300"
              >
                {/* IMAGEN ORIGINAL */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${slide.imagen}')` }}
                />

                {/* DEGRADADO */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent" />

                {/* INFORMACIÓN */}
                <div className="absolute bottom-0 left-0 right-0 p-5 pt-12">
                  <h3 className="text-white text-lg font-bold mb-1">
                    {slide.titulo}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {slide.subtitulo}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-full group-hover:bg-red-500 transition">
                    Ver más
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-3">
          Desliza para descubrir más contenido
        </p>
      </section>


      {/* ================================= */}
      {/* CLUBES */}
      {/* ================================= */}

      <section className="container mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <span className="text-red-600 uppercase tracking-[0.2em] text-xs font-bold">
            Participación y comunidad
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black mt-3 mb-3">
            COMPETICIÓN ENTRE CLUB MATRIARCA Y CLUB PATRIARCA
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* CLUB MATRIARCA */}
          <Link
            href="/club-matriarca"
            className="group relative w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 bg-white"
          >
            <img
              src="/club-matriarca.jpg"
              alt="Club Matriarca"
              className="w-full h-auto object-contain group-hover:scale-[1.02] transition duration-700"
              loading="lazy"
            />
          </Link>

          {/* CLUB PATRIARCA */}
          <Link
            href="/club-patriarca"
            className="group relative w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 bg-white"
          >
            <img
              src="/club-patriarca.jpg"
              alt="Club Patriarca"
              className="w-full h-auto object-contain group-hover:scale-[1.02] transition duration-700"
              loading="lazy"
            />
          </Link>
        </div>
      </section>

    </div>
  )
}