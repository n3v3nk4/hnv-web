'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Heart } from 'lucide-react'

export default function Donar() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({ donor_name: '', phone: '', email: '', donation_type: 'money', amount_clp: '', description: '', city: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    const { error } = await supabase.from('donations').insert([formData])
    if (!error) {
      setSuccess(true)
      setFormData({ donor_name: '', phone: '', email: '', donation_type: 'money', amount_clp: '', description: '', city: '', message: '' })
    } else {
      console.error('Error de Supabase:', error)
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-red-600">DONAR ❤️</h1>
        <p className="text-center text-gray-600 mb-10">Tu aporte puede transformar una vida</p>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <p className="text-gray-700">Cada colaboración contribuye al desarrollo de los programas, actividades y proyectos de Fundación HNV.</p>
          <p className="text-gray-700 mt-2">Puedes ayudarnos mediante una donación económica o una donación en especie.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">💰 Donaciones en dinero</h2>
          <p className="text-gray-700 mb-4">Realiza una contribución económica para apoyar las actividades y proyectos de HNV.</p>
          <p className="text-gray-600 text-sm">Las donaciones son para el financiamiento de programas, materiales, actividades educativas, apoyo comunitario y otros proyectos institucionales, de acuerdo con las necesidades y objetivos de HNV.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">📦 Donaciones en especie</h2>
          <p className="text-gray-700 mb-4">También puedes colaborar entregando bienes o materiales. Puedes donar, por ejemplo:</p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Alimentos</li>
            <li>Ropa</li>
            <li>Material educativo</li>
            <li>Computadores y equipos tecnológicos</li>
            <li>Muebles</li>
            <li>Materiales de oficina</li>
            <li>Materiales para talleres</li>
            <li>Equipamiento</li>
            <li>Productos de higiene</li>
            <li>Insumos para actividades</li>
            <li>Otros bienes útiles para nuestros programas</li>
          </ul>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl mb-6 flex items-center gap-3">
            <Heart size={24} />
            <span className="font-semibold">¡Gracias por tu donación! Te contactaremos.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
              <input type="text" name="donor_name" onChange={(e) => setFormData({...formData, donor_name: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
              <input type="tel" name="phone" onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo</label>
              <input type="email" name="email" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de donación</label>
              <select name="donation_type" onChange={(e) => setFormData({...formData, donation_type: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none">
                <option value="money">💰 Dinero</option>
                <option value="in_kind">📦 En especie</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Monto (CLP)</label>
              <input type="number" name="amount_clp" onChange={(e) => setFormData({...formData, amount_clp: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ciudad/Comuna</label>
              <input type="text" name="city" onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
              <textarea name="description" onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-4 rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50 shadow-lg">
            {loading ? 'Enviando...' : 'ENVIAR DONACIÓN'}
          </button>
        </form>
      </div>
    </div>
  )
}