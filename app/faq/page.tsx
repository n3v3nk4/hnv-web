'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  const preguntas = [
    { q: '¿Qué es HNV?', a: 'HNV es la fundación de la matriarca orientada al desarrollo humano, la educación, el acompañamiento, el bienestar y la transformación comunitaria.' },
    { q: '¿Cuál es el objetivo de HNV?', a: 'Construir campus comunitarios. Crear programas y espacios que permitan a las personas adquirir conocimientos, desarrollar capacidades, recibir acompañamiento y acceder a nuevas oportunidades.' },
    { q: '¿Quién puede ser miembro?', a: 'Las personas que quieran formar parte de la comunidad HNV y participar en sus programas y actividades pueden solicitar su membresía.' },
    { q: '¿Cuánto cuesta ser miembro?', a: 'Actualmente se contemplan cuatro niveles de aporte mensual: $5.000, $15.000, $20.000 y $100.000 CLP.' },
    { q: '¿Qué beneficios recibe un miembro?', a: 'Acceso a la Masterclass gratuita de Desarrollo Personal y Resolución de Problemas, un masaje relajante gratuito, y participación en actividades de la comunidad.' },
    { q: '¿Puedo hacer una donación sin ser miembro?', a: 'Sí. Puedes apoyar a HNV mediante una donación aunque no seas miembro.' },
    { q: '¿Puedo ser voluntario?', a: 'Sí. HNV puede incorporar personas interesadas en colaborar voluntariamente en sus diferentes áreas y actividades.' },
  ]

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8">PREGUNTAS FRECUENTES</h1>
        <div className="space-y-4">
          {preguntas.map((pregunta, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <button 
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-semibold text-lg">{pregunta.q}</span>
                <ChevronDown className={`transition ${open === index ? 'rotate-180' : ''}`} />
              </button>
              {open === index && (
                <div className="px-6 pb-6 text-gray-700">
                  {pregunta.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}