import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white text-center p-6 mt-12 border-t border-red-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="HNV" width={35} height={25} />
            <span className="text-xl font-bold text-red-500">HNV</span>
          </div>

          {/* ====== REDES SOCIALES ====== */}
          <div className="flex gap-4">
            <a 
              href="https://www.facebook.com/share/19Qo5fHceE/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/jesula.vital?utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1.5"/>
              </svg>
            </a>
            <a 
              href="https://www.youtube.com/@HaytiNouvelvesyon" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a 
              href="https://www.tiktok.com/@djessvital.hnv.4?_r=1&_t=ZS-99QKAEouM6e" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition"
              aria-label="TikTok"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 01-1.3-3.39 2.89 2.89 0 012.67-1.97c.34 0 .67.06.98.17V8.17a6.37 6.37 0 00-1.06-.1 6.35 6.35 0 00-6.34 6.35 6.35 6.35 0 006.34 6.34 6.35 6.35 0 006.34-6.34V8.17a6.37 6.37 0 003.77 1.33V6.69z"/>
              </svg>
            </a>
          </div>

          <div className="flex flex-col text-sm text-gray-500">
            <p>📞 +56988923943 · +56927953832</p>
            <p>✉️ contacto@hnv.org</p>
          </div>
        </div>

        <p className="text-gray-500 text-xs mt-4">© {new Date().getFullYear()} HNV - Humanidad Nueva Visión. Todos los derechos reservados.</p>
        <p className="text-gray-600 text-xs mt-1">Capacitar · Acompañar · Bienestar · Éxito</p>
      </div>
    </footer>
  )
}