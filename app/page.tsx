'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// ====== CARRUSEL (SOLO 5: Hazte Miembro, Donar, Voluntario, Galería, Proyecto) ======
const slides = [
  {
    id: 1,
    subtitulo: 'Únete a la comunidad HNV',
    imagen: '/hazte-miembro.jpg',
    link: '/hazte-miembro'
  },
  {
    id: 2,
    subtitulo: 'Transforma vidas con tu aporte',
    imagen: '/donar.jpg',
    link: '/donar'
  },
  {
    id: 3,
    subtitulo: 'Aporta tu talento a la comunidad',
    imagen: '/voluntario.jpg',
    link: '/voluntariado'
  },
  {
    id: 4,
    subtitulo: 'Nuestra comunidad en acción',
    imagen: '/galeria.jpg',
    link: '/galeria'
  },
  {
    id: 5,
    subtitulo: 'Campus Comunitarios HNV',
    imagen: '/proyecto.jpg',
    link: '/proyecto'
  }
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
      const anchoTarjeta = 320
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
      
      {/* ====== HERO CON LOGO + BOTONES ====== */}
      <section className="relative h-[50vh] flex items-center justify-center text-center text-white" style={{
        backgroundImage: "url('/campus.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-4">
          
          <div className="flex justify-center mb-4">
            <Image 
              src="/logo.png" 
              alt="HNV" 
              width={120} 
              height={60} 
              className="brightness-200"
            />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
            HNV
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Fundación Humanidad Nueva Visión
          </p>
          
          {/* ====== BOTONES: HAZTE MIEMBRO Y DONAR ====== */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link 
              href="/hazte-miembro" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg"
            >
              Hazte Miembro
            </Link>
            <Link 
              href="/donar" 
              className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg"
            >
              Donar
            </Link>
          </div>
        </div>
      </section>

      {/* ====== CARRUSEL CON IMÁGENES BIEN AJUSTADAS ====== */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Explora HNV</h2>
        
        <div className="relative">
          <button 
            onClick={() => mover('izq')} 
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg border border-gray-200 ${
              puedeIzquierda ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-opacity`}
          >
            <ChevronLeft size={28} className="text-red-600" />
          </button>

          <button 
            onClick={() => mover('der')} 
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg border border-gray-200 ${
              puedeDerecha ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-opacity`}
          >
            <ChevronRight size={28} className="text-red-600" />
          </button>

          <div 
            ref={scrollRef} 
            onScroll={actualizarFlechas} 
            className="flex overflow-x-auto gap-5 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {slides.map((slide) => (
              <Link 
                key={slide.id}
                href={slide.link}
                className="group relative flex-shrink-0 w-[280px] md:w-[300px] h-[200px] rounded-2xl overflow-hidden shadow-xl snap-center bg-black hover:shadow-2xl transition-shadow"
              >
                {/* ====== IMAGEN CON object-cover PARA QUE SE AJUSTE BIEN ====== */}
                <div className="absolute inset-0">
                  <Image 
                    src={slide.imagen} 
                    alt={slide.subtitulo} 
                    fill 
                    className="object-cover group-hover:scale-110 transition duration-500"
                    sizes="(max-width: 768px) 280px, 300px"
                    priority
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-sm font-medium text-gray-200">{slide.subtitulo}</p>
                  <span className="mt-2 inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full group-hover:bg-red-500 transition">
                    Ver más →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== COMPETENCIA ====== */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-black">Competencia</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          <Link href="/club-matriarca" className="group relative h-[300px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition">
            <div className="absolute inset-0">
              <Image 
                src="/club-matriarca.jpg" 
                alt="Club Matriarca" 
                fill 
                className="object-cover group-hover:scale-105 transition duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="text-xs uppercase tracking-wider text-red-400 font-semibold">Club</span>
              <h3 className="text-2xl font-bold">Matriarca</h3>
              <p className="text-sm text-gray-300">Liderazgo, sabiduría y transformación.</p>
            </div>
          </Link>

          <Link href="/club-patriarca" className="group relative h-[300px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition">
            <div className="absolute inset-0">
              <Image 
                src="/club-patriarca.jpg" 
                alt="Club Patriarca" 
                fill 
                className="object-cover group-hover:scale-105 transition duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">Club</span>
              <h3 className="text-2xl font-bold">Patriarca</h3>
              <p className="text-sm text-gray-300">Fuerza, responsabilidad y construcción.</p>
            </div>
          </Link>

        </div>
      </section>

    </div>
  )
}