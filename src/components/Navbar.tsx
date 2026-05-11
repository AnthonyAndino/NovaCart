"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { getCartCount } = useCart()
    const cartCount = getCartCount()

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            NovaCart
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                            Inicio
                        </Link>
                        <Link href="/cart" className="relative text-gray-700 hover:text-blue-600 transition flex items-center gap-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                            Carrito
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-[scale-in_0.2s_ease-out]">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                            Mis pedidos
                        </Link>
                        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                            Iniciar Sesion
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center gap-3">
                        {/* Mobile cart icon */}
                        <Link href="/cart" className="relative text-gray-700 p-1">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px]">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link href="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                            Inicio
                        </Link>
                        <Link href="/cart" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                            🛒 Carrito
                            {cartCount > 0 && (
                                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/login" className="block px-3 py-2 text-blue-600 font-medium hover:bg-gray-100 rounded-md">
                            Iniciar sesion
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}