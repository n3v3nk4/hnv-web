import Link from 'next/link'
import { Instagram, Facebook, Twitter, Youtube, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white p-10">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-red-600 mb-2">HNV - Humanidad Nueva Visión</p>
          <p className="text-gray-400">Capacitar • Acompañar • Bienestar • Éxito</p>
        </div>
        
        <div className="flex justify-center gap-6 mb-8">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-red-600 transition">
            <Instagram size={24} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-red-600 transition">
            <Facebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-red-600 transition">
            <Twitter size={24} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-red-600 transition">
            <Youtube size={24} />
          </a>
          <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-red-600 transition">
            <MessageCircle size={24} />
          </a>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} HNV. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}