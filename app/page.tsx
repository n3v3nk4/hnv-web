'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  { id: 1, titulo: 'Hazte Miembro', subtitulo: 'Únete a la comunidad HNV', imagen: '/hazte-miembro.jpg', link: '/hazte-miembro' },
  { id: 2, titulo: 'Donar', subtitulo: 'Transforma vidas con tu aporte', imagen: '/donar.jpg', link: '/donar' },
  { id: 3, titulo: 'Ser Voluntario', subtitulo: 'Aporta tu talento a la comunidad', imagen: '/voluntario.jpg', link: '/voluntariado' },
  { id: 4, titulo: 'Galería', subtitulo: 'Nuestra comunidad en acción', imagen: '/galeria.jpg', link: '/galeria' },
  { id: 5, titulo: 'Nuestro Proyecto', subtitulo: 'Campus Comunitarios HNV', imagen: '/proyecto.jpg', link: '/proyecto' }
]

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [puedeIzquierda, setPuedeIzquierda] = useState(false)
  const [puedeDerecha, setPuedeDerecha] = useState(true)

  const actualizarFlechas = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setPuedeIzquierda(scrollLeft > 10)
      setPuedeDerecha(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const mover = (direccion: 'izq' | 'der') => {
    if (scrollRef.current) {
      const anchoTarjeta = 280
      scrollRef.current.scrollBy({ left: direccion === 'der' ? anchoTarjeta : -anchoTarjeta, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    actualizarFlechas()
    window.addEventListener('resize', actualizarFlechas)
    return () => window.removeEventListener('resize', actualizarFlechas)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      
      {/* ====== HERO ====== */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/portada.jpg')" }} />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
        
        <div className="relative z-10 px-4 py-16 max-w-5xl mx-auto">
          <div className="relative w-40 h-20 mx-auto mb-6">
            <Image src="/logo.png" alt="HNV" fill sizes="160px" className="brightness-200 object-contain" priority />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Fundación Humanidad Nueva Visión
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-md">
            Capacitar · Acompañar · Bienestar · Éxito
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/hazte-miembro" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg">
              Hazte Miembro
            </Link>
            <Link href="/donar" className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg">
              Donar
            </Link>
            <Link href="/proyecto" className="bg-black/60 hover:bg-black/80 text-white border border-white/30 px-8 py-3 rounded-full font-bold transition transform hover:scale-105 backdrop-blur-sm">
              Nuestro Proyecto
            </Link>
          </div>
        </div>
      </section>

      {/* ====== CARRUSEL ====== */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">Explora HNV</h2>
        
        <div className="relative">
          <button onClick={() => mover('izq')} className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg border border-gray-200 ${puedeIzquierda ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity`}>
            <ChevronLeft size={28} className="text-red-600" />
          </button>
          <button onClick={() => mover('der')} className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg border border-gray-200 ${puedeDerecha ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity`}>
            <ChevronRight size={28} className="text-red-600" />
          </button>

          <div ref={scrollRef} onScroll={actualizarFlechas} className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {slides.map((slide) => (
              <Link key={slide.id} href={slide.link} className="group relative shrink-0 w-72 h-52 rounded-2xl overflow-hidden shadow-xl snap-center bg-black hover:shadow-2xl transition-shadow">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition duration-700" style={{ backgroundImage: `url('${slide.imagen}')` }} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-12">
                  <h3 className="text-white text-base font-bold">{slide.titulo}</h3>
                  <p className="text-gray-300 text-sm">{slide.subtitulo}</p>
                  <span className="mt-2 inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full group-hover:bg-red-500 transition">
                    Ver más →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CLUBES ====== */}
      <section className="container mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">Competencia</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Link href="/club-matriarca" className="group relative h-72 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition bg-black">
            <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition duration-700" style={{ backgroundImage: "url('/club-matriarca.jpg')" }} />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-16">
              <span className="text-xs uppercase tracking-wider text-red-400 font-semibold">Club</span>
              <h3 className="text-white text-2xl font-bold">Matriarca</h3>
              <p className="text-gray-300 text-sm">Liderazgo, sabiduría y transformación.</p>
            </div>
          </Link>

          <Link href="/club-patriarca" className="group relative h-72 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition bg-black">
            <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition duration-700" style={{ backgroundImage: "url('/club-patriarca.jpg')" }} />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-16">
              <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">Club</span>
              <h3 className="text-white text-2xl font-bold">Patriarca</h3>
              <p className="text-gray-300 text-sm">Fuerza, responsabilidad y construcción.</p>
            </div>
          </Link>
        </div>
      </section>

    </div>
  )
}