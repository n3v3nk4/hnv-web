'use client'
import { useState } from 'react'
import Script from 'next/script'

export default function MetodosPago() {
  const [mostrarDatos, setMostrarDatos] = useState(false)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-black mb-8 text-center">Formas de Donar</h3>
      
      {/* ====== 1. BLOQUE DE PAYPAL ====== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 text-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.86a.641.641 0 0 1 .633-.536h6.718c2.182 0 3.867.448 5.006 1.332 1.139.884 1.708 2.185 1.708 3.906 0 .756-.11 1.482-.328 2.178-.219.696-.57 1.343-1.053 1.942-.484.598-1.098 1.093-1.842 1.485-.744.392-1.62.588-2.628.588h-2.356l-1.19 7.516a.641.641 0 0 1-.633.536z"/>
            </svg>
          </div>
          <div className="text-left">
            <h4 className="font-bold text-black text-lg">PayPal</h4>
            <p className="text-xs text-gray-500">Donación libre (Internacional)</p>
          </div>
        </div>
        
        {/* El contenedor tiene altura fija y oculta lo que se salga para que no rompa el diseño */}
        <div className="w-full max-w-[250px] h-[50px] overflow-hidden flex justify-center items-center">
          <div id="paypal-container-Y333B3FNT9T5S" className="w-full"></div>
        </div>
        
        <Script 
          src="https://www.paypal.com/sdk/js?client-id=BAAFj3BEROrhb_EoDCuD-U0SWpz-2x1dQpqu-WtONbKib9wgbXZUlgvfgbPtVbtGyg3SAk-FQj5oh-9YAs&components=hosted-buttons&disable-funding=venmo&currency=USD&style.size=responsive"
          strategy="afterInteractive"
          onLoad={() => {
            // @ts-ignore
            if (window.paypal && window.paypal.HostedButtons) {
              // @ts-ignore
              window.paypal.HostedButtons({
                hostedButtonId: "Y333B3FNT9T5S",
              }).render("#paypal-container-Y333B3FNT9T5S")
            }
          }}
        />
      </div>

      {/* ====== 2. OTRAS OPCIONES ====== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Mercado Pago */}
        <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition bg-white flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </div>
            <h4 className="font-bold text-black mb-1">Mercado Pago</h4>
            <p className="text-xs text-gray-500 mb-4">Tarjetas y saldo nacional</p>
          </div>
          <a href="https://link.mercadopago.cl/hnv" target="_blank" rel="noopener noreferrer" className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg font-semibold text-sm transition text-center block">
            Donar
          </a>
        </div>

        {/* Transferencia */}
        <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition bg-white flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v2h20V7L12 2zM2 11v8h4v-8H2zm6 0v8h4v-8H8zm6 0v8h4v-8h-4zm6 0v8h2v-8h-2z"/>
              </svg>
            </div>
            <h4 className="font-bold text-black mb-1">Transferencia</h4>
            <p className="text-xs text-gray-500 mb-4">BancoEstado</p>
          </div>
          <button onClick={() => setMostrarDatos(!mostrarDatos)} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm transition">
            {mostrarDatos ? 'Ocultar' : 'Ver datos'}
          </button>
        </div>

        {/* GoFundMe */}
        <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition bg-white flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <h4 className="font-bold text-black mb-1">GoFundMe</h4>
            <p className="text-xs text-gray-500 mb-4">Campaña internacional</p>
          </div>
          <a href="https://gofund.me/adfdd0bf9" target="_blank" rel="noopener noreferrer" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm transition text-center block">
            Ir a GoFundMe
          </a>
        </div>

      </div>

      {/* ====== IMAGEN DE TRANSFERENCIA ====== */}
      {mostrarDatos && (
        <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-200 text-center max-w-lg mx-auto">
          <h4 className="font-bold text-black mb-4">Datos para Transferencia</h4>
          <img src="/datos.jpg" alt="Datos bancarios" className="w-full h-auto rounded-lg mx-auto" />
        </div>
      )}

    </div>
  )
}