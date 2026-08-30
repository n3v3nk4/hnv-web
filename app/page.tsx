// app/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="text-center py-20 px-4">
      <div className="flex justify-center mb-8">
        <Image src="/logo.png" alt="Logo HNV" width={400} height={200} />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6">HNV: HUMANIDAD NUEVA VISIÓN</h1>
      <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
        Capacitamos, acompañamos y promovemos el bienestar para transformar comunidades.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/hazte-miembro" className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition">HAZTE MIEMBRO</Link>
        <Link href="/donar" className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">DONAR</Link>
      </div>
    </div>
  )
}