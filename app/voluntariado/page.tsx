'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Voluntariado() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '', age: '', phone: '', whatsapp: '', email: '', city: '', occupation: '', talents: '', area: '', availability: '', message: ''
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    const { error } = await supabase.from('volunteers').insert([formData])
    if (!error) {
      setSuccess(true)
      setFormData({ full_name: '', age: '', phone: '', whatsapp: '', email: '', city: '', occupation: '', talents: '', area: '', availability: '', message: '' })
    } else {
      console.error('Error de Supabase:', error)
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">SER VOLUNTARIO 🙋🏾‍♀️🙋🏽‍♂️</h1>
        <p className="text-center text-gray-600 mb-10">Tu tiempo y tus talentos también pueden transformar vidas</p>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <p className="text-gray-700">En HNV creemos que todas las personas tienen algo que aportar.</p>
          <p className="text-gray-700 mt-2">Puedes colaborar compartiendo tu tiempo, conocimientos, experiencia profesional, habilidades o talentos.</p>
          <p className="text-gray-700 mt-2">Buscamos personas interesadas en apoyar diferentes áreas de nuestra fundación y participar activamente en nuestros programas, actividades y proyectos comunitarios.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">¿Cómo puedes colaborar?</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Educación y capacitación</li>
            <li>Desarrollo personal</li>
            <li>Actividades comunitarias</li>
            <li>Apoyo administrativo</li>
            <li>Bienestar</li>
            <li>Cultura y recreación</li>
            <li>Tecnología</li>
            <li>Comunicación y redes sociales</li>
            <li>Organización de eventos</li>
            <li>Emprendimiento</li>
            <li>Orientación profesional</li>
            <li>Logística</li>
            <li>Apoyo a proyectos sociales</li>
            <li>Otros conocimientos o talentos</li>
          </ul>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl mb-6">
            <span className="font-semibold">¡Gracias por tu interés! Te contactaremos pronto.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo *</label>
              <input type="text" name="full_name" required onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Edad</label>
              <input type="number" name="age" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono *</label>
              <input type="tel" name="phone" required onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
              <input type="text" name="whatsapp" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico *</label>
              <input type="email" name="email" required onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Comuna/Ciudad</label>
              <input type="text" name="city" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Profesión u ocupación</label>
              <input type="text" name="occupation" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Conocimientos o talentos</label>
              <input type="text" name="talents" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Área en la que deseas colaborar</label>
              <select name="area" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none">
                <option value="">Selecciona un área</option>
                <option value="Educación">Educación</option>
                <option value="Desarrollo personal">Desarrollo personal</option>
                <option value="Bienestar">Bienestar</option>
                <option value="Emprendimiento">Emprendimiento</option>
                <option value="Actividades comunitarias">Actividades comunitarias</option>
                <option value="Apoyo administrativo">Apoyo administrativo</option>
                <option value="Cultura y recreación">Cultura y recreación</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Comunicación y redes sociales">Comunicación y redes sociales</option>
                <option value="Organización de eventos">Organización de eventos</option>
                <option value="Orientación profesional">Orientación profesional</option>
                <option value="Logística">Logística</option>
                <option value="Apoyo a proyectos sociales">Apoyo a proyectos sociales</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Disponibilidad</label>
              <input type="text" name="availability" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">¿Por qué quieres ser voluntario/a de HNV?</label>
              <textarea name="message" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-4 rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50 shadow-lg">
            {loading ? 'Enviando...' : 'REGISTRARME COMO VOLUNTARIO'}
          </button>
        </form>
      </div>
    </div>
  )
}