import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-black to-gray-900 text-white p-4 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo HNV" width={60} height={40} />
          <span className="text-2xl font-bold text-red-600">HNV</span>
        </Link>
        <ul className="flex flex-wrap gap-6 mt-2 md:mt-0 text-sm font-semibold">
          <li><Link href="/conocenos" className="hover:text-red-400 transition">Conócenos</Link></li>
          <li><Link href="/hazte-miembro" className="hover:text-red-400 transition">Hazte Miembro</Link></li>
          <li><Link href="/proyecto" className="hover:text-red-400 transition">Nuestro Proyecto</Link></li>
          <li><Link href="/donar" className="hover:text-red-400 transition">Donar</Link></li>
          <li><Link href="/voluntariado" className="hover:text-red-400 transition">Ser Voluntario</Link></li>
          <li><Link href="/galeria" className="hover:text-red-400 transition">Galería</Link></li>
          <li><Link href="/admin" className="hover:text-red-400 transition">Admin</Link></li>
        </ul>
      </div>
    </nav>
  )
}