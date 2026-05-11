"use client"
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

interface Product {
    id: string
    name: string
    price: number
    image: string
    category: string
}

const featuredProducts: Product[] = [
    { id: 'prod_1', name: 'Laptop Pro 15"', price: 1299.99, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop', category: 'Electrónica' },
    { id: 'prod_2', name: 'Auriculares Wireless', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', category: 'Electrónica' },
    { id: 'prod_3', name: 'Zapatillas Running', price: 89.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', category: 'Deportes' },
    { id: 'prod_4', name: 'Campera Invernal', price: 149.99, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop', category: 'Ropa' },
    { id: 'prod_5', name: 'Reloj Smart', price: 299.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop', category: 'Electrónica' },
    { id: 'prod_6', name: 'Mochila Viajera', price: 79.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', category: 'Hogar' },
]

export default function FeaturedProducts() {
    const { addToCart } = useCart()
    const [addedIds, setAddedIds] = useState<Set<string>>(new Set())

    function handleAdd(product: Product) {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            stock: 10,  // Default stock for featured products
        })
        setAddedIds(prev => new Set(prev).add(product.id))
        setTimeout(() => {
            setAddedIds(prev => {
                const next = new Set(prev)
                next.delete(product.id)
                return next
            })
        }, 1500)
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
                >
                    <Link href={`/product/${product.id}`}>
                        <div className="relative h-48 bg-gray-200 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                {product.category}
                            </span>
                        </div>
                    </Link>
                    <div className="p-4">
                        <Link href={`/product/${product.id}`}>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition">
                                {product.name}
                            </h3>
                        </Link>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-blue-600">
                                ${product.price.toFixed(2)}
                            </span>
                            <button
                                onClick={() => handleAdd(product)}
                                className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                                    addedIds.has(product.id)
                                        ? 'bg-green-500 text-white scale-105'
                                        : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                                }`}
                            >
                                {addedIds.has(product.id) ? '✓ Agregado' : 'Agregar'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
