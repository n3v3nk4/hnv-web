import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        
        {/* ====== REDES SOCIALES ====== */}
        <div className="flex justify-center gap-6 mb-8">
          {/* Facebook */}
          <a 
            href="https://www.facebook.com/share/19Qo5fHceE/?mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/jesula.vital?utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a 
            href="https://www.youtube.com/@HaytiNouvelvesyon" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            aria-label="YouTube"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          {/* TikTok */}
          <a 
            href="https://www.tiktok.com/@djessvital.hnv.4?_r=1&_t=ZS-99QKAEouM6e" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 rounded-full bg-gray-800 hover:bg-black flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            aria-label="TikTok"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 01-1.3-3.39 2.89 2.89 0 012.67-1.97c.34 0 .67.06.98.17V8.17a6.37 6.37 0 00-1.06-.1 6.35 6.35 0 00-6.34 6.35 6.35 6.35 0 006.34 6.34 6.35 6.35 0 006.34-6.34V8.17a6.37 6.37 0 003.77 1.33V6.69z"/>
            </svg>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/56988923943" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            aria-label="WhatsApp"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.514 3.664 1.41 5.205l-.9 2.818a1 1 0 001.268 1.268l2.818-.9A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.798 0-3.468-.582-4.834-1.56l-.287-.19-.925.296-.296-.925-.19-.287A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
            </svg>
          </a>
        </div>

        {/* ====== CONTACTO ====== */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <a 
              href="https://wa.me/56988923943" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              +56988923943
            </a>
            <span className="text-gray-600">·</span>
            <a 
              href="https://wa.me/56991327162" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              +56991327162
            </a>
          </div>
          <a 
            href="mailto:nuevavisionfundacion2026@gmail.com" 
            className="text-sm text-gray-400 hover:text-white transition"
          >
            nuevavisionfundacion2026@gmail.com
          </a>
          <p className="text-xs text-gray-500">RUT: 65.279.293-6</p>
        </div>

        {/* ====== COPYRIGHT ====== */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} HNV - Humanidad Nueva Visión. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Capacitar · Acompañar · Bienestar · Éxito
          </p>
        </div>

      </div>
    </footer>
  )
}