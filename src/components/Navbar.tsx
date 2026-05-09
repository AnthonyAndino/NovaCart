import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2x1 font-bold text-blue-600">
                        NovaCart
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/" className="text-gray-700 hover:text-blue-600">
                        Inicio
                        </Link>
                        <Link href="/" className="text-gray-700 hover:text-blue-600">
                        Carrito
                        </Link>
                        <Link href="/" className="text-gray-700 hover:text-blue-600">
                        Mis pedidos
                        </Link>
                        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Iniciar Sesion
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
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
                        <Link href="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">
                        Inicio
                        </Link>
                        <Link href="/cart" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">
                        Carrito
                        </Link>
                        <Link href="/login" className="block px-3 py-2 text-blue-600 font-medium">
                        Iniciar sesion
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}