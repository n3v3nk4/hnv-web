// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-black text-white text-center p-6 text-sm mt-12">
      <p>&copy; {new Date().getFullYear()} HNV - Humanidad Nueva Visión. Todos los derechos reservados.</p>
      <p className="mt-2 text-gray-400">Capacitar • Acompañar • Bienestar • Éxito</p>
    </footer>
  )
}