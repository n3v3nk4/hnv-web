// app/hazte-miembro/page.tsx
'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function HazteMiembro() {
  const [loading, setLoading] = useState(false)
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
    
    const { error } = await supabase
      .from('members')
      .insert([{ ...formData, status: 'pending' }])

    if (!error) {
      alert('¡Solicitud enviada con éxito! Te contactaremos pronto.')
      setFormData({ full_name: '', birth_date: '', nationality: '', country: '', city: '', phone: '', whatsapp: '', email: '', occupation: '', interest_area: '', plan_type: 'Plan Semilla' })
    } else {
      alert('Hubo un error, intenta nuevamente.')
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8">Hazte Miembro de HNV</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <input type="text" name="full_name" placeholder="Nombre completo *" required onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="date" name="birth_date" onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="text" name="nationality" placeholder="Nacionalidad" onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="text" name="country" placeholder="País" onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="text" name="city" placeholder="Comuna/Ciudad" onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="tel" name="phone" placeholder="Teléfono *" required onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="text" name="whatsapp" placeholder="WhatsApp" onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="email" name="email" placeholder="Correo electrónico *" required onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="text" name="occupation" placeholder="Ocupación o profesión" onChange={handleChange} className="w-full p-3 border rounded" />
        
        <select name="plan_type" onChange={handleChange} className="w-full p-3 border rounded">
          <option value="Plan Semilla">🌱 Plan Semilla - $5.000 CLP</option>
          <option value="Plan Comunidad">🌿 Plan Comunidad - $15.000 CLP</option>
          <option value="Plan Desarrollo">⭐ Plan Desarrollo - $20.000 CLP</option>
          <option value="Plan Visionario">👑 Plan Visionario - $100.000 CLP</option>
        </select>

        <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-3 rounded font-bold hover:bg-red-700 disabled:opacity-50">
          {loading ? 'Enviando...' : 'ENVIAR SOLICITUD DE MEMBRESÍA'}
        </button>
      </form>
    </div>
  )
}