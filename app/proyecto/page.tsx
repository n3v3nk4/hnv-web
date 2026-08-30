// app/proyecto/page.tsx
import Image from 'next/image'

export default function Proyecto() {
  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <h1 className="text-4xl font-bold mb-8">Nuestro Gran Proyecto</h1>
      <div className="max-w-4xl mx-auto">
        <Image src="/campus.jpg" alt="Campus Comunitario HNV" width={800} height={450} className="rounded-xl shadow-2xl mb-8" />
        <p className="text-lg text-gray-700">
          Nuestro gran proyecto de construcción consiste en crear grandes campus comunitarios estructurados como un verdadero ecosistema. Allí, cada persona encontrará un entorno bien equipado con herramientas, programas y servicios para desarrollar plenamente su potencial y mejorar su calidad de vida.
        </p>
      </div>
    </div>
  )
}