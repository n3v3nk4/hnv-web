export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black to-gray-900 text-white p-8">
      <div className="container mx-auto text-center">
        <p className="text-lg font-bold mb-2">HNV - Humanidad Nueva Visión</p>
        <p className="text-gray-400 mb-4">Capacitar • Acompañar • Bienestar • Éxito</p>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} HNV. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}