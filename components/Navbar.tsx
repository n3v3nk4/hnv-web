'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo HNV" width={50} height={35} />
          <span className="text-2xl font-bold text-red-600 font-poppins">HNV</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/conocenos" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition">Conócenos</Link>
          <Link href="/hazte-miembro" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition">Hazte Miembro</Link>
          <Link href="/proyecto" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition">Nuestro Proyecto</Link>
          <Link href="/donar" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition">Donar</Link>
          <Link href="/voluntariado" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition">Ser Voluntario</Link>
          <Link href="/galeria" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition">Galería</Link>
          <Link href="/admin" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition">Admin</Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <ul className="flex flex-col p-4">
            <li><Link href="/conocenos" className="block py-2 text-gray-700 hover:text-red-600">Conócenos</Link></li>
            <li><Link href="/hazte-miembro" className="block py-2 text-gray-700 hover:text-red-600">Hazte Miembro</Link></li>
            <li><Link href="/proyecto" className="block py-2 text-gray-700 hover:text-red-600">Nuestro Proyecto</Link></li>
            <li><Link href="/donar" className="block py-2 text-gray-700 hover:text-red-600">Donar</Link></li>
            <li><Link href="/voluntariado" className="block py-2 text-gray-700 hover:text-red-600">Ser Voluntario</Link></li>
            <li><Link href="/galeria" className="block py-2 text-gray-700 hover:text-red-600">Galería</Link></li>
            <li><Link href="/admin" className="block py-2 text-gray-700 hover:text-red-600">Admin</Link></li>
          </ul>
        </div>
      )}
    </nav>
  )
}