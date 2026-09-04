export default function Contacto() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8">Contacto</h1>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6">
        <div className="text-center">
          <p className="text-gray-600">Puedes contactarnos a través de los siguientes medios:</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="text-2xl">📞</span>
            <div>
              <p className="font-bold">Teléfonos / WhatsApp</p>
              <p className="text-gray-600">
                <a href="https://wa.me/56988923943" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                  +569 8892 3943
                </a>
              </p>
              <p className="text-gray-600">
                <a href="https://wa.me/56927953832" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                  +569 2795 3832
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="text-2xl">✉️</span>
            <div>
              <p className="font-bold">Correo electrónico</p>
              <p className="text-gray-600">contacto@hnv.org</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-500 text-sm">¡Estamos aquí para ayudarte!</p>
        </div>
      </div>
    </div>
  )
}