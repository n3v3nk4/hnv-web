import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BotonesFlotantes from '@/components/BotonesFlotantes'
import BotonCompartir from '@/components/BotonCompartir'
import BotonTraduccion from '@/components/BotonTraduccion'
import BotonInstalarApp from '@/components/BotonInstalarApp'

export const metadata: Metadata = {
  title: 'HNV - Humanidad Nueva Visión',
  description: 'Fundación sin fines de lucro para el desarrollo humano, bienestar y comunidad.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-white text-black">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        
        {/* Botones Flotantes */}
        <BotonesFlotantes />
        <BotonCompartir />
        <BotonTraduccion />
        <BotonInstalarApp />
        
      </body>
    </html>
  )
}