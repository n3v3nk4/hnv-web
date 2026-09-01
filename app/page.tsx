'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ventanas = [
  { titulo: 'Hazte Miembro', descripcion: 'Únete a la comunidad', href: '/hazte-miembro', imagen: '/hazte-miembro.jpg' },
  { titulo: 'Nuestro Proyecto', descripcion: 'Campus Comunitarios', href: '/proyecto', imagen: '/proyecto.jpg' },
  { titulo: 'Donar', descripcion: 'Transforma vidas', href: '/donar', imagen: '/donar.jpg' },
  { titulo: 'Ser Voluntario', descripcion: 'Aporta tu talento', href: '/voluntariado', imagen: '/voluntario.jpg' },
  { titulo: 'Galería', descripcion: 'Nuestra comunidad', href: '/galeria', imagen: '/galeria.jpg' },
]

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [puedeIzquierda, setPuedeIzquierda] = useState(false)
  const [puedeDerecha, setPuedeDerecha] = useState(true)

  const actualizarFlechas = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setPuedeIzquierda(scrollLeft > 0)
      setPuedeDerecha(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const mover = (direccion: 'izq' | 'der') => {
    if (scrollRef.current) {
      const anchoTarjeta = scrollRef.current.clientWidth * 0.8
      scrollRef.current.scrollBy({ left: direccion === 'der' ? anchoTarjeta : -anchoTarjeta, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    actualizarFlechas()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        
        {/* CARRUSEL DE VENTANAS */}
        <div className="relative mb-12">
          <button onClick={() => mover('izq')} className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg border ${puedeIzquierda ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <ChevronLeft size={24} className="text-red-600" />
          </button>
          <button onClick={() => mover('der')} className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg border ${puedeDerecha ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <ChevronRight size={24} className="text-red-600" />
          </button>

          <div ref={scrollRef} onScroll={actualizarFlechas} className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {ventanas.map((ventana, index) => (
              <Link key={index} href={ventana.href} className="group relative flex-shrink-0 w-[280px] md:w-[350px] h-[220px] rounded-3xl overflow-hidden shadow-xl snap-center bg-black">
                <Image src={ventana.imagen} alt={ventana.titulo} fill className="object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{ventana.titulo}</h3>
                  <p className="text-sm text-gray-200">{ventana.descripcion}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* LOGO MÁS CHIQUITO */}
        <div className="text-center mb-6">
          <div className="inline-block bg-white p-3 rounded-2xl shadow-lg">
            <Image src="/logo.png" alt="Logo HNV" width={120} height={80} className="w-auto h-auto" />
          </div>
        </div>

        {/* TÍTULO Y DESCRIPCIÓN */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            HNV: <span className="text-red-600">HUMANIDAD NUEVA VISIÓN</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fundación Humanidad Nueva Visión. Capacitar • Acompañar • Bienestar • Éxito
          </p>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <Link href="/hazte-miembro" className="bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-red-700 transition transform hover:scale-105">
            Hazte miembro
          </Link>
          <Link href="/donar" className="bg-black text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-gray-800 transition transform hover:scale-105">
            Donar
          </Link>
        </div>

        {/* CLUB MATRIARCA Y PATRIARCA */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Competencia</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/club" className="group relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
            <Image src="/club-matriarca.jpg" alt="Club Matriarca" fill className="object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition"></div>
            <div className="absolute bottom-0 p-6 text-white">
              <h3 className="text-3xl font-bold">Club Matriarca</h3>
              <p className="text-sm mt-2">Liderazgo, sabiduría y transformación.</p>
            </div>
          </Link>

          <Link href="/club" className="group relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
            <Image src="/club-patriarca.jpg" alt="Club Patriarca" fill className="object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition"></div>
            <div className="absolute bottom-0 p-6 text-white">
              <h3 className="text-3xl font-bold">Club Patriarca</h3>
              <p className="text-sm mt-2">Fuerza, responsabilidad y construcción.</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}