'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Voluntariado() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    area_of_interest: '',
    message: ''
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    
    const { error } = await supabase
      .from('volunteers')
      .insert([formData])

    if (!error) {
      setSuccess(true)
      setFormData({ full_name: '', email: '', phone: '', area_of_interest: '', message: '' })
    } else {
      console.error('Error de Supabase:', error)
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8">Ser Voluntario</h1>
      <p className="text-center text-gray-700 mb-8">
        ¿Quieres aportar tu tiempo y talento? ¡Únete a nuestro equipo!
      </p>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">¡Gracias por tu interés!</strong>
          <span className="block sm:inline"> Te contactaremos pronto.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <input type="text" name="full_name" placeholder="Nombre completo *" required onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="email" name="email" placeholder="Correo electrónico *" required onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="tel" name="phone" placeholder="Teléfono *" required onChange={handleChange} className="w-full p-3 border rounded" />
        
        <select name="area_of_interest" onChange={handleChange} className="w-full p-3 border rounded">
          <option value="">Selecciona un área</option>
          <option value="Educación">Educación</option>
          <option value="Desarrollo personal">Desarrollo personal</option>
          <option value="Bienestar">Bienestar</option>
          <option value="Emprendimiento">Emprendimiento</option>
          <option value="Actividades comunitarias">Actividades comunitarias</option>
          <option value="Apoyo logístico">Apoyo logístico</option>
        </select>

        <textarea name="message" placeholder="¿Por qué quieres ser voluntario?" onChange={handleChange} className="w-full p-3 border rounded" />

        <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-3 rounded font-bold hover:bg-red-700 disabled:opacity-50">
          {loading ? 'Enviando...' : 'REGISTRARME COMO VOLUNTARIO'}
        </button>
      </form>
    </div>
  )
}