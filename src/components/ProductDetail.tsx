"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    stock: number
    category: string
}

export default function ProductDetail({ productId }: { productId: string }) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [addedToCart, setAddedToCart] = useState(false)

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/products/${productId}`)
                if (!res.ok) {
                    setError(true)
                    return
                }
                const data = await res.json()
                setProduct(data)
            } catch {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [productId])

    function handleAddToCart() {
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 text-lg">Cargando producto...</p>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😔</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Producto no encontrado</h2>
                    <p className="text-gray-500 mb-6">El producto que buscas no existe o fue eliminado.</p>
                    <Link
                        href="/"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-blue-600 transition">
                        Inicio
                    </Link>
                    <span>/</span>
                    <span className="text-gray-400">{product.category}</span>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </nav>
            </div>

            {/* Producto */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Imagen */}
                        <div className="relative bg-gray-100 p-8 flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-96 object-cover rounded-lg"
                            />
                            <span className="absolute top-4 left-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                                {product.category}
                            </span>
                        </div>

                        {/* Información */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl font-bold text-blue-600">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className={`text-sm px-3 py-1 rounded-full ${
                                    product.stock > 0
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                }`}>
                                    {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                                </span>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-8">
                                {product.description}
                            </p>

                            {/* Selector de cantidad */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cantidad
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-lg font-bold"
                                    >
                                        −
                                    </button>
                                    <span className="w-12 text-center text-lg font-semibold">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-lg font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total:</span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${(product.price * quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Botones */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className={`flex-1 py-3 rounded-lg font-semibold text-lg transition ${
                                        product.stock === 0
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : addedToCart
                                                ? 'bg-green-500 text-white'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    {addedToCart ? '✓ Agregado al carrito' : '🛒 Agregar al carrito'}
                                </button>
                            </div>

                            {/* Info extra */}
                            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                                <div className="p-3">
                                    <div className="text-2xl mb-1">🚚</div>
                                    <p className="text-xs text-gray-500">Envío gratis</p>
                                </div>
                                <div className="p-3">
                                    <div className="text-2xl mb-1">🔒</div>
                                    <p className="text-xs text-gray-500">Compra segura</p>
                                </div>
                                <div className="p-3">
                                    <div className="text-2xl mb-1">↩️</div>
                                    <p className="text-xs text-gray-500">Devolución gratis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
