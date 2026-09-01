import Image from 'next/image'

export default function Proyecto() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">NUESTRO PROYECTO 🏗️</h1>
        <p className="text-center text-gray-600 mb-12">Campus Comunitarios HNV</p>
        
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-8">
          <p className="text-lg text-gray-700 mb-4">Nuestro gran proyecto es la construcción de los Campus Comunitarios HNV.</p>
          <p className="text-gray-700 mb-4">Estos campus serán espacios estructurados como verdaderos ecosistemas comunitarios, creados para reunir en un mismo lugar educación, capacitación, bienestar, desarrollo personal, emprendimiento, servicios, programas y oportunidades.</p>
          <p className="text-gray-700 mb-4">Nuestro objetivo es que cada persona encuentre un entorno bien equipado con las herramientas necesarias para desarrollar plenamente su potencial, mejorar su calidad de vida y prepararse para contribuir activamente al desarrollo de su comunidad.</p>
          <p className="text-gray-700 mb-4">No queremos solamente ofrecer ayuda.</p>
          <p className="text-gray-700 font-semibold mb-8">Queremos crear las condiciones para que las personas puedan aprender, desarrollarse, descubrir sus capacidades, superar dificultades, crear proyectos, encontrar oportunidades y avanzar hacia una mayor autonomía.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold mb-6">Proyecto Piloto</h2>
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image src="/proyecto.jpg" alt="Campus Comunitario HNV" fill className="object-cover" />
          </div>
          <p className="text-gray-700 mt-6">El proyecto piloto permitirá comenzar a materializar la visión de HNV y desarrollar nuestro primer gran campus comunitario.</p>
        </div>
      </div>
    </div>
  )
}