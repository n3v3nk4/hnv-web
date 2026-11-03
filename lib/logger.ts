import { supabase } from './supabaseClient'

export const registrarLog = async (accion: string, detalles: string) => {
  try {
    await supabase.from('logs_actividad').insert([{ accion, detalles }])
  } catch (error) {
    console.error('Error al guardar log:', error)
  }
}