"use client"
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useState } from 'react'

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart()
    const [removingId, setRemovingId] = useState<string | null>(null)

    const subtotal = getCartTotal()
    const shipping = subtotal >= 100 ? 0 : 9.99
    const total = subtotal + shipping

    function handleRemove(id: string) {
        setRemovingId(id)
        setTimeout(() => {
            removeFromCart(id)
            setRemovingId(null)
        }, 300)
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center px-4">
                    <div className="text-8xl mb-6 animate-bounce">🛒</div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Tu carrito está vacío</h1>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        Parece que aún no has agregado productos. ¡Explora nuestra tienda y encuentra lo que necesitas!
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5"
                    >
                        <span>🏠</span>
                        Ir a la tienda
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Mi Carrito</h1>
                            <p className="text-gray-500 mt-1">
                                {getCartCount()} {getCartCount() === 1 ? 'producto' : 'productos'}
                            </p>
                        </div>
                        <button
                            onClick={clearCart}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-all font-medium text-sm flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Vaciar carrito
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${
                                    removingId === item.id
                                        ? 'opacity-0 scale-95 -translate-x-4'
                                        : 'opacity-100 scale-100 translate-x-0'
                                }`}
                            >
                                <div className="flex flex-col sm:flex-row">
                                    {/* Product Image */}
                                    <Link href={`/product/${item.id}`} className="sm:w-40 h-40 sm:h-auto flex-shrink-0 group">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </Link>

                                    {/* Product Info */}
                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-start justify-between gap-4">
                                                <Link href={`/product/${item.id}`} className="hover:text-blue-600 transition">
                                                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                                </Link>
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition p-1 hover:bg-red-50 rounded-lg flex-shrink-0"
                                                    aria-label={`Eliminar ${item.name}`}
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-blue-600 font-bold text-lg mt-1">${item.price.toFixed(2)}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            {/* Quantity Selector */}
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition text-gray-600 font-bold"
                                                >
                                                    −
                                                </button>
                                                <span className="w-10 text-center font-semibold text-gray-900">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.stock}
                                                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition text-gray-600 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Line Total */}
                                            <p className="text-xl font-bold text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del pedido</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({getCartCount()} productos)</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Envío</span>
                                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                                        {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg">
                                        💡 Agrega <span className="font-bold">${(100 - subtotal).toFixed(2)}</span> más para envío gratis
                                    </div>
                                )}
                                <div className="border-t pt-4">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Proceder al pago
                            </button>

                            <Link
                                href="/"
                                className="block text-center text-blue-600 hover:text-blue-700 mt-4 text-sm font-medium hover:underline"
                            >
                                ← Seguir comprando
                            </Link>

                            {/* Trust badges */}
                            <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-2 text-center">
                                <div>
                                    <div className="text-xl">🔒</div>
                                    <p className="text-xs text-gray-400 mt-1">Pago seguro</p>
                                </div>
                                <div>
                                    <div className="text-xl">🚚</div>
                                    <p className="text-xs text-gray-400 mt-1">Envío rápido</p>
                                </div>
                                <div>
                                    <div className="text-xl">↩️</div>
                                    <p className="text-xs text-gray-400 mt-1">Devolución</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
