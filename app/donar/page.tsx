// app/donar/page.tsx
'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Donar() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ donor_name: '', phone: '', email: '', donation_type: 'money', amount_clp: '', description: '', city: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('donations').insert([formData])
    if (!error) {
      alert('¡Gracias por tu donación! Te contactaremos.')
    } else {
      alert('Error al enviar.')
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8">❤️ Donar</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <input type="text" name="donor_name" placeholder="Nombre" onChange={(e) => setFormData({...formData, donor_name: e.target.value})} className="w-full p-3 border rounded" />
        <input type="tel" name="phone" placeholder="Teléfono" onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border rounded" />
        <input type="email" name="email" placeholder="Correo" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 border rounded" />
        
        <select name="donation_type" onChange={(e) => setFormData({...formData, donation_type: e.target.value})} className="w-full p-3 border rounded">
          <option value="money">💰 Dinero</option>
          <option value="in_kind">📦 En especie</option>
        </select>

        <input type="number" name="amount_clp" placeholder="Monto en CLP (si aplica)" onChange={(e) => setFormData({...formData, amount_clp: e.target.value})} className="w-full p-3 border rounded" />
        <textarea name="description" placeholder="Descripción de la donación" onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 border rounded" />
        <input type="text" name="city" placeholder="Ciudad/Comuna" onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full p-3 border rounded" />

        <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-3 rounded font-bold hover:bg-red-700 disabled:opacity-50">
          {loading ? 'Enviando...' : 'ENVIAR DONACIÓN'}
        </button>
      </form>
    </div>
  )
}