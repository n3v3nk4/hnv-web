'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-black shadow-xl sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo HNV"
            width={50}
            height={35}
            className="w-auto h-auto"
          />
          <span className="text-2xl font-bold text-red-600">HNV</span>
        </Link>
        
        {/* Menú para escritorio */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/conocenos" className="text-sm font-semibold text-white hover:text-red-400 transition">Conócenos</Link>
          <Link href="/hazte-miembro" className="text-sm font-semibold text-white hover:text-red-400 transition">Hazte Miembro</Link>
          <Link href="/proyecto" className="text-sm font-semibold text-white hover:text-red-400 transition">Nuestro Proyecto</Link>
          <Link href="/donar" className="text-sm font-semibold text-white hover:text-red-400 transition">Donar</Link>
          <Link href="/voluntariado" className="text-sm font-semibold text-white hover:text-red-400 transition">Ser Voluntario</Link>
          <Link href="/galeria" className="text-sm font-semibold text-white hover:text-red-400 transition">Galería</Link>
          <Link href="/admin" className="text-sm font-semibold text-white hover:text-red-400 transition">Admin</Link>
        </div>

        {/* Botón para móvil */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <span className="text-3xl">✕</span> : <span className="text-3xl">☰</span>}
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <ul className="flex flex-col p-4">
            <li><Link href="/conocenos" className="block py-2 text-white hover:text-red-400">Conócenos</Link></li>
            <li><Link href="/hazte-miembro" className="block py-2 text-white hover:text-red-400">Hazte Miembro</Link></li>
            <li><Link href="/proyecto" className="block py-2 text-white hover:text-red-400">Nuestro Proyecto</Link></li>
            <li><Link href="/donar" className="block py-2 text-white hover:text-red-400">Donar</Link></li>
            <li><Link href="/voluntariado" className="block py-2 text-white hover:text-red-400">Ser Voluntario</Link></li>
            <li><Link href="/galeria" className="block py-2 text-white hover:text-red-400">Galería</Link></li>
            <li><Link href="/admin" className="block py-2 text-white hover:text-red-400">Admin</Link></li>
          </ul>
        </div>
      )}
    </nav>
  )
}