'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-black text-white p-3 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="HNV" width={35} height={25} className="h-auto" />
          <span className="text-xl font-bold text-red-500">HNV</span>
        </Link>

        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li><Link href="/" className="hover:text-red-500 transition">Inicio</Link></li>
          <li><Link href="/faq" className="hover:text-red-500 transition">FAQ</Link></li>
          <li><Link href="/galeria" className="hover:text-red-500 transition">Galería</Link></li>
          <li><Link href="/proyecto" className="hover:text-red-500 transition">Proyecto</Link></li>
          <li><Link href="/admin" className="hover:text-red-500 transition">Administración</Link></li>
        </ul>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black text-white p-4 mt-2 rounded-lg">
          <ul className="flex flex-col gap-3 text-center text-sm font-medium">
            <li><Link href="/" onClick={() => setIsOpen(false)} className="block hover:text-red-500">Inicio</Link></li>
            <li><Link href="/faq" onClick={() => setIsOpen(false)} className="block hover:text-red-500">FAQ</Link></li>
            <li><Link href="/galeria" onClick={() => setIsOpen(false)} className="block hover:text-red-500">Galería</Link></li>
            <li><Link href="/proyecto" onClick={() => setIsOpen(false)} className="block hover:text-red-500">Proyecto</Link></li>
            <li><Link href="/admin" onClick={() => setIsOpen(false)} className="block hover:text-red-500">Administración</Link></li>
          </ul>
        </div>
      )}
    </nav>
  )
}