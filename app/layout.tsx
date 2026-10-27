import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MenuFlotante from '@/components/MenuFlotante'
import BannerGoFundMe from '@/components/BannerGoFundMe' // <-- AGREGAR AQUÍ

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
        <BannerGoFundMe /> {/* <-- AGREGAR AQUÍ */}
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MenuFlotante />
      </body>
    </html>
  )
}