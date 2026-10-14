import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white text-center p-6 mt-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="text-xl font-bold text-red-500">HNV</div>

          {/* ====== REDES SOCIALES ====== */}
          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/19Qo5fHceE/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/jesula.vital?utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
            </a>
            <a href="https://www.youtube.com/@HaytiNouvelvesyon" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="YouTube">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@djessvital.hnv.4?_r=1&_t=ZS-99QKAEouM6e" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="TikTok">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 01-1.3-3.39 2.89 2.89 0 012.67-1.97c.34 0 .67.06.98.17V8.17a6.37 6.37 0 00-1.06-.1 6.35 6.35 0 00-6.34 6.35 6.35 6.35 0 006.34 6.34 6.35 6.35 0 006.34-6.34V8.17a6.37 6.37 0 003.77 1.33V6.69z"/></svg>
            </a>
            <a href="https://wa.me/56988923943" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="WhatsApp">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.514 3.664 1.41 5.205l-.9 2.818a1 1 0 001.268 1.268l2.818-.9A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.798 0-3.468-.582-4.834-1.56l-.287-.19-.925.296-.296-.925-.19-.287A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>
            </a>
          </div>

          {/* ====== CONTACTO UNIFICADO ====== */}
          <div className="flex flex-col text-sm text-gray-400">
            <p>📞 +569 8892 3943 · +56 991327162</p>
            <p>✉️ nuevavisionfundacion2026@gmail.com</p>
            <p className="text-xs mt-1 text-gray-500">RUT: 65.279.293-6</p>
          </div>
        </div>

        <p className="text-gray-500 text-xs mt-4">© {new Date().getFullYear()} HNV - Humanidad Nueva Visión. Todos los derechos reservados.</p>
        <p className="text-gray-600 text-xs mt-1">Capacitar · Acompañar · Bienestar · Éxito</p>
      </div>
    </footer>
  )
}