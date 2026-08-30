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
        <h1 className="text-4xl font-bold text-center mb-4 font-poppins text-red-600">❤️ Donar</h1>
        <p className="text-center text-gray-600 mb-10">Tu aporte puede transformar una vida</p>
        
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
              <input type="text" name="donor_name" onChange={(e) => setFormData({...formData, donor_name: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
              <input type="tel" name="phone" onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo</label>
              <input type="email" name="email" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de donación</label>
              <select name="donation_type" onChange={(e) => setFormData({...formData, donation_type: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition">
                <option value="money">💰 Dinero</option>
                <option value="in_kind">📦 En especie</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Monto (CLP)</label>
              <input type="number" name="amount_clp" onChange={(e) => setFormData({...formData, amount_clp: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ciudad/Comuna</label>
              <input type="text" name="city" onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
              <textarea name="description" onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
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