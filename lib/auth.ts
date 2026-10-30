import crypto from 'crypto'

// Usamos la contraseña de admin como clave secreta.
// Si no está en .env.local, usa una por defecto.
const SECRET = process.env.ADMIN_PASSWORD || 'HNV2026!Admin'

export function signSession() {
  const expireAt = Date.now() + 24 * 60 * 60 * 1000 // 24 horas
  const payload = `${expireAt}`
  const hmac = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url')
  return `${payload}.${hmac}`
}

export function verifySession(token: string): boolean {
  try {
    const [payload, hmac] = token.split('.')
    if (!payload || !hmac) return false

    const expectedHmac = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url')
    
    // Comparamos de forma segura para evitar ataques de tiempo
    if (crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac))) {
      const expireAt = parseInt(payload, 10)
      return Date.now() < expireAt // Verificamos que no haya expirado
    }
    return false
  } catch {
    return false
  }
}