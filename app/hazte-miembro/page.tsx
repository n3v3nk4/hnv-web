'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { CheckCircle2 } from 'lucide-react'

export default function HazteMiembro() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '', birth_date: '', nationality: '', country: '', city: '', 
    phone: '', whatsapp: '', email: '', occupation: '', interest_area: '', plan_type: 'Plan Semilla'
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    
    const { error } = await supabase
      .from('members')
      .insert([{ ...formData, status: 'pending' }])

    if (!error) {
      setSuccess(true)
      setFormData({ full_name: '', birth_date: '', nationality: '', country: '', city: '', phone: '', whatsapp: '', email: '', occupation: '', interest_area: '', plan_type: 'Plan Semilla' })
    } else {
      console.error('Error de Supabase:', error)
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 font-poppins">Hazte Miembro de HNV</h1>
        <p className="text-center text-gray-600 mb-10">Únete a nuestra comunidad y transforma tu vida</p>
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl mb-6 flex items-center gap-3">
            <CheckCircle2 size={24} />
            <span className="font-semibold">¡Solicitud enviada con éxito! Te contactaremos pronto.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo *</label>
              <input type="text" name="full_name" required onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de nacimiento</label>
              <input type="date" name="birth_date" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nacionalidad</label>
              <input type="text" name="nationality" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">País</label>
              <input type="text" name="country" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Comuna/Ciudad</label>
              <input type="text" name="city" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono *</label>
              <input type="tel" name="phone" required onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
              <input type="text" name="whatsapp" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico *</label>
              <input type="email" name="email" required onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ocupación o profesión</label>
              <input type="text" name="occupation" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Selecciona tu plan</label>
            <select name="plan_type" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition">
              <option value="Plan Semilla">🌱 Plan Semilla - $5.000 CLP</option>
              <option value="Plan Comunidad">🌿 Plan Comunidad - $15.000 CLP</option>
              <option value="Plan Desarrollo">⭐ Plan Desarrollo - $20.000 CLP</option>
              <option value="Plan Visionario">👑 Plan Visionario - $100.000 CLP</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-4 rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50 shadow-lg">
            {loading ? 'Enviando...' : 'ENVIAR SOLICITUD DE MEMBRESÍA'}
          </button>
        </form>
      </div>
    </div>
  )
}