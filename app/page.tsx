import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-red-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-black rounded-full blur-3xl opacity-20"></div>
      </div>
      
      <div className="relative z-10 text-center py-20 px-4">
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Logo HNV" width={400} height={200} />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-poppins text-gray-900">
          HNV: <span className="text-red-600">HUMANIDAD</span> NUEVA VISIÓN
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Capacitar • Acompañar • Bienestar • Éxito
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/hazte-miembro" className="bg-red-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-red-700 transition transform hover:scale-105">
            HAZTE MIEMBRO
          </Link>
          <Link href="/donar" className="bg-black text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-gray-800 transition transform hover:scale-105">
            DONAR
          </Link>
        </div>
      </div>
    </div>
  )
}