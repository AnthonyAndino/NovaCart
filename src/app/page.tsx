import Link from 'next/link'

const categories = [
  { name: 'Electrónica', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop', slug: 'electronica' },
  { name: 'Ropa', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop', slug: 'ropa' },
  { name: 'Hogar', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', slug: 'hogar' },
  { name: 'Deportes', image: 'https://images.unsplash.com/photo-1461896836934-428b4a?w=400&h=300&fit=crop', slug: 'deportes' },
]

const featuredProducts = [
  { id: '1', name: 'Laptop Pro 15"', price: 1299.99, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop', category: 'Electrónica' },
  { id: '2', name: 'Auriculares Wireless', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', category: 'Electrónica' },
  { id: '3', name: 'Zapatillas Running', price: 89.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', category: 'Deportes' },
  { id: '4', name: 'Campera Invernal', price: 149.99, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop', category: 'Ropa' },
  { id: '5', name: 'Reloj Smart', price: 299.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop', category: 'Electrónica' },
  { id: '6', name: 'Mochila Viajera', price: 79.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', category: 'Hogar' },
]

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Bienvenido a NovaCart
                        </h1>
                        <p className="text-xl mb-8 text-blue-100">
                            Descubre los mejores productos con los mejores precios. Tu tienda online de confianza.
                        </p>
                        <div className="flex gap-4">
                            <Link 
                            href="/"
                            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                            >
                            Ver Productos
                            </Link>
                            <Link
                            href="/register"
                            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                            >
                            Crear Cuenta
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <circle cx="80" cy="50" r="30" fill="currentColor" />
                    </svg>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Categories
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link
                            key={category.slug}
                            href={`/category/${category.slug}`}
                            className="group relative overflow-hidden rounded-lg shadow-lg"
                            >
                                <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-40 object-cover group-hover:scale-110 transition duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <span className="text-white text-xl font-semibold">
                                        {category.name}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Productos destacados
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {featuredProducts.map((product) => (
                            <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                            >
                                <div className="relative h-48 bg-gray-200">
                                    <img 
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    />
                                    <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                        {product.category}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-blue-600">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                                            Agregar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link
                        href="/"
                        className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
                        >
                            Ver Todos los Productos
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-4xl mb-4">🚚</div>
                            <h3 className="text-xl font-bold mb-2">Envío Gratis</h3>
                            <p className="text-blue-100">En pedidos mayores a $100</p>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-bold mb-2">Compra Segura</h3>
                            <p className="text-blue-100">Tu datos están protegidos</p>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl mb-4">⭐</div>
                            <h3 className="text-xl font-bold mb-2">Mejor Calidad</h3>
                            <p className="text-blue-100">Productos seleccionados</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}