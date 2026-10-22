'use client'
import { useState } from 'react'
import Script from 'next/script'

export default function MetodosPago() {
  const [mostrarDatos, setMostrarDatos] = useState(false)

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-black mb-6 text-center">Formas de Donar</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 1. PayPal (Con script oficial) */}
        <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition bg-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.86a.641.641 0 0 1 .633-.536h6.718c2.182 0 3.867.448 5.006 1.332 1.139.884 1.708 2.185 1.708 3.906 0 .756-.11 1.482-.328 2.178-.219.696-.57 1.343-1.053 1.942-.484.598-1.098 1.093-1.842 1.485-.744.392-1.62.588-2.628.588h-2.356l-1.19 7.516a.641.641 0 0 1-.633.536z"/>
              </svg>
            </div>
            <h4 className="font-bold text-black mb-2">PayPal</h4>
            <p className="text-xs text-gray-600 mb-4">Donación libre (Internacional).</p>
          </div>
          
          {/* Contenedor del botón de PayPal */}
          <div id="paypal-container-E9G8W4L6Q3CRC" className="min-h-[50px] w-full flex-center"></div>
          
          {/* Script oficial de PayPal */}
          <Script 
            src="https://www.paypal.com/sdk/js?client-id=BAAFj3BEROrhb_EoDCuD-U0SWpz-2x1dQpqu-WtONbKib9wgbXZUlgvfgbPtVbtGyg3SAk-FQj5oh-9YAs&components=hosted-buttons&disable-funding=venmo&currency=USD"
            strategy="afterInteractive"
            onLoad={() => {
              // @ts-ignore
              if (window.paypal && window.paypal.HostedButtons) {
                // @ts-ignore
                window.paypal.HostedButtons({
                  hostedButtonId: "E9G8W4L6Q3CRC",
                }).render("#paypal-container-E9G8W4L6Q3CRC")
              }
            }}
          />
        </div>

        {/* 2. Mercado Pago */}
        <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition bg-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </div>
            <h4 className="font-bold text-black mb-2">Mercado Pago</h4>
            <p className="text-xs text-gray-600 mb-4">Tarjetas y saldo nacional.</p>
          </div>
          <a 
            href="https://link.mercadopago.cl/hnv" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-semibold text-sm transition w-full"
          >
            Donar con Mercado Pago
          </a>
        </div>

        {/* 3. Transferencia Bancaria (Con imagen) */}
        <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition bg-white">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v2h20V7L12 2zM2 11v8h4v-8H2zm6 0v8h4v-8H8zm6 0v8h4v-8h-4zm6 0v8h2v-8h-2z"/>
            </svg>
          </div>
          <h4 className="font-bold text-black mb-2">Transferencia</h4>
          <p className="text-xs text-gray-600 mb-4">BancoEstado.</p>
          <button 
            onClick={() => setMostrarDatos(!mostrarDatos)}
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition w-full mb-4"
          >
            {mostrarDatos ? 'Ocultar imagen' : 'Ver datos bancarios'}
          </button>
          
          {/* Imagen de datos bancarios */}
          {mostrarDatos && (
            <div className="mt-4">
              <img 
                src="/datos.jpg" 
                alt="Datos para transferencia bancaria" 
                className="w-full h-auto rounded-lg border border-gray-200 shadow-sm"
              />
            </div>
          )}
        </div>

        {/* 4. GoFundMe */}
        <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition bg-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <h4 className="font-bold text-black mb-2">GoFundMe</h4>
            <p className="text-xs text-gray-600 mb-4">Campaña internacional.</p>
          </div>
          <a 
            href="https://gofund.me/adfdd0bf9" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition w-full"
          >
            Ir a GoFundMe
          </a>
        </div>

      </div>
    </div>
  )
}