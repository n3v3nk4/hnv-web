// app/conocenos/page.tsx
import Image from 'next/image'

export default function Conocenos() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Conócenos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center bg-gray-100 p-6 rounded-lg shadow-md">
          <Image src="/presidenta.jpg" alt="Jesula Ostassia Vital Édouard" width={200} height={200} className="rounded-full mx-auto mb-4 object-cover" />
          <h2 className="text-xl font-bold">Jesula Ostassia Vital Édouard</h2>
          <p className="text-red-600 font-semibold">Presidenta</p>
        </div>
        <div className="text-center bg-gray-100 p-6 rounded-lg shadow-md">
          <Image src="/tesorero.jpg" alt="Cristopher Isaias Salas Espinoza" width={200} height={200} className="rounded-full mx-auto mb-4 object-cover" />
          <h2 className="text-xl font-bold">Cristopher Isaias Salas Espinoza</h2>
          <p className="text-red-600 font-semibold">Tesorero</p>
        </div>
        <div className="text-center bg-gray-100 p-6 rounded-lg shadow-md">
          <Image src="/secretaria.jpg" alt="Jenny Paul" width={200} height={200} className="rounded-full mx-auto mb-4 object-cover" />
          <h2 className="text-xl font-bold">Jenny Paul</h2>
          <p className="text-red-600 font-semibold">Secretaria</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6 text-center">
        <h2 className="text-2xl font-bold">Misión</h2>
        <p className="text-gray-700">Contribuir al desarrollo integral de las personas y las comunidades mediante programas de educación, capacitación, acompañamiento, bienestar y solidaridad.</p>
        
        <h2 className="text-2xl font-bold">Visión</h2>
        <p className="text-gray-700">Construir una comunidad organizada, consciente, capacitada y solidaria.</p>

        <h2 className="text-2xl font-bold">Valores</h2>
        <p className="font-semibold text-red-600">Respeto · Responsabilidad · Disciplina · Solidaridad · Transparencia · Inclusión · Compromiso · Acción</p>
      </div>
    </div>
  )
}